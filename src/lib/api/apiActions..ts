'use server';
import { APIKey } from '@/prisma/generated/browser';
import { ActionState } from '@/types';
import argon2 from 'argon2';
import crypto from 'crypto';
import { prisma } from '../prisma';

export async function createApiKey(
  userId: string,
  data: {
    name: string;
  }
): Promise<ActionState<{ secret: string; object: APIKey }>> {
  const key = crypto.randomBytes(32).toString('hex');
  const keyHash = await argon2.hash(key);
  const keyHint = key.slice(0, 4);

  const apiKey = await prisma.aPIKey.create({
    data: {
      name: data.name,
      keyHash,
      keyHint,
      enabled: true,
      userId: userId,
    },
  });

  return { success: true, data: { secret: key, object: apiKey } };
}

export async function disableApiKey(
  keyId: string,
  userId: string,
  { enabled = false }: { enabled: boolean }
): Promise<ActionState<APIKey>> {
  const key = await prisma.aPIKey.update({
    where: {
      id: keyId,
      userId: userId,
    },
    data: {
      enabled,
    },
  });
  return { success: true, data: key };
}

export async function deleteApiKey(
  keyId: string,
  userId: string
): Promise<ActionState<null>> {
  try {
    await prisma.aPIKey.delete({
      where: {
        id: keyId,
        userId: userId,
      },
    });
    return { success: true, data: null };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
      type: 'SERVER_ERROR',
    };
  }
}
