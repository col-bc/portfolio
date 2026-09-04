'use server';
import { readResume, writeResume } from '@/lib/resume/resumeDAL';

export async function getResume(): Promise<File | null> {
  const resume = await readResume();

  if (!resume) {
    return null;
  }

  return resume;
}

export async function changeResume(formData: FormData): Promise<void> {
  const file = formData.get('file') as File | null;
  if (!file) {
    throw new Error('No file provided.');
  }

  await writeResume(file);
}
