import fs from 'fs';
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
  fs.writeFileSync(RESUME_PATH, buffer);
  return fs.existsSync(RESUME_PATH) ? Promise.resolve() : Promise.reject();
}

/**
 * Saves a project screenshot to the server's file system.
 * @param directory - the project's name
 * @param filename - the name of the file to be saved
 * @param data - the file data to be saved
 * @returns A promise that resolves to the path of the saved file if successful, or rejects if an error occurs.
 */
export async function writeScreen(
  directory: string,
  filename: string,
  data: Buffer
): Promise<string> {
  const dirPath = `${SCREENS_PATH}/${directory}`;
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = `${dirPath}/${filename}`;
  fs.writeFileSync(filePath, data);
  return fs.existsSync(filePath) ? Promise.resolve(filePath) : Promise.reject();
}
