import { getResume } from '@/lib/resumeActions';
import { notFound } from 'next/navigation';

export async function GET() {
  const resume = await getResume();

  if (!resume) {
    notFound();
  }

  return new Response(resume, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="resume.pdf"',
    },
  });
}
