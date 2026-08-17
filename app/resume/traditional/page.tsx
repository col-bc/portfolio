import DownloadIllustration from '@/assets/illustrations/download.svg';

import ResumeViewer from '@/components/resumeViewer';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { getResume } from '@/lib/resumeActions';
import Link from 'next/link';
import { TbDownload, TbSparkles } from 'react-icons/tb';

export default async function TraditionalResumePage() {
  const resume = await getResume();

  return (
    <section className="flex flex-col items-start gap-8 px-4 py-8 md:mb-12 md:gap-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex w-full flex-col gap-8">
          <Heading>Resume</Heading>

          <p className="text-base leading-relaxed text-foreground">
            I&apos;ve designed an interactive, artificial-intelligence powered
            tool to help you explore my experience, skills, and achievements in
            a more engaging way. You can also find a copy of my traditional
            resume to download.
          </p>

          <div className="flex gap-4">
            <Link href="/resume" passHref>
              <Button variant="default">
                <TbSparkles />
                View Interactive Resume
              </Button>
            </Link>
            <Link href="/resume/traditional/download" passHref>
              <Button variant="outline">
                <TbDownload />
                Download PDF
              </Button>
            </Link>
          </div>

          <DownloadIllustration
            width="800"
            height="600"
            viewBox="0 0 800 600"
            className="hidden size-108 w-full text-primary md:block"
          />
        </div>
        <ResumeViewer resumeFile={resume} />
      </div>
    </section>
  );
}
