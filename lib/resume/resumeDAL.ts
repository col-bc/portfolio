import fs from 'fs';
import 'server-only';
import { RESUME_PATH } from '../util/fileSystemService';

export async function readResume(): Promise<File | null> {
  if (!fs.existsSync(RESUME_PATH)) {
    return null;
  }
  return new File([fs.readFileSync(RESUME_PATH)], 'colby_coopers_resume.pdf', {
    type: 'application/pdf',
  });
}

// TODO: Move to a dedicated file service
