'use client';

import { Card } from '@/components/ui/card';
import { TbFileCv } from 'react-icons/tb';

export default function ResumeViewer({
  resumeFile,
}: {
  resumeFile: File | null;
}) {
  if (!resumeFile) {
    return (
      <Card className="flex h-150 w-full items-center justify-center rounded-md border py-4">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/25">
          <TbFileCv className="h-12 w-12 text-foreground" />
        </div>
        <h5 className="text-lg font-semibold tracking-tight">
          No Resume Uploaded
        </h5>
      </Card>
    );
  }

  return (
    <embed
      src={resumeFile ? URL.createObjectURL(resumeFile) : ''}
      type="application/pdf"
      width="100%"
      height="800px"
    />
  );
}
