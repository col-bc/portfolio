import { DataTable } from '@/components/data-table';
import { leadColumns } from '@/components/leadTable/lead-datatable-columns';
import LogoutButton from '@/components/logoutButton';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import { getJobs } from '@/lib/job/jobDAL';
import { getLeads } from '@/lib/lead/leadDAL';
import { Metadata } from 'next';
import Link from 'next/link';
import { unauthorized } from 'next/navigation';
import { TbCloudUpload, TbPlus, TbSettings } from 'react-icons/tb';

export const metadata: Metadata = {
  title: 'Manage Site',
};

export default async function ManagePage() {
  const user = await getCurrentUser();

  const data: {
    jobs: Awaited<ReturnType<typeof getJobs>>;
    leads: Awaited<ReturnType<typeof getLeads>>;
  } = await Promise.all([getJobs(), getLeads()]).then(([jobs, leads]) => ({
    jobs,
    leads,
  }));

  if (!user) {
    unauthorized();
  }

  return (
    <div className="flex w-full flex-col gap-8 md:gap-12 lg:gap-16">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="">
            <Heading>Welcome back</Heading>
            <p className="text-sm text-muted-foreground">{user.username}</p>
          </div>
          <LogoutButton />
        </div>
        <div className="flex gap-4">
          <Link href="/auth/manage/jobs/new" passHref>
            <Button variant="secondary" size="xs">
              <TbPlus /> Add Job
            </Button>
          </Link>
          <Link href="/auth/manage/projects/new" passHref>
            <Button variant="secondary" size="xs">
              <TbPlus /> Add Project
            </Button>
          </Link>
          <Link href="/auth/manage/leads/new" passHref>
            <Button variant="secondary" size="xs">
              <TbPlus /> Add Lead
            </Button>
          </Link>
          <Link href="/auth/manage/resume" passHref>
            <Button variant="secondary" size="xs">
              <TbCloudUpload /> Change Resume
            </Button>
          </Link>
          <Link href="/auth/manage/settings" passHref>
            <Button variant="secondary" size="xs">
              <TbSettings /> Manage Settings
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="wrap flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
          <Link href="/auth/manage/leads" passHref>
            <Button variant="secondary" size="xs">
              View All
            </Button>
          </Link>
        </div>
        <DataTable columns={leadColumns} data={data.leads} />
      </div>
    </div>
  );
}
