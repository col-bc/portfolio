'use server';

import { Project } from '@/prisma/generated/browser';
import { ActionState } from '@/types';
import { writeScreen } from '../util/fileSystemService';
import {
  createProject,
  CreateProjectDTO,
  deleteProject,
  deleteProjectImage,
  getProject,
  getProjects,
  updateProject,
  UpdateProjectDTO,
} from './projectDAL';

export async function handleCreateProject(
  projectData: CreateProjectDTO,
  images: Buffer[]
): Promise<ActionState<Project>> {
  if (!projectData.title || !projectData.description || !projectData.tags) {
    return {
      success: false,
      error: 'Missing required fields',
      type: 'VALIDATION',
    };
  }

  const dirName = `${projectData.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
  const imagePaths = await Promise.all(
    images.map(async (image, index) => {
      const imagePath = await writeScreen(
        dirName,
        `project-image-${Date.now()}-${index}.png`,
        image
      );
      return imagePath;
    })
  );

  const project = await createProject(
    projectData,
    imagePaths.map((path) => ({
      url: path,
      altText: `${projectData.title} image`,
    }))
  );
  return { success: true, data: project };
}

export async function handleGetProjects(): Promise<ActionState<Project[]>> {
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
): Promise<ActionState<Project>> {
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
): Promise<ActionState<Project>> {
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
