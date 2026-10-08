import "server-only";

import { User } from '@/prisma/generated/client';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { getUser } from '../user/userDAL';
import { verifyJWT } from '../util/auth.util';

/**
 * @interface AuthAttempt
 * Represents an authentication attempt by the admin user, including username, password, and Turnstile token.
 */
export interface AuthAttempt {
  username: string;
  password: string;
  turnstileToken: string;
}

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
 * Verifies if the current session is valid by checking the admin_session cookie and its JWT.
 * @returns true if the session is valid, otherwise false
 */
export const verifySession = cache(async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');
  if (!sessionCookie || !sessionCookie.value) {
    return false;
  }
  const payload = await verifyJWT(sessionCookie.value);
  return payload.success;
});

/**
 * Retrieves the current session token from the cookies
 * @returns  the session token if it exists, otherwise null
 */
export const getSessionToken = cache(async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }
  return sessionCookie.value;
});
