import { DataTable } from '@/components/data-table';
import { leadColumns } from '@/components/leadTable/dt-lead-columns';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import { getJobs } from '@/lib/job/jobDAL';
import { getLeads } from '@/lib/lead/leadDAL';
import { Metadata } from 'next';
import { unauthorized } from 'next/navigation';
import { TbCloudUpload, TbPlus } from 'react-icons/tb';

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

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <section className="flex flex-col items-start gap-8 md:gap-12 lg:gap-16">
      <Heading>{greeting()}! Welcome back.</Heading>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-12">
        <div className="col-span-1 space-y-4 lg:col-span-3">
          <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
          <DataTable columns={leadColumns} data={data.leads} />
        </div>
        <div className="col-span-1 flex flex-col gap-4 lg:col-span-2">
          <Button variant="outline">
            <TbPlus /> Add Job
          </Button>
          <Button variant="outline">
            <TbPlus /> Add Project
          </Button>
          <Button variant="outline">
            <TbCloudUpload /> Change Resume
          </Button>
        </div>
      </div>
    </section>
  );
}
