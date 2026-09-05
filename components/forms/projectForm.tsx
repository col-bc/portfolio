'use client';

import {
  handleCreateProject,
  handleDeleteProject,
  handleUpdateProject,
} from '@/lib/project/projectActions';
import { ProjectWithImages } from '@/lib/project/projectDAL';
import { formatTimestamp } from '@/lib/util/utils';
import { ProjectImage } from '@/prisma/generated/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  TbAlertCircleFilled,
  TbCalendarPlus,
  TbDeviceFloppy,
  TbHash,
  TbImageInPicture,
  TbTrash,
  TbX,
} from 'react-icons/tb';
import { toast } from 'sonner';
import ConfirmDelete from '../confirmDelete';
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

export default function ProjectForm({
  project,
}: {
  project: ProjectWithImages | null;
}) {
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
  const [existingImages, setExistingImages] = React.useState<ProjectImage[]>(
    (project?.images as ProjectImage[] | undefined) ?? []
  );
  const [imagesToDelete, setImagesToDelete] = React.useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  const deleteProject = async () => {
    if (!project) return;
    const status = await handleDeleteProject(project.id!);
    if (!status.success) {
      toast.error(
        status.error || 'An unknown error occurred while deleting the project.'
      );
      return;
    } else {
      toast.success('Project deleted successfully.');
      router.push('/auth/manage/projects');
    }
  };

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
    if (mode === 'edit' && project?.id) {
      formData.append('id', project.id);
    }
    formData.delete('images');

    imageFiles.forEach((imageItem) => {
      formData.append('images', imageItem.file);
    });
    imagesToDelete.forEach((id) => {
      formData.append('imagesToDelete', id);
    });
    formData.set('visible', visible.toString());
    formData.set('featured', featured.toString());

    const status =
      mode === 'edit'
        ? await handleUpdateProject(formData)
        : await handleCreateProject(formData);

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

        {existingImages.map((img: ProjectImage) => (
          <Attachment className="w-full p-4!" key={img.id}>
            <AttachmentMedia>
              <Image
                src={img.url}
                alt={img.altText || 'Existing Project Image'}
                className="h-10 w-10 rounded-lg object-cover"
                width={40}
                height={40}
              />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>Existing Image</AttachmentTitle>
              <AttachmentDescription>Saved on server</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction
                aria-label="Remove existing image"
                onClick={() => {
                  setExistingImages((prev) =>
                    prev.filter((i) => i.id !== img.id)
                  );
                  setImagesToDelete((prev) => [...prev, img.id]);
                }}
              >
                <TbX />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        ))}

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
          Upload Additional Images
        </label>
      </Field>

      {mode === 'edit' && !!project && (
        <div className="gap-1 divide-y divide-border rounded-lg border border-border bg-background text-sm text-muted-foreground">
          <div className="flex items-center gap-1 p-2">
            <TbHash className="h-4 w-4" />
            <span className="flex gap-1 font-mono text-muted-foreground">
              {project.id}
            </span>
          </div>
          <div className="flex items-center gap-1 p-2">
            <TbCalendarPlus className="h-4 w-4" />
            <span className="text-muted-foreground">
              Created {formatTimestamp(new Date(project.createdAt))}
            </span>
          </div>
          <div className="flex items-center gap-1 p-2">
            <TbDeviceFloppy className="h-4 w-4" />
            <span className="text-muted-foreground">
              Updated {formatTimestamp(new Date(project.updatedAt))}
            </span>
          </div>
        </div>
      )}

      <div className="mt-2 flex flex-col gap-4 sm:flex-row">
        <Button type="submit" className="px-4">
          <TbDeviceFloppy className="h-4 w-4" />
          Save Project
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="px-4"
          onClick={() => router.push('/auth/manage/projects')}
        >
          <TbX />
          Cancel
        </Button>
        {mode === 'edit' && (
          <Button
            variant="destructive"
            onClick={() => setShowDeleteConfirm(true)}
            className="ml-auto px-4"
          >
            <TbTrash className="h-4 w-4" />
            Delete Project
          </Button>
        )}
      </div>

      {mode === 'edit' && (
        <ConfirmDelete
          onConfirm={deleteProject}
          onOpenChange={() => setShowDeleteConfirm(!showDeleteConfirm)}
          open={showDeleteConfirm}
          title="Delete Project?"
          description="Are you sure you want to delete this project? This action cannot be undone."
        />
      )}
    </form>
  );
}
