import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import { getJobs } from '@/lib/job/jobDAL';
import { getLeads } from '@/lib/lead/leadDAL';
import { Metadata } from 'next';
import Link from 'next/link';
import { unauthorized } from 'next/navigation';
import {
  TbBriefcase,
  TbFileCv,
  TbFlag,
  TbFolderCode,
  TbShield,
} from 'react-icons/tb';

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
    <section className="flex flex-col items-start gap-10 px-4 py-8 md:gap-16 lg:gap-20">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {greeting()}! Welcome back.
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ModuleCard
          title="Jobs"
          description="View and manage your employment history."
          icon={<TbBriefcase className="size-6" />}
          count={data.jobs.length}
        />
        <ModuleCard
          title="Resume"
          description="Manage your resume versions."
          icon={<TbFileCv className="size-6" />}
        />
        <ModuleCard
          title="Projects"
          description="View and update your projects."
          icon={<TbFolderCode className="size-6" />}
        />
        <ModuleCard
          title="Leads"
          description="View and manage your leads."
          icon={<TbFlag className="size-6" />}
          count={data.leads.length}
        />
        <ModuleCard
          title="Settings"
          description="Manage your security settings."
          icon={<TbShield className="size-6" />}
        />
      </div>
    </section>
  );
}

function ModuleCard({
  title,
  description,
  icon,
  count,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  count?: string | number;
}) {
  return (
    <Link href={`/auth/manage/${title.toLowerCase()}`} className="group">
      <Card className="h-full transition-transform group-hover:-translate-y-1 group-hover:bg-muted/25 group-hover:shadow-sm">
        <CardContent className="flex flex-row items-start gap-4">
          <div className="rounded-full bg-primary/10 p-3 text-2xl text-primary">
            {icon}
          </div>{' '}
          <div>
            <CardTitle className="mb-1 text-lg font-semibold tracking-tight">
              {title} {count && <Badge variant="secondary">{count}</Badge>}
            </CardTitle>
            <p className="mt-auto text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
