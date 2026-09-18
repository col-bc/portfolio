'use server';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import { APIKey } from '@/prisma/generated/browser';
import { ActionState } from '@/types';
import { createApiKey, getApiKeys } from './apiDAL';

export async function handleCreateApiKey(data: {
  name: string;
}): Promise<ActionState<{ token: string; apiKey: APIKey }>> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      type: 'UNAUTHORIZED',
      error: 'User not authenticated',
    };
  }

  const { secret, object } = await createApiKey(user.id, data);
  return {
    success: true,
    data: {
      token: secret,
      apiKey: object,
    },
  };
}

export async function handleGetApiKeysForUser(): Promise<
  ActionState<APIKey[]>
> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      type: 'UNAUTHORIZED',
      error: 'User not authenticated',
    };
  }
  const keys = await getApiKeys(user.id);
  return {
    success: true,
    data: keys,
  };
}
