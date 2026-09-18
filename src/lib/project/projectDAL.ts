import { prisma } from '@/lib/prisma';
import { Project, ProjectImage } from '@/prisma/generated/client';
import 'server-only';

export interface ProjectWithImages extends Project {
  images: ProjectImage[];
}
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

export async function createProject(
  data: CreateProjectDTO,
  images: CreateProjectImageDTO[]
): Promise<ProjectWithImages> {
  try {
  const project = await prisma.project.create({
    data: {
      ...data,
      images: {
        create: images,
      },
    },
    include: {
      images: true,
    },
  });

  return project;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function getProjects(): Promise<ProjectWithImages[]> {
  try {
    const projects = await prisma.project.findMany({
      include: {
        images: true,
      },
    });

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function getProject(
  projectId: string
): Promise<ProjectWithImages | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        images: true,
      },
    });
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
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

export async function updateProject(
  id: string,
  data: UpdateProjectDTO,
  newImages: CreateProjectImageDTO[],
  imagesToDeleteIds: string[]
): Promise<Project> {
  try {
    const updatedProject = await prisma.project.update({
    where: { id },
    data: {
      ...data,
      images: {
        // 1. Delete the images the user removed in the UI
        deleteMany: {
          id: { in: imagesToDeleteIds },
        },
        // 2. Create and attach the newly uploaded images
        create: newImages,
      },
    },
    include: {
      images: true,
    },
  });

    return updatedProject;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export async function deleteProject(
  projectId: string
): Promise<ProjectWithImages> {
  try {
  const project = await prisma.project.delete({
    where: { id: projectId },
    include: {
      images: true,
    },
  });
  return project;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

export async function deleteProjectImage(imageId: string): Promise<void> {
  try {
    await prisma.projectImage.delete({
      where: { id: imageId },
    });
  } catch (error) {
    console.error('Error deleting project image:', error);
    throw error;
  }
}
