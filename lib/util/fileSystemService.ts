import fs from 'fs/promises';
import path from 'path';
import 'server-only';

export const RESUME_PATH = 'assets/colby_coopers_resume.pdf';
export const SCREENS_PATH = 'public/screens';

/**
 * Saves (overwrites) the provided resume file to the server's file system.
 * @param file The resume file to be saved.
 * @returns A promise that resolves when the file is successfully saved, or rejects if an error occurs.
 */
export async function writeResume(file: File): Promise<void> {
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(RESUME_PATH, buffer);
  return fs
    .access(RESUME_PATH)
    .then(() => Promise.resolve())
    .catch(() => Promise.reject());
}

export async function saveProjectImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
  await fs.mkdir(uploadDir, { recursive: true });

  const filepath = path.join(uploadDir, uniqueName);
  await fs.writeFile(filepath, buffer);

  return `/uploads/projects/${uniqueName}`;
}
