'use server';

import { getCurrentUser } from '@/lib/auth/sessionActions';
import { ActionState } from '@/types';

export async function getTotpSetupData(): Promise<
  ActionState<{ uri: string; secret: string }>
> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: 'Unauthorized', type: 'UNAUTHORIZED' };
  }

  // 2. Fetch from environment
  const secret = process.env.ADMIN_TOTP_SECRET;
  if (!secret) {
    return {
      success: false,
      error: '2FA is not configured on the server.',
      type: 'UNKNOWN',
    };
  }

  // 3. Construct the exact URI Authenticator apps require
  const appName = encodeURIComponent('Colby Cooper CMS');
  const userEmail = encodeURIComponent(
    user.username || 'admin@colbycooper.com'
  );

  const otpauthUrl = `otpauth://totp/${appName}:${userEmail}?secret=${secret}&issuer=${appName}`;

  return {
    success: true,
    data: { uri: otpauthUrl, secret },
  };
}
