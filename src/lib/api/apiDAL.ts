import { APIKey } from '@/prisma/generated/client';
import argon2 from 'argon2';
import crypto from 'crypto';
import 'server-only';
import { prisma } from '../prisma';

export async function createApiKey(
  userId: string,
  data: {
    name: string;
  }
): Promise<{ secret: string; object: APIKey }> {
  const key = crypto.randomBytes(32).toString('hex');
  const keyHash = await argon2.hash(key);
  const keyHint = key.slice(0, 4);

  const object = await prisma.aPIKey.create({
    data: {
      name: data.name,
      keyHash,
      keyHint,
      enabled: true,
      userId: userId,
    },
  });

  return { secret: key, object };
}

export async function getApiKeys(userId: string): Promise<APIKey[]> {
  return prisma.aPIKey.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function getUserIdByApiKey(key: string): Promise<string | null> {
  const apiKey = await prisma.aPIKey.findUnique({
    where: {
      keyHash: await argon2.hash(key),
    },
  });
  return apiKey ? apiKey.userId : null;
}

export async function disableApiKey(
  keyId: string,
  { enabled = false }: { enabled: boolean }
): Promise<APIKey> {
  return prisma.aPIKey.update({
    where: {
      id: keyId,
    },
    data: {
      enabled,
    },
  });
}

export async function deleteApiKey(keyId: string): Promise<APIKey> {
  return prisma.aPIKey.delete({
    where: {
      id: keyId,
    },
  });
}
