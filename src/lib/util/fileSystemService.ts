import fs from 'fs/promises';
import path from 'path';
import 'server-only';

export const RESUME_PATH = 'src/assets/colby_coopers_resume.pdf';
export const SCREENS_PATH = 'public/screens';
export const PROJECTS_PATH = 'public/uploads/projects';
export const JOBS_PATH = 'public/uploads/jobs';

const checkPath = (filePath: string) => {
  if (
    filePath.indexOf('..') !== -1 ||
    filePath.indexOf('/') !== -1 ||
    filePath.indexOf('\\') !== -1
  ) {
    throw new Error('Invalid file path');
  }
};

/**
 * Saves (overwrites) the provided resume file to the server's file system.
 * @param file The resume file to be saved.
 * @returns A promise that resolves when the file is successfully saved, or rejects if an error occurs.
 */
export async function writeResume(file: File): Promise<void> {
  checkPath(file.name);
  try {
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(RESUME_PATH, buffer);
  return fs
    .access(RESUME_PATH)
    .then(() => Promise.resolve())
    .catch(() => Promise.reject());
  } catch (error) {
    console.error('Error writing resume to disk:', error);
    throw error;
  }
}

export async function saveProjectImage(file: File): Promise<string> {
  checkPath(file.name);
  
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

  const uploadDir = path.join(process.cwd(), PROJECTS_PATH);
  await fs.mkdir(uploadDir, { recursive: true });

  const filepath = path.join(uploadDir, uniqueName);
  try {
  await fs.writeFile(filepath, buffer);

  return `/uploads/projects/${uniqueName}`;
  } catch (error) {
    console.error('Error saving project image to disk:', error);
    throw error;
  }
}

export async function saveJobImage(file: File): Promise<string> {
  checkPath(file.name);
  try {
    const secureName = `${Date.now()}-${file.name}`;
    const filePath = `/uploads/jobs/${secureName}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(path.join(process.cwd(), JOBS_PATH, secureName), buffer);

    return filePath;
  } catch (error) {
    console.error('Error saving job image to disk:', error);
    throw error;
  }
}
