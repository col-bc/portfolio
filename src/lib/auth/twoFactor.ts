import { cache } from 'react';
import 'server-only';
import { getCurrentUser } from './session';

export const getTotpSetupData = cache(
  async (): Promise<{ uri: string; secret: string }> => {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    const secret = process.env.ADMIN_TOTP_SECRET;
    if (!secret) {
      throw new Error('2FA is not configured on the server.');
    }

    // Construct the URI
    const appName = encodeURIComponent('Colby Cooper CMS');
    const userEmail = encodeURIComponent(
      user.username || 'admin@colbycooper.com'
    );

    const otpauthUrl = `otpauth://totp/${appName}:${userEmail}?secret=${secret}&issuer=${appName}`;

    return { uri: otpauthUrl, secret };
  }
);
