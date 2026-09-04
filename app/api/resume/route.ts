import { getResume } from '@/lib/resume/resumeActions';

export async function GET(req: Request) {
  const resumeFile = await getResume();

  if (!resumeFile) {
    return new Response('Resume not found', { status: 404 });
  }

  const arrayBuffer = await resumeFile.arrayBuffer();
  const headers = new Headers({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'inline; filename="Colby_Cooper_Resume.pdf"',
  });
  return new Response(arrayBuffer, { headers });
}
