'use client';

import { Card } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { TbFileCv } from 'react-icons/tb';
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from './ui/empty';
import { Spinner } from './ui/spinner';

const Document = dynamic(
  () => import('react-pdf').then((mod) => mod.Document),
  { ssr: false }
);
const Page = dynamic(() => import('react-pdf').then((mod) => mod.Page), {
  ssr: false,
});

if (typeof window !== 'undefined') {
  import('react-pdf').then(({ pdfjs }) => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  });
}

export default function ResumeViewer({
  resumeFile,
}: {
  resumeFile: File | null;
}) {
  const [resumeUrl, setResumeUrl] = useState('');
  const [containerWidth, setContainerWidth] = useState<number>();
  const rulerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rulerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(rulerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!resumeFile) {
      setResumeUrl('');
      return;
    }

    const objectUrl = URL.createObjectURL(resumeFile);
    setResumeUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
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
    <Card className="relative flex min-h-96 w-full min-w-0 items-center justify-center rounded-md border bg-muted/20 p-4 shadow">
      {/* 1. The Invisible Ruler stays exactly the same */}
      <div ref={rulerRef} className="absolute inset-x-4 top-4 h-0" />

      {/* 2. NEW: The Overflow Wrapper. This clips the PDF during a resize! */}
      <div className="flex w-full min-w-0 justify-center overflow-hidden">
        {containerWidth && resumeUrl ? (
          <Document
            file={resumeUrl}
            loading={
              <div className="flex h-96 items-center justify-center text-muted-foreground">
                <Spinner />
                <span className="ml-2">Loading PDF...</span>
              </div>
            }
            error={
              <div className="flex h-96 flex-col items-center justify-center space-y-4 p-8 text-center text-destructive">
                <p>Failed to load PDF.</p>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                >
                  Download Resume Instead
                </a>
              </div>
            }
          >
            <Page
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={containerWidth}
              className="shadow-sm"
            />
          </Document>
        ) : (
          <div className="flex h-96 items-center justify-center text-muted-foreground">
            Measuring layout...
          </div>
        )}
      </div>
    </Card>
  );
}
