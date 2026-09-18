import ResumeViewer from '@/components/resumeViewer';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { getResume } from '@/lib/resume/resumeActions';
import { Metadata } from 'next';
import Link from 'next/link';
import { TbUpload } from 'react-icons/tb';

export const metadata: Metadata = {
  title: 'Manage Resume',
};

export default async function ResumePage() {
  const resumeFile: File | null = await getResume();
  return (
    <div className="flex w-full flex-col gap-8 md:gap-12 lg:gap-16">
      <div className="flex w-full justify-between gap-4">
        <Heading>Manage Resume</Heading>
        <Link
          href="/auth/manage/resume/change"
          className={buttonVariants({ size: 'lg', className: 'w-auto shadow' })}
        >
          <TbUpload className="h-4 w-4" />
          <span className="hidden sm:inline-block">Change Resume</span>
        </Link>
      </div>

      <div className="flex w-full flex-col gap-4 md:gap-6">
        <Heading size="sub">Current Resume</Heading>
        <ResumeViewer resumeFile={resumeFile} />
      </div>
    </div>
  );
}
