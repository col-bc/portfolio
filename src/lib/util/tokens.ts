import type { User } from '@/prisma/generated/client';
import { ActionState } from '@/types';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import 'server-only';

/**
 * Verifies a Turnstile token with Cloudflare's API
 * @param token the Turnstile token to verify
 * @returns `true` if the token is valid, otherwise `false`
 */
const verifyTurnstileToken = async (token: string): Promise<boolean> => {
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
};

/**
 * Issues a JWT token with the given payload
 * @param payload the payload to include in the JWT
 * @param duration the duration for which the JWT is valid (e.g., "2h" for 2 hours)
 * @returns the signed JWT token
 */
const issueJWT = async (user: User, duration: string): Promise<string> => {
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
};

/**
 * Verifies a JWT token
 * @param token the JWT token to verify
 * @returns the payload if the token is valid, otherwise null
 */
const verifyJWT = async (token: string): Promise<ActionState<JWTPayload>> => {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    return {
      success: false,
      error: 'JWT secret is not defined',
      type: 'SERVER_ERROR',
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
};

export { issueJWT, verifyJWT, verifyTurnstileToken };
