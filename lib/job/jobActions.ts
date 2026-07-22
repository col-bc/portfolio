'use server';

import { Job } from '@/prisma/generated/client';
import { ActionState } from '@/types';
import createJob, { deleteJob, updateJob } from '../job/jobDAL';

export async function handleDeleteJob(
  jobId: string
): Promise<ActionState<void>> {
  const success = await deleteJob(jobId);
  if (!success) {
    return {
      success: false,
      error: 'Failed to delete job.',
      type: 'UNKNOWN',
    };
  }
  return {
    success: true,
    data: undefined,
  };
}

export async function handleCreateJob(
  formData: FormData
): Promise<ActionState<Job>> {
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
    const newJob = await createJob(jobData, file);
    return {
      success: true,
      data: newJob,
    };
  } catch (error) {
    console.error('Error creating job:', error);
    return {
      success: false,
      error: 'Failed to create job.',
      type: 'UNKNOWN',
    };
  }
}

export async function handleUpdateJob(
  jobId: string,
  formData: FormData
): Promise<ActionState<Job>> {
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
    visible,
  };
  try {
    const updatedJob = await updateJob(jobId, jobData, file);
    return {
      success: true,
      data: updatedJob,
    };
  } catch (error) {
    console.error('Error updating job:', error);
    return {
      success: false,
      error: 'Failed to update job.',
      type: 'UNKNOWN',
    };
  }
}
