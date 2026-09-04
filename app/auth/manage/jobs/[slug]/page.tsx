import JobForm from '@/components/forms/jobForm';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getJobById } from '@/lib/job/jobDAL';
import { notFound } from 'next/navigation';
import { TbHome } from 'react-icons/tb';

export default async function ManageJobDetail({
  params,
}: {
  params: { slug: string };
}) {
  const resolvedParams = await params;
  const jobId = resolvedParams.slug;

  const job = await getJobById(jobId);

  if (!job) {
    notFound();
  }

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
            <BreadcrumbLink href="/auth/manage/jobs">Jobs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{job.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex flex-col items-start gap-10 px-4 py-8 md:gap-16 lg:gap-20">
        <h1 className="flex-1 text-3xl font-bold tracking-tight md:text-4xl">
          {job.title} at {job.company}
        </h1>
        <JobForm job={job} />
      </section>
    </>
  );
}
