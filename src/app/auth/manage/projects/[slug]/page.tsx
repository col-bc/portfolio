import ProjectForm from '@/components/forms/projectForm';
import { Heading } from '@/components/ui/heading';
import { handleGetProjectById } from '@/lib/project/projectActions';
import { TbFolderCode } from 'react-icons/tb';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await handleGetProjectById(slug);

  if (!project.success) {
    console.error('Error fetching project:', project);
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed bg-muted p-8 text-center">
        <TbFolderCode className="h-12 w-12 text-muted-foreground" />
        <Heading size="subSub">Project not found</Heading>
        <p className="text-sm text-muted-foreground">
          The project you are looking for does not exist. Please check the URL
          or return to the projects list.
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex w-full flex-col gap-8 md:gap-12 lg:gap-16">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
          <Heading>Manage Projects</Heading>
        </div>
        <ProjectForm project={project.data} />
      </div>
    );
  }
}
