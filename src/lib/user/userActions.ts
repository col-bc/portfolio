'use server';

import { ActionState } from '@/types';
import 'server-only';
import { getCurrentUser } from '../auth/session';
import { prisma } from '../prisma';
import { createPasswordHash, verifyPasswordHash } from '../util/crypto';
import { verifyTurnstileToken } from '../util/tokens';

/** Change a password for an authenticated user */
export async function changePassword(
  currentPassword: string,
  newPassword: string,
  turnstileToken: string
): Promise<ActionState<boolean>> {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }

  const tsStatus = await verifyTurnstileToken(turnstileToken);
  if (!tsStatus) {
    return {
      success: false,
      error: 'Turnstile verification failed.',
      type: 'VALIDATION',
    };
  }

  // check 12 character minimum, uppercase, lowercase, and number requirements
  const minLength = 12;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  if (
    newPassword.length < minLength ||
    !hasUppercase ||
    !hasLowercase ||
    !hasNumber
  ) {
    return {
      success: false,
      error:
        'Password must be at least 12 characters long, contain at least one uppercase letter, one lowercase letter, and one number.',
      type: 'VALIDATION',
    };
  }
  const user = userStatus;

  const checkPassword = await verifyPasswordHash(
    user.passwordHash,
    currentPassword
  );
  if (!checkPassword) {
    return {
      success: false,
      error: 'Current password is incorrect.',
      type: 'VALIDATION',
    };
  }

  const newPasswordHash = await createPasswordHash(newPassword);
  const newUser = await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: newPasswordHash },
  });
  if (newUser && newUser.passwordHash === newPasswordHash) {
    return { success: true, data: true };
  } else {
    return {
      success: false,
      error: 'Failed to update password.',
      type: 'VALIDATION',
    };
  }
}

export async function setTwoFactorEnabled(
  enabled: boolean
): Promise<ActionState<boolean>> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }

  let codes: string | undefined = undefined;
  if (enabled) {
    // Generate backup codes
    codes = Array.from({ length: 6 }, () =>
      Math.random().toString(36).substring(2, 10)
    ).join(',');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      twoFactorEnabled: enabled,
      backupCodes: codes,
    },
  });

  return { success: true, data: true };
}
