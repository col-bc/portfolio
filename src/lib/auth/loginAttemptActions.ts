'use server';

import { prisma } from '@/lib/prisma';
import { User } from '@/prisma/generated/client';
import { UserAgentInterface } from '@/types';

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
    console.warn('[LoginAttemptDAL] Failed to log attempt:', error);
  }
}
