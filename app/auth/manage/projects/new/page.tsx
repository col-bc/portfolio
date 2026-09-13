import ProjectForm from '@/components/forms/projectForm';
import { Heading } from '@/components/ui/heading';

export default function CreateNewProjectPage() {
  return (
    <div className="flex w-full flex-col gap-8 md:gap-12 lg:gap-16">
      <Heading>Create New Project</Heading>

      <ProjectForm project={null} />
    </div>
  );
}
