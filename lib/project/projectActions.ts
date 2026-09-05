'use server';

import { ActionState } from '@/types';
import { revalidatePath } from 'next/cache';
import { saveProjectImage } from '../util/fileSystemService';
import {
  createProject,
  CreateProjectImageDTO,
  deleteProject,
  deleteProjectImage,
  getProject,
  getProjects,
  ProjectWithImages,
  updateProject,
  UpdateProjectDTO,
} from './projectDAL';

/**
 * Handles the creation of a new project along with its associated images.
 * @param formData - The form data containing project details and image files.
 * @returns An ActionState object indicating success or failure, along with the created project data or an error message.
 */
export async function handleCreateProject(formData: FormData) {
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

    const newProject = await createProject(
      { title, description, tags, visible },
      projectImagesDTO
    );

    return { success: true, data: newProject };
  } catch (error) {
    console.error('Failed to create project:', error);
    return { success: false, error: 'Failed to process project and images.' };
  }
}

export async function handleGetProjects(): Promise<
  ActionState<ProjectWithImages[]>
> {
  try {
    const projects = await getProjects();
    return { success: true, data: projects };
  } catch (error) {
    console.warn('[ProjectActions] Failed to fetch projects:', error);
    return {
      success: false,
      error: 'Failed to fetch projects',
      type: 'UNKNOWN',
    };
  }
}

/**
 * Handles fetching a project by its ID.
 * @param projectId - The ID of the project to fetch.
 * @returns An ActionState object indicating success or failure, along with the fetched project data or an error message.
 */
export async function handleGetProjectById(
  projectId: string
): Promise<ActionState<ProjectWithImages | null>> {
  try {
    const project = await getProject(projectId);
    if (!project) {
      return {
        success: false,
        error: 'Project not found',
        type: 'NOT_FOUND',
      };
    }
    return { success: true, data: project };
  } catch (error) {
    console.warn('[ProjectActions] Failed to fetch project by ID:', error);
    return {
      success: false,
      error: 'Failed to fetch project by ID',
      type: 'UNKNOWN',
    };
  }
}

export async function handleUpdateProject(formData: FormData) {
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

    const updatedProject = await updateProject(
      id,
      projectDTO,
      newImagesDTO,
      imagesToDelete
    );

    revalidatePath('/auth/manage/projects');
    revalidatePath(`/auth/manage/projects/${id}`);
    revalidatePath('/');

    return { success: true, data: updatedProject };
  } catch (error) {
    console.error('Failed to update project:', error);
    return {
      success: false,
      error: 'Failed to update the project and images.',
    };
  }
}

export async function handleDeleteProject(
  projectId: string
): Promise<ActionState<null>> {
  try {
    const project = await getProject(projectId);
    if (!project) {
      return {
        success: false,
        error: 'Project not found',
        type: 'NOT_FOUND',
      };
    }
    await deleteProject(projectId);
    return { success: true, data: null };
  } catch (error) {
    console.warn('[ProjectActions] Failed to delete project:', error);
    return {
      success: false,
      error: 'Failed to delete project',
      type: 'UNKNOWN',
    };
  }
}

export async function handleDeleteProjectImage(
  projectId: string,
  imageId: string
): Promise<ActionState<null>> {
  try {
    const project = await getProject(projectId);
    if (!project) {
      return {
        success: false,
        error: 'Project not found',
        type: 'NOT_FOUND',
      };
    }
    await deleteProjectImage(imageId);
    return { success: true, data: null };
  } catch (error) {
    console.warn('[ProjectActions] Failed to delete project image:', error);
    return {
      success: false,
      error: 'Failed to delete project image',
      type: 'UNKNOWN',
    };
  }
}
