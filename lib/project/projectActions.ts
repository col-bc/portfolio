'use server';

import { ActionState } from '@/types';
import { writeScreen } from '../util/fileSystemService';
import {
  createProject,
  deleteProject,
  deleteProjectImage,
  getProject,
  getProjects,
  ProjectWithImages,
  updateProject,
  UpdateProjectDTO,
} from './projectDAL';

export async function handleCreateProject(
  formData: FormData
): Promise<ActionState<ProjectWithImages>> {
  if (
    !formData.get('title') ||
    !formData.get('description') ||
    !formData.get('tags')
  ) {
    return {
      success: false,
      error: 'Missing required fields',
      type: 'VALIDATION',
    };
  }

  const dirName = `${formData.get('title')?.toString().replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;

  const imagePaths = await Promise.all(
    Array.from(formData.getAll('images') as File[]).map(
      async (image, index) => {
        const imagePath = await writeScreen(
          dirName,
          `project-image-${Date.now()}-${index}.png`,
          Buffer.from(await image.arrayBuffer())
        );
        return imagePath;
      }
    )
  );

  const project = await createProject(
    {
      title: formData.get('title')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      tags: formData.get('tags')?.toString() || '',
      link: formData.get('link')?.toString() || undefined,
      repository: formData.get('repository')?.toString() || undefined,
      featured: formData.get('featured') === 'true',
      visible: formData.get('visible') === 'true',
    },
    imagePaths.map((path) => ({
      url: path,
      altText: `${formData.get('title')?.toString() || ''} image`,
    }))
  );
  return { success: true, data: project };
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

export async function handleUpdateProject(
  projectId: string,
  updateData: UpdateProjectDTO
): Promise<ActionState<ProjectWithImages>> {
  try {
    const project = await getProject(projectId);
    if (!project) {
      return {
        success: false,
        error: 'Project not found',
        type: 'NOT_FOUND',
      };
    }
    const updatedProject = await updateProject(projectId, updateData);
    return { success: true, data: updatedProject };
  } catch (error) {
    console.warn('[ProjectActions] Failed to update project:', error);
    return {
      success: false,
      error: 'Failed to update project',
      type: 'UNKNOWN',
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
