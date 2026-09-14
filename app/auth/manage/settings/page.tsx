import ApiKeyWrapper from '@/components/apiKeyWrapper';
import { DataTable } from '@/components/data-table';
import ChangePasswordForm from '@/components/forms/changePasswordForm';
import TwoFactorForm from '@/components/forms/twoFactorForm';
import { columns } from '@/components/loginTable/login-datatable-columns';
import { Heading } from '@/components/ui/heading';
import { handleGetApiKeysForUser } from '@/lib/api/apiActions.';
import { getAuthAttemptsForUser } from '@/lib/auth/loginAttemptDAL';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function SecurityPage() {
  const loginAttempts = await getAuthAttemptsForUser();
  const user = await getCurrentUser();
  const keys = await handleGetApiKeysForUser();

  const keyData = keys.success ? keys.data : [];

  return (
    <div className="flex w-full flex-col gap-8 md:gap-12 lg:gap-16">
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
        <Heading>Security Settings</Heading>
      </div>

      <div className="flex flex-col md:flex-row-reverse">
        <nav className="w-full max-w-52">
          <h5 className="mb-2 font-semibold text-muted-foreground">
            ON THIS PAGE
          </h5>
          <ul className="space-y-0.5 border-l-2 border-border pl-4 text-sm text-muted-foreground">
            <li>
              <Link
                href="#authentication"
                className="text-muted-foreground hover:underline"
              >
                Change Password
              </Link>
            </li>
            <li>
              <Link
                href="#two-step-verification"
                className="text-muted-foreground hover:underline"
              >
                2-Step Verification
              </Link>
            </li>
            <li>
              <Link
                href="#api-keys"
                className="text-muted-foreground hover:underline"
              >
                API Keys
              </Link>
            </li>
            <li>
              <Link
                href="#login-activity"
                className="text-muted-foreground hover:underline"
              >
                Login Activity
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex w-full flex-col gap-8">
          <div className="space-y-4" id="authentication">
            <Heading size="sub">Authentication</Heading>
            <ChangePasswordForm />
          </div>

          <div className="space-y-4" id="two-step-verification">
            <Heading size="subSub">2-Step Verification</Heading>
            <TwoFactorForm user={user!} />
          </div>

          <div className="space-y-4" id="api-keys">
            <Heading size="sub">API Keys</Heading>
            <ApiKeyWrapper keys={keyData} />
          </div>

          <div className="space-y-4" id="login-activity">
            <Heading size="sub">Login Activity</Heading>
            <DataTable
              columns={columns}
              data={loginAttempts}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
