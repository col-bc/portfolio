import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { getJobs } from '@/lib/job/jobDAL';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  TbBuildingSkyscraper,
  TbCalendar,
  TbEye,
  TbEyeOff,
  TbHome,
  TbMapPin,
  TbPlus,
} from 'react-icons/tb';

export default async function ManageJobsPage() {
  const jobs = await getJobs();

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
            <BreadcrumbPage>Jobs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex flex-col items-start gap-8 px-4 py-8 md:gap-12">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Manage Jobs
          </h1>
          <Link
            href="/auth/manage/jobs/new"
            className={cn(buttonVariants({ size: 'lg' }))}
          >
            <TbPlus className="h-4 w-4" />
            Create New Job
          </Link>
        </div>
        <div className="flex w-full flex-col gap-4">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/auth/manage/jobs/${job.id}`}
              className="flex flex-col gap-2 rounded-lg border p-4 transition-all hover:-translate-y-1 hover:bg-muted/25 hover:shadow-sm"
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
                <div className="flex flex-1 flex-col">
                  <h2 className="text-lg leading-snug font-semibold">
                    {job.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <TbBuildingSkyscraper className="h-4 w-4" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <TbMapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:items-end">
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <TbCalendar className="h-4 w-4" />
                    {job.startDate.toLocaleDateString()} -{' '}
                    {job.endDate ? job.endDate.toLocaleDateString() : 'Present'}
                  </p>
                  {job.visible ? (
                    <div className="text-success flex items-center gap-1 text-sm">
                      <TbEye className="h-4 w-4" />
                      Visible
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <TbEyeOff className="h-4 w-4" />
                      Hidden
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.skills.split(',').map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs!">
                    {skill.trim()}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
