import { prisma } from '@/lib/prisma';
import { Job } from '@/prisma/generated/client';
import fs from 'fs';
import 'server-only';

export default async function createJob(
  job: Omit<Job, 'id' | 'imageUrl' | 'createdAt' | 'updatedAt'>,
  file: File | null
): Promise<Job> {
  try {
  const newJob = await prisma.job.create({
    data: {
      ...job,
      imageUrl: file ? await saveFileToDisk(file) : null,
    },
  });

  return newJob;
} catch (error) {
  console.error('Error creating job:', error);
  throw error;
}
}

export async function getJobs(): Promise<Job[]> {
  try {
  const jobs = await prisma.job.findMany({
    orderBy: {
      startDate: 'desc',
    },
  });

    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id,
      },
    });

    return job;
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    throw error;
  }
}

export async function updateJob(
  id: string,
  job: Partial<Job>,
  file: File | null
): Promise<Job> {
  try {
  delete job.imageUrl;
  let filePath: string | null = null;
  if (file) {
    filePath = await saveFileToDisk(file);
    job.imageUrl = filePath;
  }

  const updatedJob = await prisma.job.update({
    where: {
      id,
    },
    data: {
      ...job,
    },
  });

  return updatedJob;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  } 
}

export async function deleteJob(id: string): Promise<boolean> {
  try {
    const deletedJob = await prisma.job.delete({
      where: {
        id,
      },
    });
    if (!deletedJob) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
}

async function saveFileToDisk(file: File): Promise<string> {
  try {
  const filePath = `/uploads/${file.name}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.promises.writeFile(`public${filePath}`, buffer);

  return filePath;
  } catch (error) {
    console.error('Error saving file to disk:', error);
    throw error;
  }
}
