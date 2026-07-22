import ResumeViewer from '@/components/resumeViewer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { getResume } from '@/lib/resumeActions';
import { cn } from '@/lib/util/utils';
import Link from 'next/link';
import { TbFileCv, TbHome } from 'react-icons/tb';

export default async function ResumePage() {
  const resumeFile: File | null = await getResume();
  return (
    <>
      <Breadcrumb className="w-full border-b bg-transparent px-4 py-2 text-muted-foreground">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/auth/manage"
              className="flex items-center gap-2"
            >
              <TbHome />
              Manage
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Resume</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex flex-col items-start gap-8 px-4 py-8 md:gap-12">
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
          <h2 className="text-lg font-semibold tracking-tight">
            Current Resume
          </h2>
          <ResumeViewer resumeFile={resumeFile} />
        </div>
      </section>
    </>
  );
}
