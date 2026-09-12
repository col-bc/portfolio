import JobForm from '@/components/forms/jobForm';
import { Heading } from '@/components/ui/heading';
import React from 'react';

export default function CreateNewJobPage() {
  return (
    <React.Fragment>
      <Heading>Create New Job</Heading>

      <JobForm job={null} />
    </React.Fragment>
  );
}
