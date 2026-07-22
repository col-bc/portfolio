'use client';

import { changeResume } from '@/lib/resumeActions';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { TbFile, TbUpload, TbX } from 'react-icons/tb';
import { toast } from 'sonner';
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '../ui/attachment';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Field, FieldContent, FieldLabel } from '../ui/field';
import { Label } from '../ui/label';

export default function ChangeResumeForm() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      await changeResume(formData);
      toast.success('Resume updated successfully!');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      router.push('/auth/manage/resume');
    } catch (error) {
      console.log('Error updating resume:', error);
      toast.error('Failed to update resume.');
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Card className="flex w-full max-w-lg sm:max-w-lg">
        <CardContent>
          {!file && (
            <Field>
              <FieldLabel>
                Select a file{' '}
                <span className="text-xs text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <input
                  type="file"
                  accept=".pdf"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    setFile(selectedFile);
                  }}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full max-w-xs justify-center"
                >
                  <TbUpload className="h-4 w-4" />
                  Choose File
                </Button>
              </FieldContent>
            </Field>
          )}
          {file && (
            <>
              <Label htmlFor="file" className="mb-2 block text-sm font-medium">
                Selected File
              </Label>
              <Attachment>
                <AttachmentMedia>
                  <TbFile />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{file.name}</AttachmentTitle>
                  <AttachmentDescription className="flex flex-col text-xs text-muted-foreground">
                    <span>{file.type}</span>
                    <span>{(file.size / 1024).toFixed(2)} KB</span>
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    aria-label={`Remove ${file.name}`}
                    onClick={clearFile}
                  >
                    <TbX />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            </>
          )}
        </CardContent>
        <CardFooter className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => clearFile(e)}
            disabled={!file}
          >
            Cancel
          </Button>
          <Button type="submit" variant="default" disabled={!file}>
            Upload
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
