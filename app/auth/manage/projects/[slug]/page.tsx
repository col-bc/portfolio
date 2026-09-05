import ProjectForm from '@/components/forms/projectForm';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Heading } from '@/components/ui/heading';
import { handleGetProjectById } from '@/lib/project/projectActions';
import { TbFolderCode, TbHome } from 'react-icons/tb';

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
          </div>
          <ProjectForm project={project.data} />
        </section>
      </>
    );
  }
}
