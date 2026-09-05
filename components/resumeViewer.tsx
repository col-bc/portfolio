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
    <Card className="h-[800px] w-full overflow-hidden rounded-md border bg-muted/20 p-0 shadow">
      <object
        data={`${resumeUrl}#toolbar=0&zoom=page-width`}
        type="application/pdf"
        width="100%"
        height="100%"
        className="h-full w-full rounded-md"
        aria-label="Resume PDF Document"
      ></object>
    </Card>
  );
}
