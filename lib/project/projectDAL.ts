import { prisma } from '@/lib/prisma';
import { Project } from '@/prisma/generated/client';
import 'server-only';

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
): Promise<Project> {
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

export async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    include: {
      images: true,
    },
  });

  return projects;
}

export async function getProject(projectId: string): Promise<Project | null> {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      images: true,
    },
  });
  return project;
}

export interface UpdateProjectDTO {
  title?: string;
  description?: string;
  tags?: string;
  visible?: boolean;
  link?: string | null;
  repository?: string | null;
}

export async function updateProject(
  projectId: string,
  data: UpdateProjectDTO
): Promise<Project> {
  const project = await prisma.project.update({
    where: { id: projectId },
    data,
    include: {
      images: true,
    },
  });
  return project;
}

export async function deleteProject(projectId: string): Promise<Project> {
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
