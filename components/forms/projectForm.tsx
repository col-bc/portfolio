'use client';

import { handleCreateProject } from '@/lib/project/projectActions';
import { Project } from '@/prisma/generated/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
    TbAlertCircleFilled,
    TbDeviceFloppy,
    TbImageInPicture,
    TbX,
} from 'react-icons/tb';
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

interface ImagePreview {
  file: File;
  preview: string;
}

export default function ProjectForm({ project }: { project: Project | null }) {
  const router = useRouter();

  const imageInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const [mode, setMode] = React.useState<'create' | 'edit'>(
    project ? 'edit' : 'create'
  );
  const [error, setError] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState<string>(project?.title || '');
  const [description, setDescription] = React.useState<string>(
    project?.description || ''
  );
  const [tags, setTags] = React.useState<string>(project?.tags || '');
  const [link, setLink] = React.useState<string>(project?.link || '');
  const [repo, setRepo] = React.useState<string>(project?.repository || '');
  const [visible, setVisible] = React.useState<boolean>(
    project?.visible ?? true
  );
  const [featured, setFeatured] = React.useState<boolean>(
    project?.featured ?? false
  );
  const [imageFiles, setImageFiles] = React.useState<ImagePreview[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: ImagePreview[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImageFiles((prevFiles) => {
      URL.revokeObjectURL(prevFiles[indexToRemove].preview);
      return prevFiles.filter((_, index) => index !== indexToRemove);
    });
  };

  React.useEffect(() => {
    return () => {
      imageFiles.forEach((image) => URL.revokeObjectURL(image.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }

    if (imageFiles.length > 5) {
      setError('You can upload a maximum of 5 images.');
      return;
    }

    const formData = new FormData(formRef.current as HTMLFormElement);
    formData.delete('images');
    imageFiles.forEach((imageItem) => {
      formData.append('images', imageItem.file);
    });
    formData.set('visible', visible.toString());
    formData.set('featured', featured.toString());

    const status = await handleCreateProject(formData);

    if (!status.success) {
      setError(status.error || 'An unknown error occurred.');
    } else {
      router.push('/auth/manage/projects');
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col gap-6"
    >
      {error && (
        <Alert>
          <TbAlertCircleFilled className="size-4 shrink-0" />
          <AlertTitle>Error Saving Job</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Field>
        <FieldLabel htmlFor="project-title">
          Project Title <span className="text-sm text-destructive">*</span>
        </FieldLabel>
        <Input
          id="project-title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project title"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="project-description">
          Description <span className="text-sm text-destructive">*</span>
        </FieldLabel>
        <Textarea
          id="project-description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="project-tags">
          Tags <span className="text-sm text-destructive">*</span>
        </FieldLabel>
        <Input
          id="project-tags"
          name="tags"
          value={tags}
          required
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter project tags (comma-separated)"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="project-link">Project Link</FieldLabel>
        <Input
          id="project-link"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter project link (optional)"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="project-repo">Repository Link</FieldLabel>
        <Input
          id="project-repo"
          name="repository"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="Enter repository link (optional)"
        />
      </Field>

      <FieldLabel htmlFor="project-show" className="mt-2">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Show on Portfolio</FieldTitle>
            <FieldDescription>
              This job is {visible ? 'visible' : 'hidden'} on your portfolio.
            </FieldDescription>
          </FieldContent>
          <Switch
            id="project-show"
            name="visible"
            checked={visible}
            onCheckedChange={setVisible}
          />
        </Field>
      </FieldLabel>

      <FieldLabel htmlFor="project-featured" className="mt-2">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Featured</FieldTitle>
            <FieldDescription>
              This job is {featured ? 'featured' : 'not featured'} on your
              homepage.
            </FieldDescription>
          </FieldContent>
          <Switch
            id="project-featured"
            name="featured"
            checked={featured}
            onCheckedChange={setFeatured}
          />
        </Field>
      </FieldLabel>

      <Field>
        <FieldLabel htmlFor="project-images">Images</FieldLabel>
        {imageFiles.map((preview, index) => (
          <Attachment className="w-full p-4!" key={`preview-${index}`}>
            <AttachmentMedia>
              {preview ? (
                <Image
                  src={preview.file ? preview.preview : ''}
                  alt="Preview"
                  className="h-10 w-10 rounded-lg object-cover"
                  width={40}
                  height={40}
                />
              ) : (
                <TbImageInPicture />
              )}
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>
                {imageFiles?.[index]?.file?.name || 'Preview'}
              </AttachmentTitle>
              <AttachmentDescription>
                {imageFiles?.[index]?.file?.type || 'Image'} ·{' '}
                {imageFiles?.[index]?.file?.size || ''} bytes
              </AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                aria-label={`Remove ${imageFiles?.[index]?.file?.name || 'Preview'}`}
                onClick={() => removeImage(index)}
              >
                <TbX />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        ))}
        <Input
          ref={imageInputRef}
          id="project-images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
        <label
          htmlFor="project-images"
          className={buttonVariants({ variant: 'outline' })}
        >
          Upload Images
        </label>
      </Field>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row">
        <Button type="submit" className="px-4">
          <TbDeviceFloppy className="h-4 w-4" />
          Save Project
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="px-4"
          onClick={() => router.back()}
        >
          <TbX />
          Cancel
        </Button>
      </div>
    </form>
  );
}
