'use server';

import { createPasswordHash, verifyPasswordHash } from '@/lib/util/crypto';
import { User } from '@/prisma/generated/client';
import { ActionState } from '@/types';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import * as OTPAuth from 'otpauth';
import 'server-only';
import { UAParser } from 'ua-parser-js';
import { prisma } from '../prisma';
import { getUser } from '../user/userDAL';
import { issueJWT, verifyJWT, verifyTurnstileToken } from '../util/auth.util';
import { logAuthAttempt } from './loginAttemptActions';
import type { AuthAttempt } from './session';

export async function createSuperuser(
  username: string,
  password: string,
  turnstileToken: string
): Promise<{ success: boolean; user?: User }> {
  const userCount = await prisma.user.count();
  if (userCount > 0) {
    return { success: false };
  }

  const tsStatus = await verifyTurnstileToken(turnstileToken);
  if (!tsStatus) {
    return {
      success: false,
    };
  }

  const passwordHash = await createPasswordHash(password);
  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
      enabled: true,
    },
  });
  return { success: true, user };
}

/**
 * Handles an authentication attempt by verifying the Turnstile token and authenticating the admin user
 * @param data the authentication attempt containing username, password, and turnstile token
 * @returns {ActionState<void>} an object indicating the success or failure of the authentication attempt
 */
export async function login(data: AuthAttempt): Promise<
  ActionState<{
    twoFactorEnabled: boolean;
  }>
> {
  // Validate input
  if (!data.username || !data.password || !data.turnstileToken) {
    const missing = [];
    if (!data.username) missing.push('Username');
    if (!data.password) missing.push('Password');
    if (!data.turnstileToken) missing.push('Verification Token');
    return {
      success: false,
      error: `Missing required fields: ${missing.join(', ')}`,
      type: 'VALIDATION',
    };
  }

  // Verify Turnstile token
  const turnstileValid = await verifyTurnstileToken(data.turnstileToken);
  if (!turnstileValid) {
    return {
      success: false,
      error:
        'Turnstile verification failed. Please complete the CAPTCHA and try again.',
      type: 'VALIDATION',
    };
  }

  // Authenticate the user credentials
  const user = await prisma.user.findUnique({
    where: { username: data.username },
  });
  if (!user) {
    return {
      success: false,
      error: 'Invalid username or password.',
      type: 'UNAUTHORIZED',
    };
  }

  const validLogin = await verifyPasswordHash(user.passwordHash, data.password);
  if (!user.enabled || !validLogin) {
    return {
      success: false,
      error: 'Invalid username or password.',
      type: 'UNAUTHORIZED',
    };
  }

  const headerContent = await headers();
  const rawUserAgent = headerContent.get('user-agent') || '';
  const ipAddress = headerContent.get('x-forwarded-for') || '';

  const parser = new UAParser(rawUserAgent);
  const parsedUA = parser.getResult();

  await logAuthAttempt({
    user,
    success: true,
    ipAddress: ipAddress,
    userAgent: {
      browser:
        `${parsedUA.browser.name || 'Unknown'} ${parsedUA.browser.version || ''}`.trim(),
      device: parsedUA.device.model || parsedUA.device.type || 'Desktop',
      os: `${parsedUA.os.name || 'Unknown'} ${parsedUA.os.version || ''}`.trim(),
    },
  });

  if (user.twoFactorEnabled) {
    // Issue JWT for the TOTP session
    const jwt = await issueJWT(user, '3m');
    (await cookies()).set('totp_session', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 3, // 3 minutes
    });
    return {
      success: true,
      data: {
        twoFactorEnabled: true,
      },
    };
  }
  // Issue JWT for the authenticated admin session
  const jwt = await issueJWT(user, '2h');
  (await cookies()).set('admin_session', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 2, // 2 hours
  });
  return { success: true, data: { twoFactorEnabled: false } };
}

/**
 * Handles the verification of a TOTP (Time-based One-Time Password) for the admin user
 * @param otp the TOTP to verify
 * @returns a redirect to the leads page if the OTP is valid, otherwise throws an error
 */
export async function verifyOtp(
  otp: string,
  checkSession: boolean = true
): Promise<ActionState<boolean>> {
  if (!checkSession) {
    // If session check is disabled, just verify the OTP without checking the session
    const totp = new OTPAuth.TOTP({
      issuer: 'Colby Portfolio',
      label: 'Admin',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(
        process.env.ADMIN_TOTP_SECRET as string
      ),
    });

    const delta = totp.validate({ token: otp, window: 1 });

    if (delta !== null) {
      return {
        success: true,
        data: true,
      };
    }

    return {
      success: false,
      error: 'Invalid OTP',
      type: 'UNAUTHORIZED',
    };
  }

  //validate the totp session
  const totpSession = (await cookies()).get('totp_session');
  if (!totpSession) {
    return {
      success: false,
      error: 'TOTP session not found',
      type: 'UNAUTHORIZED',
    };
  }

  // verify jwt by checking if the payload can be decoded
  const payload = await verifyJWT(totpSession.value);
  if (!payload) {
    return {
      success: false,
      error: 'Invalid or expired TOTP session',
      type: 'UNAUTHORIZED',
    };
  }

  // verify the totp
  const totp = new OTPAuth.TOTP({
    issuer: 'Colby Portfolio',
    label: 'Admin',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(process.env.ADMIN_TOTP_SECRET as string),
  });

  // Calculate the delta
  const delta = totp.validate({ token: otp, window: 1 });

  const userId = payload.success ? payload.data.sub : null;
  const user = await getUser(userId!);

  // Issue a jwt in a cookie for the authenticated admin session
  if (delta !== null) {
    (await cookies()).delete('totp_session');
    const jwt = await issueJWT(user!, '2h');
    (await cookies()).set('admin_session', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 2, // 2 hours
    });
    return {
      success: true,
      data: true,
    };
  } else {
    console.error('OTP validation failed:', otp);
    return {
      success: false,
      error: 'Invalid OTP',
      type: 'UNAUTHORIZED',
    };
  }
}

/** Destroys the session cookie and forces a redirect to the home page */
export async function destroySession(): Promise<void> {
  (await cookies()).delete('admin_session');
  (await cookies()).delete('totp_session');
  redirect('/');
}
