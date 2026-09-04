import ChangePasswordForm from '@/components/forms/changePasswordForm';
import TwoFactorForm from '@/components/forms/twoFactorForm';
import { columns } from '@/components/loginTable/columns';
import { DataTable } from '@/components/loginTable/table';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { getAuthAttemptsForUser } from '@/lib/auth/loginAttemptDAL';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import { TbHome } from 'react-icons/tb';

export default async function SecurityPage() {
  const loginAttempts = await getAuthAttemptsForUser();
  const user = await getCurrentUser();

  return (
    <>
      <Breadcrumb className="w-full border-b bg-transparent px-4 py-2 text-muted-foreground">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/auth/manage"
              className="flex items-center gap-2"
            >
              <TbHome />
              Manage
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Security</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex flex-col items-start gap-10 px-4 py-8 md:gap-16 lg:gap-20">
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
      </section>
    </>
  );
}
