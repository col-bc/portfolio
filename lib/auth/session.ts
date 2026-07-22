/**
 * @module session
 * @description This module contains functions for handling authentication and TOTP verification for the admin user.
 *
 */

'use server';
import { createPasswordHash, verifyPasswordHash } from '@/lib/util/crypto';
import { User } from '@/prisma/generated/client';
import { ActionState } from '@/types';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import 'server-only';
import { logAuthAttempt } from '../auth/loginAttemptDAL';
import { prisma } from '../prisma';

/**
 * @interface AuthAttempt
 * Represents an authentication attempt by the admin user, including username, password, and Turnstile token.
 */
export interface AuthAttempt {
  username: string;
  password: string;
  turnstileToken: string;
}

/**
 * Verifies a Turnstile token with Cloudflare's API
 * @param token the Turnstile token to verify
 * @returns `true` if the token is valid, otherwise `false`
 */
export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error('Turnstile secret key is not configured.');
    return false;
  }
  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);
  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
        cache: 'no-store',
      }
    );
    const result = await response.json();
    if (!result.success) {
      console.debug(
        'Turnstile validation failed:',
        `[${response.status}]:\n`,
        result
      );
    }
    return result.success;
  } catch (err) {
    console.error('Error verifying Turnstile token:', err);
    return false;
  }
}

/**
 * Authenticates the admin user with the provided credentials
 * @param data the authentication attempt containing username, password, and turnstile token
 * @returns true if authentication is successful, otherwise throws an error
 */
export async function authenticate(data: AuthAttempt): Promise<User | null> {
  const { password, username } = data;
  const user = await prisma.user.findUnique({
    where: { username },
  });

  // TODO create LoginAttempt
  if (!user) {
    return null;
  }

  const validLogin = await verifyPasswordHash(user.passwordHash, password);

  if (!user.enabled || !validLogin) {
    return null;
  }

  return user;
}

/**
 * Issues a JWT token with the given payload
 * @param payload the payload to include in the JWT
 * @param duration the duration for which the JWT is valid (e.g., "2h" for 2 hours)
 * @returns the signed JWT token
 */
export async function issueJWT(user: User, duration: string): Promise<string> {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    throw new Error('JWT secret is not defined');
  }
  const jwt = await new SignJWT({
    sub: user.id,
    username: user.username,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(duration)
    .sign(new TextEncoder().encode(sessionSecret));
  return jwt;
}

/**
 * Verifies a JWT token
 * @param token the JWT token to verify
 * @returns the payload if the token is valid, otherwise null
 */
export async function verifyJWT(
  token: string
): Promise<ActionState<JWTPayload>> {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    return {
      success: false,
      error: 'JWT secret is not defined',
      type: 'UNKNOWN',
    };
  }
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(sessionSecret)
    );
    return { success: true, data: payload };
  } catch (err) {
    console.error('JWT verification failed:', err);
    return {
      success: false,
      error: 'Invalid or expired token',
      type: 'UNAUTHORIZED',
    };
  }
}

/**
 * Retrieves the current session token from the cookies
 * @returns  the session token if it exists, otherwise null
 */
export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }
  return sessionCookie.value;
}

/**
 * Verifies if the current session is valid by checking the admin_session cookie and its JWT.
 * @returns true if the session is valid, otherwise false
 */
export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');
  if (!sessionCookie || !sessionCookie.value) {
    return false;
  }
  const payload = await verifyJWT(sessionCookie.value);
  return payload.success;
}

async function logLoginAttempt(
  user: User,
  success: boolean,
  ipAddress: string,
  userAgent: { browser: string; os: string; device: string }
): Promise<void> {
  try {
    await logAuthAttempt({
      user,
      success,
      ipAddress,
      userAgent,
    });
  } catch (err) {
    console.debug('Failed to log authentication attempt:', err);
  }
}

export async function createSuperuser(
  username: string,
  password: string
): Promise<void> {
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUser) {
    throw new Error('User with this username already exists');
  }
  const passwordHash = await createPasswordHash(password);
  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
      enabled: true,
    },
  });
  console.log('----- Super User Created -----');
  console.log('Username: ', user.username);
  console.log('Password: ', password);
  console.log(
    'Please store the password securely, as it cannot be retrieved after this point.'
  );
}
