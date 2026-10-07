import { APIKey } from '@/prisma/generated/client';
import argon2 from 'argon2';
import { cache } from 'react';
import 'server-only';
import { prisma } from '../prisma';

export const getApiKeys = cache((userId: string): Promise<APIKey[]> => {
  return prisma.aPIKey.findMany({
    where: {
      userId: userId,
    },
  });
});

export const getUserIdByApiKey = cache(
  async (key: string): Promise<string | null> => {
    const apiKey = await prisma.aPIKey.findUnique({
      where: {
        keyHash: await argon2.hash(key),
      },
    });
    return apiKey ? apiKey.userId : null;
  }
);
