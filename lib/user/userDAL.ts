import { User } from '@/prisma/generated/client';
import 'server-only';
import { prisma } from '../prisma';

export async function getUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
}

export async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return user;
}

export async function createUser(username: string, passwordHash: string) {
  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
    },
  });
  return user;
}

export async function updateUserPassword(
  userId: string,
  newPasswordHash: string
): Promise<boolean> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newPasswordHash },
  });
  return user && user.passwordHash === newPasswordHash;
}

export async function deleteUser(userId: string): Promise<void> {
  await prisma.user.delete({
    where: { id: userId },
  });
}

export async function listUsers(): Promise<User[]> {
  const users = await prisma.user.findMany();
  return users;
}

export async function setTwoFactorEnabled(
  userId: string,
  enabled: boolean
): Promise<void> {
  let codes: string | undefined = undefined;
  if (enabled) {
    // Generate backup codes
    codes = Array.from({ length: 6 }, () =>
      Math.random().toString(36).substring(2, 10)
    ).join(',');
  }
  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFactorEnabled: enabled,
      backupCodes: codes,
    },
  });
}
