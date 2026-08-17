import { prisma } from '@/lib/prisma';
import { LoginAttempt, User } from '@/prisma/generated/client';

import 'server-only';
import { getCurrentUser } from './sessionActions';

interface UserAgentInterface {
  browser: string;
  os: string;
  device: string;
}

/**
 * Logs an authentication attempt to the database.
 * @param user - The user associated with the authentication attempt (if known).
 * @param success - Whether the authentication attempt was successful.
 * @param ipAddress - The IP address from which the attempt was made.
 * @param userAgent - Information about the user's browser, OS, and device.
 */
export async function logAuthAttempt({
  user,
  success,
  ipAddress,
  userAgent,
}: {
  user: User;
  success: boolean;
  ipAddress: string;
  userAgent: UserAgentInterface;
}): Promise<void> {
  try {
    await prisma.loginAttempt.create({
      data: {
        user: { connect: { id: user.id } },
        email: user.username,
        success,
        ipAddress,
        userAgent: JSON.stringify(userAgent),
      },
    });
  } catch (error) {
    console.warn(
      '[LoginAttemptDAL] Failed to log authentication attempt:',
      error
    );
  }
}

/**
 * Retrieves all authentication attempts for a specific user.
 * @param userId - The ID of the user whose authentication attempts are to be retrieved.
 * @returns An array of LoginAttempt objects associated with the user.
 */
export async function getAuthAttemptsForUser(): Promise<LoginAttempt[]> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    console.warn('[LoginAttemptDAL] No current user found.');
    return [];
  }
  const userId = currentUser.id;
  try {
    const attempts = await prisma.loginAttempt.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    });
    return attempts;
  } catch (error) {
    console.warn(
      '[LoginAttemptDAL] Failed to retrieve authentication attempts for user:',
      error
    );
    return [];
  }
}
