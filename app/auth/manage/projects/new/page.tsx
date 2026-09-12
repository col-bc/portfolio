import ProjectForm from '@/components/forms/projectForm';
import { Heading } from '@/components/ui/heading';
import React from 'react';

export default function CreateNewJobPage() {
  return (
    <React.Fragment>
      <Heading>Create New Project</Heading>

      <ProjectForm project={null} />
    </React.Fragment>
  );
}
