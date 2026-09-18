import JobForm from '@/components/forms/jobForm';
import { Heading } from '@/components/ui/heading';
import { getJobById } from '@/lib/job/jobDAL';
import { notFound } from 'next/navigation';

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
    <div className="flex w-full flex-col gap-8 md:gap-12 lg:gap-16">
      <Heading>
        {job.title} at {job.company}
      </Heading>
      <JobForm job={job} />
    </div>
  );
}
