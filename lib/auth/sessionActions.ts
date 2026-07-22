'use server';

import { User } from '@/prisma/generated/client';
import { ActionState } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as OTPAuth from 'otpauth';
import { cache } from 'react';
import { getUser } from '../user.DAL';
import {
  AuthAttempt,
  authenticate,
  getSessionToken,
  issueJWT,
  verifyJWT,
  verifyTurnstileToken,
} from './session';

/*** Retrieves the current authenticated user based on the session token in the cookies */
export const getCurrentUser = cache(
  async function getCurrentUser(): Promise<User | null> {
    const sessionToken = await getSessionToken();
    if (!sessionToken) {
      return null;
    }
    const payload = await verifyJWT(sessionToken);
    if (!payload || !payload.success) {
      return null;
    }
    const userId = payload.data.sub;
    if (!userId || typeof userId !== 'string') {
      return null;
    }
    const user = await getUser(userId);
    return user;
  }
);

/**
 * Handles an authentication attempt by verifying the Turnstile token and authenticating the admin user
 * @param data the authentication attempt containing username, password, and turnstile token
 * @returns {ActionState<void>} an object indicating the success or failure of the authentication attempt
 */
export async function login(data: AuthAttempt): Promise<ActionState<void>> {
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

  console.debug(
    '[getSession] Received authentication attempt for user:',
    data.username
  );

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
  const user = await authenticate(data);
  if (user) {
    // Issue JWT for the TOTP session
    const jwt = await issueJWT(user, '3m');
    (await cookies()).set('totp_session', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 3, // 3 minutes
    });
    return { success: true, data: undefined };
  }

  return {
    success: false,
    error: 'Cannot login with provided credentials. Please try again.',
    type: 'UNAUTHORIZED',
  };
}

/**
 * Handles the verification of a TOTP (Time-based One-Time Password) for the admin user
 * @param otp the TOTP to verify
 * @returns a redirect to the leads page if the OTP is valid, otherwise throws an error
 */
export async function verifyOtp(otp: string): Promise<ActionState<boolean>> {
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
    return redirect('/auth/manage');
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
