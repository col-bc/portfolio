'use client';

import { changeResume } from '@/lib/resume/resumeActions';
import { AlertFeedback } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { TbDeviceFloppy, TbFile, TbUpload, TbX } from 'react-icons/tb';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldRequiredIndicator,
} from '../ui/field';
import { toast } from '../ui/toast';

export default function ChangeResumeForm() {
  const router = useRouter();

  const [alert, setAlert] = useState<AlertFeedback | null>(null);
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
      toast.add({
        title: 'Success',
        description: 'Resume updated successfully.',
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      router.push('/auth/manage/resume');
    } catch (error) {
      console.warn('Error updating resume:', error);
      setAlert({
        title: 'Error',
        message: 'Failed to update resume.',
        type: 'ERROR',
      });
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-md shadow">
        <CardHeader>
          <CardTitle>Choose a File</CardTitle>
        </CardHeader>
        <CardContent>
          {alert && (
            <Alert>
              <AlertIcon type={alert.type} />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}
          <Field>
            <FieldLabel>
              Document File <FieldRequiredIndicator />
            </FieldLabel>
            <FieldContent>
              <FileUploadDropzone file={file} setFile={setFile} />
            </FieldContent>
          </Field>
        </CardContent>
        <CardFooter className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            <TbX />
            Cancel
          </Button>
          <Button type="submit" variant="default" disabled={!file}>
            <TbDeviceFloppy />
            Upload File
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

function FileUploadDropzone({
  file,
  setFile,
}: {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-md">
      {!file ? (
        <div
          className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleChange}
            accept=".pdf"
          />
          <TbUpload className="mb-4 h-10 w-10 text-muted-foreground" />
          <h3 className="mb-1 text-sm font-semibold">
            Drag and drop your file here
          </h3>
          <p className="mb-4 text-xs text-muted-foreground">
            or click below to browse your computer
          </p>
          <Button type="button" variant="secondary" onClick={onButtonClick}>
            Select File
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-lg border bg-card p-4">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <TbFile className="h-5 w-5 text-primary" />
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={removeFile}
          >
            <TbX className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
    </div>
  );
}
