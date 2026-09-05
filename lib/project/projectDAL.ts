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
}

export async function getProjects(): Promise<ProjectWithImages[]> {
  const projects = await prisma.project.findMany({
    include: {
      images: true,
    },
  });

  return projects;
}

export async function getProject(
  projectId: string
): Promise<ProjectWithImages | null> {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      images: true,
    },
  });
  return project;
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
}

export async function deleteProject(
  projectId: string
): Promise<ProjectWithImages> {
  const project = await prisma.project.delete({
    where: { id: projectId },
    include: {
      images: true,
    },
  });
  return project;
}

export async function deleteProjectImage(imageId: string): Promise<void> {
  await prisma.projectImage.delete({
    where: { id: imageId },
  });
}
