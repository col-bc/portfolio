import ChangePasswordForm from '@/components/forms/changePasswordForm';
import TwoFactorForm from '@/components/forms/twoFactorForm';
import { columns } from '@/components/loginTable/columns';
import { DataTable } from '@/components/loginTable/table';
import { Card, CardContent } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { getAuthAttemptsForUser } from '@/lib/auth/loginAttemptDAL';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function SecurityPage() {
  const loginAttempts = await getAuthAttemptsForUser();
  const user = await getCurrentUser();

  return (
    <React.Fragment>
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
        <Heading>Security Settings</Heading>
      </div>

      <div className="space-y-4">
        <Heading size="sub">Authentication</Heading>
        <Card className="w-full max-w-md">
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Heading size="subSub">2-Step Verification</Heading>
        <Card className="w-full max-w-md">
          <CardContent>
            <TwoFactorForm user={user!} />
          </CardContent>
        </Card>
      </div>

      <Heading size="sub">Login Activity</Heading>
      <DataTable columns={columns} data={loginAttempts} />
    </React.Fragment>
  );
}
