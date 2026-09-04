'use server';

import { ActionState } from '@/types';
import { verifyTurnstileToken } from '../auth/session';
import { getCurrentUser } from '../auth/sessionActions';
import { createPasswordHash, verifyPasswordHash } from '../util/crypto';
import { setTwoFactorEnabled, updateUserPassword } from './userDAL';

export async function handleChangePassword(
  currentPassword: string,
  newPassword: string,
  turnstileToken: string
): Promise<ActionState<boolean>> {
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
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'VALIDATION',
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
  // Proceed with changing the password
  const newPasswordHash = await createPasswordHash(newPassword);
  const status = await updateUserPassword(user.id, newPasswordHash);
  if (status) {
    return { success: true, data: true };
  } else {
    return {
      success: false,
      error: 'Failed to update password.',
      type: 'VALIDATION',
    };
  }
}

export async function handleSetTwoFactorEnabled(
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

  await setTwoFactorEnabled(user.id, enabled);
  return { success: true, data: true };
}
