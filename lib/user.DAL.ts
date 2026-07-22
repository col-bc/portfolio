import { prisma } from './prisma';

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
) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newPasswordHash },
  });
  return user;
}

export async function deleteUser(userId: string) {
  await prisma.user.delete({
    where: { id: userId },
  });
}

export async function listUsers() {
  const users = await prisma.user.findMany();
  return users;
}
