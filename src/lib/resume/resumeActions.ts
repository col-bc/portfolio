'use server';
import { writeResume } from '@/lib/util/fileSystemService';
import { getCurrentUser } from '../auth/session';

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
