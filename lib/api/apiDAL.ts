import { APIKey } from '@/prisma/generated/client';
import argon2 from 'argon2';
import crypto from 'crypto';
import 'server-only';
import { getCurrentUser } from '../auth/sessionActions';
import { prisma } from '../prisma';

export async function createApiKey(data: {
  name: string;
}): Promise<{ key: string; object: APIKey }> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not authenticated');
  }
  const key = crypto.randomBytes(32).toString('hex');
  const keyHash = await argon2.hash(key);
  const keyHint = key.slice(0, 4);

  const object = await prisma.aPIKey.create({
    data: {
      name: data.name,
      keyHash,
      keyHint,
      enabled: true,
      userId: user.id,
    },
  });

  return { key, object };
}

export async function getApiKeys(): Promise<APIKey[]> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not authenticated');
  }
  return prisma.aPIKey.findMany({
    where: {
      userId: user.id,
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
