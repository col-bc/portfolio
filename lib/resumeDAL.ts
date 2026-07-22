import fs from 'fs';
import 'server-only';

const RESUME_PATH = 'assets/colby_coopers_resume.pdf';

export async function readResume(): Promise<File | null> {
  if (!fs.existsSync(RESUME_PATH)) {
    return null;
  }
  return new File([fs.readFileSync(RESUME_PATH)], 'colby_coopers_resume.pdf', {
    type: 'application/pdf',
  });
}

/**
 * Saves (overwrites) the provided resume file to the server's file system.
 * @param file The resume file to be saved.
 * @returns A promise that resolves when the file is successfully saved, or rejects if an error occurs.
 */
export async function writeResume(file: File): Promise<void> {
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(RESUME_PATH, buffer);
  return fs.existsSync(RESUME_PATH) ? Promise.resolve() : Promise.reject();
}
