import { User } from '@/prisma/generated/client';
import { cache } from 'react';
import 'server-only';
import { prisma } from '../prisma';

export const getUser = cache(async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
});

export const getUserByUsername = cache(async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return user;
});

export const listUsers = cache(async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
});
