import { prisma } from '@/lib/prisma';
import { Job } from '@/prisma/generated/client';
import fs from 'fs';
import 'server-only';

export default async function createJob(
  job: Omit<Job, 'id' | 'imageUrl' | 'createdAt' | 'updatedAt'>,
  file: File | null
): Promise<Job> {
  const newJob = await prisma.job.create({
    data: {
      ...job,
      imageUrl: file ? await saveFileToDisk(file) : null,
    },
  });

  return newJob;
}

export async function getJobs(): Promise<Job[]> {
  // 'use cache';
  // cacheLife('hours');
  const jobs = await prisma.job.findMany({
    orderBy: {
      startDate: 'desc',
    },
  });

  return jobs;
}

export async function getJobById(id: string): Promise<Job | null> {
  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  return job;
}

export async function updateJob(
  id: string,
  job: Partial<Job>,
  file: File | null
): Promise<Job> {
  const updatedJob = await prisma.job.update({
    where: {
      id,
    },
    data: {
      ...job,
      imageUrl: file
        ? await saveFileToDisk(file)
        : job.imageUrl
          ? job.imageUrl
          : null,
    },
  });

  return updatedJob;
}

export async function deleteJob(id: string): Promise<boolean> {
  const deletedJob = await prisma.job.delete({
    where: {
      id,
    },
  });
  if (!deletedJob) {
    return false;
  }
  return true;
}

async function saveFileToDisk(file: File): Promise<string> {
  const filePath = `/uploads/${file.name}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.promises.writeFile(`public${filePath}`, buffer);

  return filePath;
}
