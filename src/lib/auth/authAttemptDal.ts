import { prisma } from '@/lib/prisma';
import { LoginAttempt } from '@/prisma/generated/client';
import { cache } from 'react';
import 'server-only';
import { getCurrentUser } from './session';

export const getAuthAttemptsForUser = cache(
  async (): Promise<LoginAttempt[]> => {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    try {
      return await prisma.loginAttempt.findMany({
        where: { userId: currentUser.id },
        orderBy: { timestamp: 'desc' },
      });
    } catch (error) {
      console.warn('[LoginAttemptDAL] Failed to retrieve attempts:', error);
      return [];
    }
  }
);
