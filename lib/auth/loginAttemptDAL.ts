import { prisma } from '@/lib/prisma';
import { User } from '@/prisma/generated/client';

import 'server-only';

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
