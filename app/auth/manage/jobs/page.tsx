import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { getJobs } from '@/lib/job/jobDAL';
import { formatDate } from '@/lib/util/utils';
import { Job } from '@/prisma/generated/client';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  TbBuildingSkyscraper,
  TbCalendar,
  TbEyeOff,
  TbMapPin,
  TbPlus,
} from 'react-icons/tb';

export const metadata: Metadata = {
  title: 'Manage Jobs',
};

export default async function ManageJobsPage() {
  const jobs = await getJobs();

  const currentJobs = jobs.filter((job) => job.isCurrent);
  const chronoJobs = jobs.sort(
    (a, b) => b.startDate.getTime() - a.startDate.getTime()
  );

  return (
    <div className="flex w-full flex-col gap-8 md:gap-12 lg:gap-16">
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
        <Heading>Manage Jobs</Heading>
        <Link
          href="/auth/manage/jobs/new"
          className={buttonVariants({ size: 'lg', className: 'shadow' })}
        >
          <TbPlus className="h-4 w-4" />
          Create New Job
        </Link>
      </div>

      <div className="flex w-full flex-col gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <Heading size="sub">
            Current Job{currentJobs.length !== 1 ? 's' : ''}
          </Heading>
          <Badge variant="secondary" className="font-mono text-lg">
            {currentJobs.length}
          </Badge>
        </div>
        <div className="flex w-full flex-col gap-4">
          {currentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <Heading size="sub">All Jobs</Heading>
          <Badge variant="secondary" className="font-mono text-lg">
            {chronoJobs.length}
          </Badge>
        </div>
        <div className="flex w-full flex-col gap-4">
          {chronoJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <Link
      key={job.id}
      href={`/auth/manage/jobs/${job.id}`}
      className="flex flex-col gap-2 rounded-lg border p-4 transition-all hover:-translate-y-1 hover:bg-muted/40 hover:shadow"
    >
      <div className="flex w-full flex-col justify-between gap-1 md:flex-row md:items-center">
        <Avatar className="mr-4 h-12 w-12 border-2 border-muted">
          <AvatarImage
            className="rounded-full object-cover"
            src={job.imageUrl || '/default-job-image.png'}
            alt={job.imageAlt || `${job.title} at ${job.company}`}
          />
          <AvatarFallback className="rounded-full bg-muted text-muted-foreground">
            {job.company
              .split(' ')
              .map((word) => word[0])
              .join('')
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-1">
          <h2 className="text-lg leading-snug font-semibold">{job.title}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <TbBuildingSkyscraper className="h-4 w-4" />
              {job.company}
            </div>
            <span className="text-xs text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <TbMapPin className="h-4 w-4" />
              {job.location}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end gap-1 self-start md:items-end">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TbCalendar />
            {formatDate(job.startDate)} -{' '}
            {job.endDate ? formatDate(job.endDate) : 'Present'}
          </div>
          {!job.visible && (
            <Badge variant="outline">
              <TbEyeOff className="h-4 w-4" />
              Hidden
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
