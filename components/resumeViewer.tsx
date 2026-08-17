'use client';

import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { TbFileCv } from 'react-icons/tb';
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from './ui/empty';

export default function ResumeViewer({
  resumeFile,
}: {
  resumeFile: File | null;
}) {
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const setBlobUrl = (url: string) => {
      setResumeUrl(url);
    };

    if (!resumeFile) {
      setBlobUrl('');
      return;
    }

    const objectUrl = URL.createObjectURL(resumeFile);
    setBlobUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [resumeFile]);

  if (!resumeFile) {
    return (
      <Empty>
        <EmptyMedia>
          <TbFileCv className="h-12 w-12 text-foreground" />
        </EmptyMedia>
        <EmptyTitle>No Resume Uploaded</EmptyTitle>
        <EmptyDescription>
          When you upload your resume, it will be displayed here.
        </EmptyDescription>
      </Empty>
    );
  }

  return (
    <Card className="aspect-auto h-auto min-h-164 w-full rounded-md border bg-muted/20 p-0 shadow">
      <object
        data={`${resumeUrl}#toolbar=0&zoom=page-width`}
        type="application/pdf"
        width="100%"
        height="100%"
        className="h-full w-full rounded-md"
        aria-label="Resume PDF Document"
      >
        <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-center">
          <p className="text-pretty text-muted-foreground">
            It appears your browser doesn&apos;t support embedded PDFs.
          </p>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
          >
            Download Resume
          </a>
        </div>
      </object>
    </Card>
  );
}
