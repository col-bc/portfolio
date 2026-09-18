'use server';
import { readResume } from '@/lib/resume/resumeDAL';
import { writeResume } from '@/lib/util/fileSystemService';
import { getCurrentUser } from '../auth/sessionActions';

export async function getResume(): Promise<File | null> {
  const resume = await readResume();

  if (!resume) {
    return null;
  }

  return resume;
}

export async function changeResume(formData: FormData): Promise<void> {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    throw new Error('User not authenticated.');
  }
  const file = formData.get('file') as File | null;
  if (!file) {
    throw new Error('No file provided.');
  }

  await writeResume(file);
}
