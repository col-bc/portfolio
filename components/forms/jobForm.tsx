'use client';

import {
  handleCreateJob,
  handleDeleteJob,
  handleUpdateJob,
} from '@/lib/job/jobActions';
import { cn } from '@/lib/utils';
import { Job } from '@/prisma/generated/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  TbCalendarPlus,
  TbDeviceFloppy,
  TbExclamationCircleFilled,
  TbFileCode,
  TbHash,
  TbTrash,
  TbX,
} from 'react-icons/tb';
import { toast } from 'sonner';
import ConfirmDelete from '../confirmDelete';
import { DatePickerField } from '../datePickerField';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '../ui/attachment';
import { Button, buttonVariants } from '../ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '../ui/field';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

const formatDateTime = (date: Date) => {
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

export default function JobForm({ job }: { job: Job | null }) {
  const router = useRouter();
  const isEditMode = !!job;

  const [error, setError] = React.useState<string | null>(null);

  const [file, setFile] = React.useState<File | null>(null);
  const [filePreview, setFilePreview] = React.useState<string | null>(
    job?.imageUrl || null
  );

  const [title, setTitle] = React.useState(job?.title || '');
  const [company, setCompany] = React.useState(job?.company || '');
  const [location, setLocation] = React.useState(job?.location || '');
  const [description, setDescription] = React.useState(job?.description || '');
  const [startDate, setStartDate] = React.useState(job?.startDate || '');
  const [endDate, setEndDate] = React.useState(job?.endDate || '');
  const [isCurrentRole, setIsCurrentRole] = React.useState(
    job?.isCurrent || false
  );
  const [skills, setSkills] = React.useState<string>(job?.skills || '');
  const [visible, setVisible] = React.useState<boolean>(job?.visible || true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);

      const preview = URL.createObjectURL(e.target.files[0]);
      setFilePreview(preview);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check all required fields are filled
    if (!title || !company || !startDate) {
      setError('Please fill in all required fields.');
      return;
    }

    // check the dates are valid
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setError('Start date cannot be after end date.');
      return;
    }

    // submit the form
    const formData = new FormData();
    formData.append('title', title);
    formData.append('company', company);
    formData.append('location', location);
    formData.append('description', description);
    formData.append(
      'startDate',
      startDate ? new Date(startDate).toISOString() : ''
    );
    formData.append('endDate', endDate ? new Date(endDate).toISOString() : '');
    formData.append('isCurrentRole', isCurrentRole ? 'on' : 'off');
    formData.append('skills', skills);
    formData.append('visible', visible ? 'on' : 'off');
    if (file) {
      formData.append('file', file);
    }

    const result = isEditMode
      ? await handleUpdateJob(job.id, formData)
      : await handleCreateJob(formData);
    if (!result.success) {
      setError(result.error || 'An unknown error occurred.');
      return;
    }
    toast.success(`Job ${isEditMode ? 'updated' : 'created'} successfully.`);
    router.push(
      '/auth/manage/jobs' + (result.data ? `/${result.data.id}` : '')
    );
  };

  const handleDelete = async () => {
    if (!job) return;
    const status = await handleDeleteJob(job.id);
    if (!status.success) {
      toast.error(status.error || 'Failed to delete job.');
      return;
    }
    toast.success('Job deleted successfully.');
    router.push('/auth/manage/jobs');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col gap-6"
    >
      {error && (
        <Alert>
          <TbExclamationCircleFilled className="size-4 shrink-0" />
          <AlertTitle>Error Saving Job</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Field>
        <FieldLabel htmlFor="job-title">
          Title <span className="text-sm text-destructive">*</span>
        </FieldLabel>
        <Input
          id="job-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sr. Sales Manager"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="job-company">
          Company <span className="text-sm text-destructive">*</span>
        </FieldLabel>
        <Input
          id="job-company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Acme Inc."
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="job-location">Location</FieldLabel>
        <Input
          id="job-location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="New York, NY"
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DatePickerField
          label="Start Date"
          required
          initialValue={
            startDate ? new Date(startDate).toISOString() : undefined
          }
          onValueChange={(v) => setStartDate(v)}
          placeholder="MM/DD/YYYY"
        />
        <DatePickerField
          label="End Date"
          initialValue={endDate ? new Date(endDate).toISOString() : undefined}
          onValueChange={(v) => setEndDate(v)}
          placeholder="MM/DD/YYYY"
          required={!isCurrentRole}
        />
      </div>

      <FieldLabel htmlFor="is-current-role">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Current Role</FieldTitle>
            <FieldDescription>
              Indicate if this is your current role. If checked, the end date is
              not required.
            </FieldDescription>
          </FieldContent>
          <Switch
            id="is-current-role"
            checked={isCurrentRole}
            onCheckedChange={(checked) => setIsCurrentRole(checked)}
          />
        </Field>
      </FieldLabel>

      <Field>
        <FieldLabel htmlFor="job-description">Description</FieldLabel>
        <Textarea
          id="job-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-40 resize-y"
          placeholder="Describe your role and responsibilities..."
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="job-skills">Skills</FieldLabel>
        <Input
          id="job-skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Comma-separated list of skills"
        />
      </Field>

      <Field>
        <FieldLabel>Avatar Image</FieldLabel>
        {(file || filePreview) && (
          <Attachment className="w-full p-4!">
            <AttachmentMedia>
              {filePreview ? (
                <Image
                  src={filePreview}
                  alt="Preview"
                  className="h-10 w-10 rounded-lg object-cover"
                  width={40}
                  height={40}
                />
              ) : (
                <TbFileCode />
              )}
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{file?.name || 'Preview'}</AttachmentTitle>
              <AttachmentDescription>
                {file?.type || 'Image'} · {file?.size || ''} bytes
              </AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                aria-label={`Remove ${file?.name || 'Preview'}`}
                onClick={() => setFile(null)}
              >
                <TbX />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        )}
        {!file && (
          <FieldLabel
            htmlFor="job-image"
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Choose File
            <Input
              id="job-image"
              className="hidden"
              type="file"
              accept="image/*"
              multiple={false}
              onChange={handleFileChange}
              width={100}
              height={100}
            />
          </FieldLabel>
        )}
      </Field>
      {isEditMode && (
        <FieldLabel htmlFor="show-job" className="mt-2">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Show on Portfolio</FieldTitle>
              <FieldDescription>
                This job is {visible ? 'visible' : 'hidden'} on your portfolio.
              </FieldDescription>
            </FieldContent>
            <Switch
              id="show-job"
              checked={visible}
              onCheckedChange={setVisible}
            />
          </Field>
        </FieldLabel>
      )}
      {isEditMode && (
        <div className="gap-1 divide-y divide-border rounded-lg border border-border bg-background text-sm text-muted-foreground">
          <div className="flex items-center gap-1 p-2">
            <TbHash className="h-4 w-4" />
            <span className="flex gap-1 font-mono text-muted-foreground">
              {job.id}
            </span>
          </div>
          <div className="flex items-center gap-1 p-2">
            <TbCalendarPlus className="h-4 w-4" />
            <span className="text-muted-foreground">
              Created {formatDateTime(new Date(job.createdAt))}
            </span>
          </div>
          <div className="flex items-center gap-1 p-2">
            <TbDeviceFloppy className="h-4 w-4" />
            <span className="text-muted-foreground">
              Updated {formatDateTime(new Date(job.updatedAt))}
            </span>
          </div>
        </div>
      )}

      <div className="mt-2 flex flex-col gap-4 sm:flex-row">
        <Button type="submit" className="px-4">
          <TbDeviceFloppy className="h-4 w-4" />
          Save {isEditMode ? 'Changes' : 'Job'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="px-4 sm:mr-auto"
        >
          <TbX className="h-4 w-4" />
          Cancel
        </Button>
        {isEditMode && (
          <ConfirmDelete
            onConfirm={handleDelete}
            title="Delete Job"
            description="You cannot recover deleted jobs. Are you sure you want to continue?"
          >
            <TbTrash className="h-4 w-4" />
            Delete Job
          </ConfirmDelete>
        )}
      </div>
    </form>
  );
}
