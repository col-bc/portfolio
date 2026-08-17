import AIIllustration from '@/assets/illustrations/ai.svg';
import InteractiveResume from '@/components/interactiveResume';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { getJobs } from '@/lib/job/jobDAL';
import { getResume } from '@/lib/resumeActions';
import Link from 'next/link';
import { TbFile } from 'react-icons/tb';

export default async function ResumePage() {
  const resume = await getResume();
  const jobs = await getJobs();

  return (
    <section className="flex flex-col items-start gap-8 px-4 py-8 md:mb-12 md:gap-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex w-full flex-col gap-8">
          <Heading>Resume</Heading>

          <p className="text-base leading-relaxed text-foreground">
            I&apos;ve designed an interactive, artificial-intelligence powered
            tool to help you explore my experience, skills, and achievements in
            a more engaging way. You can also find a copy of my traditional
            resume to download.
          </p>

          <div className="flex gap-4">
            <Link href="/resume/traditional" passHref>
              <Button variant="outline">
                <TbFile />
                View Traditional Resume
              </Button>
            </Link>
          </div>

          <AIIllustration
            width="800"
            height="600"
            viewBox="0 0 800 600"
            className="hidden size-108 w-full text-primary md:block"
          />
        </div>

        <InteractiveResume jobs={jobs!} resumeFile={resume} />
      </div>
    </section>
  );
}
