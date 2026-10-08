import { prisma } from '@/lib/prisma';
import { Project, ProjectImage } from '@/prisma/generated/client';
import { cache } from 'react';
import 'server-only';

export interface ProjectWithImages extends Project {
  images: ProjectImage[];
}

export const getProjects = cache(async (): Promise<ProjectWithImages[]> => {
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
});

export const getProject = cache(
  async (projectId: string): Promise<ProjectWithImages | null> => {
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
);
