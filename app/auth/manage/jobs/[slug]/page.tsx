import JobForm from '@/components/forms/jobForm';
import { Heading } from '@/components/ui/heading';
import { getJobById } from '@/lib/job/jobDAL';
import { notFound } from 'next/navigation';
import React from 'react';

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
    <React.Fragment>
      <Heading>
        {job.title} at {job.company}
      </Heading>
      <JobForm job={job} />
    </React.Fragment>
  );
}
