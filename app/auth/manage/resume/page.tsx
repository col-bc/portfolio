import ResumeViewer from '@/components/resumeViewer';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { getResume } from '@/lib/resume/resumeActions';
import { cn } from '@/lib/util/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { TbFileCv } from 'react-icons/tb';

export const metadata: Metadata = {
  title: 'Manage Resume',
};

export default async function ResumePage() {
  const resumeFile: File | null = await getResume();
  return (
    <>
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Manage Resume
        </h1>
        <Link
          href="/auth/manage/resume/change"
          className={cn(buttonVariants({ size: 'lg' }))}
        >
          <TbFileCv className="h-4 w-4" /> Change Resume
        </Link>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Heading size="sub">Current Resume</Heading>
        <ResumeViewer resumeFile={resumeFile} />
      </div>
    </>
  );
}
