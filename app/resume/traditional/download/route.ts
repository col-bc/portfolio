import { getResume } from '@/lib/resumeActions';

export async function GET() {
  const resume = await getResume();
  if (!resume) {
    return new Response('Resume not found', { status: 404 });
  }

  return new Response(resume, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume.pdf"',
    },
  });
}
