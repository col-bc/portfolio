import ProjectCard from '@/components/projectCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { handleGetProjects } from '@/lib/project/projectActions';
import { Metadata } from 'next';
import Link from 'next/link';
import { TbFolderCode, TbHome, TbPlus } from 'react-icons/tb';

export const metadata: Metadata = {
  title: 'Manage Projects',
};

export default async function ProjectsPage() {
  const projects = await handleGetProjects();

  const projectData = projects.success ? projects.data : [];

  return (
    <>
      <Breadcrumb className="w-full border-b bg-transparent px-4 py-2 text-muted-foreground">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/auth/manage"
              className="flex items-center gap-2"
            >
              <TbHome />
              Manage
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Projects</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="flex flex-col items-start gap-10 px-4 py-8 md:gap-16 lg:gap-20">
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
      </section>
    </>
  );
}
