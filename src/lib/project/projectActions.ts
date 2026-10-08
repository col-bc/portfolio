'use server';

import { ActionState } from '@/types';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '../auth/session';
import { prisma } from '../prisma';
import { saveProjectImage } from '../util/fileSystemService';
import { getProject } from './projectDAL';

export interface CreateProjectDTO {
  title: string;
  description: string;
  tags: string;
  visible?: boolean;
  featured?: boolean;
  link?: string | null;
  repository?: string | null;
}

export interface CreateProjectImageDTO {
  url: string;
  altText: string;
}

export async function createProject(formData: FormData) {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tags = formData.get('tags') as string;
    const visible = formData.get('visible') === 'true';

    const imageFiles = formData.getAll('images') as File[];
    const validFiles = imageFiles.filter(
      (file) => file.size > 0 && file.name !== 'undefined'
    );

    const projectImagesDTO = [];
    for (const file of validFiles) {
      const savedUrl = await saveProjectImage(file);

      projectImagesDTO.push({
        url: savedUrl,
        altText: `${title} screenshot`,
      });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        tags,
        visible,
        images: {
          create: projectImagesDTO,
        },
      },
      include: {
        images: true,
      },
    });

    return { success: true, data: project };
  } catch (error) {
    console.warn('Failed to create project:', error);
    return { success: false, error: 'Failed to process project and images.' };
  }
}

export interface UpdateProjectDTO {
  title: string;
  description: string;
  tags: string;
  visible: boolean;
  featured: boolean;
  link?: string | null;
  repository?: string | null;
}

export async function updateProject(formData: FormData) {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }
  try {
    const id = formData.get('id') as string;
    if (!id) {
      return { success: false, error: 'Project ID is missing.' };
    }

    // Extract text fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tags = formData.get('tags') as string;
    const link = formData.get('link') as string;
    const repository = formData.get('repository') as string;
    const visible = formData.get('visible') === 'true';
    const featured = formData.get('featured') === 'true';
    const imagesToDelete = formData.getAll('imagesToDelete') as string[];
    const imageFiles = formData.getAll('images') as File[];

    // Filter out invalid files (size 0 or name 'undefined')
    const validFiles = imageFiles.filter(
      (file) => file.size > 0 && file.name !== 'undefined'
    );

    const newImagesDTO: CreateProjectImageDTO[] = [];
    for (const file of validFiles) {
      const savedUrl = await saveProjectImage(file);
      newImagesDTO.push({
        url: savedUrl,
        altText: `${title} screenshot`,
      });
    }

    const projectDTO: UpdateProjectDTO = {
      title,
      description,
      tags,
      visible,
      featured,
      link: link || null,
      repository: repository || null,
    };

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...projectDTO,
        images: {
          // 1. Delete the images the user removed in the UI
          deleteMany: {
            id: { in: imagesToDelete },
          },
          // 2. Create and attach the newly uploaded images
          create: newImagesDTO,
        },
      },
      include: {
        images: true,
      },
    });

    revalidatePath('/auth/manage/projects');
    revalidatePath(`/auth/manage/projects/${id}`);
    revalidatePath('/');

    return { success: true, data: updatedProject };
  } catch (error) {
    console.warn('Failed to update project:', error);
    return {
      success: false,
      error: 'Failed to update the project and images.',
    };
  }
}

export async function deleteProject(
  projectId: string
): Promise<ActionState<null>> {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }
  try {
    const project = await getProject(projectId);
    if (!project) {
      return {
        success: false,
        error: 'Project not found',
        type: 'NOT_FOUND',
      };
    }
    await prisma.project.delete({
      where: { id: projectId },
      include: {
        images: true,
      },
    });
    return { success: true, data: null };
  } catch (error) {
    console.warn('[ProjectActions] Failed to delete project:', error);
    return {
      success: false,
      error: 'Failed to delete project',
      type: 'SERVER_ERROR',
    };
  }
}

export async function handleDeleteProjectImage(
  projectId: string,
  imageId: string
): Promise<ActionState<null>> {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }
  try {
    const project = await getProject(projectId);
    if (!project) {
      return {
        success: false,
        error: 'Project not found',
        type: 'NOT_FOUND',
      };
    }
    await prisma.projectImage.delete({
      where: { id: imageId },
    });
    return { success: true, data: null };
  } catch (error) {
    console.warn('[ProjectActions] Failed to delete project image:', error);
    return {
      success: false,
      error: 'Failed to delete project image',
      type: 'SERVER_ERROR',
    };
  }
}
