'use server';

import { Job } from '@/prisma/generated/client';
import { ActionState } from '@/types';
import 'server-only';
import { getCurrentUser } from '../auth/session';
import { prisma } from '../prisma';
import { saveJobImage } from '../util/fileSystemService';

export async function deleteJob(jobId: string): Promise<ActionState<void>> {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }

  try {
    const deletedJob = await prisma.job.delete({
      where: {
        id: jobId,
      },
    });
    if (!deletedJob) {
      return {
        success: false,
        error: 'Failed to delete job.',
        type: 'SERVER_ERROR',
      };
    }
    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    console.warn('Error deleting job:', error);
    return {
      success: false,
      error: 'Failed to delete job.',
      type: 'SERVER_ERROR',
    };
  }
}

export async function createJob(formData: FormData): Promise<ActionState<Job>> {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }

  const title = formData.get('title') as string;
  const company = formData.get('company') as string;
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const isCurrentRole = formData.get('isCurrentRole') === 'on';
  const skills = formData.get('skills') as string;

  const file = formData.get('file') as File | null;

  const jobData = {
    title,
    company,
    location,
    description,
    imageAlt: `${title} at ${company}`,
    startDate: new Date(startDate),
    endDate: endDate ? new Date(endDate) : null,
    isCurrent: isCurrentRole,
    skills,
    visible: true,
  };

  try {
    const newJob = await prisma.job.create({
      data: {
        ...jobData,
        imageUrl: file ? await saveJobImage(file) : null,
      },
    });

    return {
      success: true,
      data: newJob,
    };
  } catch (error) {
    console.warn('Error creating job:', error);
    return {
      success: false,
      error: 'Failed to create job.',
      type: 'SERVER_ERROR',
    };
  }
}

export async function updateJob(
  jobId: string,
  formData: FormData
): Promise<ActionState<Job>> {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }

  const title = formData.get('title') as string;
  const company = formData.get('company') as string;
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const isCurrentRole = formData.get('isCurrentRole') === 'on';
  const skills = formData.get('skills') as string;
  const visible = formData.get('visible') === 'on';

  const file = formData.get('file') as File | null;

  const jobData: Partial<Job> = {
    title,
    company,
    location,
    description,
    imageAlt: `${title} at ${company}`,
    startDate: new Date(startDate),
    endDate: endDate ? new Date(endDate) : null,
    isCurrent: isCurrentRole,
    skills,
    visible,
  };
  try {
    if (jobData.imageUrl) {
      delete jobData.imageUrl;
    }
    let filePath: string | null = null;
    if (file) {
      filePath = await saveJobImage(file);
      jobData.imageUrl = filePath;
    }

    const updatedJob = await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        ...jobData,
      },
    });

    return {
      success: true,
      data: updatedJob,
    };
  } catch (error) {
    console.warn('Error updating job:', error);
    return {
      success: false,
      error: 'Failed to update job.',
      type: 'SERVER_ERROR',
    };
  }
}
