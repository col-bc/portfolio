import ProjectCard from '@/components/projectCard';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { handleGetProjects } from '@/lib/project/projectActions';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { TbFolderCode, TbPlus } from 'react-icons/tb';

export const metadata: Metadata = {
  title: 'Manage Projects',
};

export default async function ProjectsPage() {
  const projects = await handleGetProjects();

  const projectData = projects.success ? projects.data : [];

  return (
    <React.Fragment>
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
        <Heading>Manage Projects</Heading>
        <Link
          href="/auth/manage/projects/new"
          className={buttonVariants({ size: 'lg', className: 'shadow' })}
        >
          <TbPlus className="h-4 w-4" />
          Create Project
        </Link>
      </div>

      <div className="flex w-full flex-col gap-4 md:gap-6">
        {projectData.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed bg-muted p-8 text-center">
            <TbFolderCode className="h-12 w-12 text-muted-foreground" />
            <Heading size="subSub">No projects found</Heading>
            <p className="text-sm text-muted-foreground">
              No projects found. You can create a new project by clicking the
              button above.
            </p>
          </div>
        ) : (
          projectData.map((project) => (
            <ProjectCard key={project.id} project={project} showActions />
          ))
        )}
      </div>
    </React.Fragment>
  );
}
