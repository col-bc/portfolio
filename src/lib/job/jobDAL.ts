import { prisma } from '@/lib/prisma';
import { Job } from '@/prisma/generated/client';
import { cache } from 'react';
import 'server-only';

export const getJobs = cache(async (): Promise<Job[]> => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });

    return jobs;
  } catch (error) {
    console.warn('Error fetching jobs:', error);
    return [] as Job[];
  }
});

export const getJobById = cache(async (id: string): Promise<Job | null> =>   {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id,
      },
    });

    return job;
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    return null;
  }
});
