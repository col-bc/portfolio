import InteractiveResume from '@/components/interactiveResume';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { getJobs } from '@/lib/job/jobDAL';
import { getResume } from '@/lib/resume/resumeActions';
import Link from 'next/link';
import { TbCloudDown, TbRotate } from 'react-icons/tb';

export default async function ResumePage() {
  const resume = await getResume();
  const jobs = await getJobs();

  let pdfSrc = undefined;
  if (resume) {
    const buffer = await resume.arrayBuffer();
    const base64String = Buffer.from(buffer).toString('base64');
    pdfSrc = `data:application/pdf;base64,${base64String}`;
  }

  return (
    <section className="flex flex-col items-start gap-10 px-4 py-8 md:gap-16 lg:gap-20">
      <div className="flex flex-col gap-6 md:gap-8">
        <Heading>Resume</Heading>
        <p className="text-base leading-relaxed text-muted-foreground">
          Review my traditional document below, or chat with my custom AI
          assistant to quickly find specific details about my engineering
          background, technical skills, and education.
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex w-full flex-col gap-3 lg:w-3/5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Document View
            </h3>

            <Link
              href="/resume/traditional"
              target="_blank"
              className={buttonVariants({ variant: 'secondary', size: 'sm' })}
            >
              <TbCloudDown className="mr-2 h-4 w-4" /> Download PDF
            </Link>
          </div>

          {/* PDF Wrapper */}
          <div className="aspect-8.5/11 w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
            <iframe
              src={pdfSrc}
              title="Traditional Resume"
              className="h-full w-full"
            ></iframe>
          </div>
        </div>

        <div className="sticky top-24 flex w-full flex-col gap-3 lg:w-2/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                Interactive Copilot
              </h3>
              <Badge
                variant="secondary"
                className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
              >
                BETA
              </Badge>
            </div>
            <Button variant="secondary" size="icon-sm">
              <TbRotate className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex h-[75vh] min-h-150 w-full flex-col overflow-hidden">
            <InteractiveResume jobs={jobs!} resumeFile={resume} />
          </div>
        </div>
      </div>
    </section>
  );
}
