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
import { Heading } from '@/components/ui/heading';
import { Skeleton } from '@/components/ui/skeleton';
import { getAuthAttemptsForUser } from '@/lib/auth/loginAttemptDAL';
import { TbHome } from 'react-icons/tb';

export default async function SecurityPage() {
  const loginAttempts = await getAuthAttemptsForUser();

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
      <section className="flex flex-col items-start gap-8 px-4 py-8 md:mb-12 md:gap-12">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
          <Heading>Security Settings</Heading>
        </div>

        <Heading size="sub">Authentication</Heading>
        <Skeleton className="h-80 w-full max-w-md" />

        <Heading size="sub">2-Factor Authentication</Heading>
        <Skeleton className="h-80 w-full max-w-md" />

        <Heading size="sub">Login Activity</Heading>
        <DataTable columns={columns} data={loginAttempts} />
      </section>
    </>
  );
}
