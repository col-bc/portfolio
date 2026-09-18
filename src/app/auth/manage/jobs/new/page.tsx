import JobForm from '@/components/forms/jobForm';
import { Heading } from '@/components/ui/heading';

export default function CreateNewJobPage() {
  return (
    <div className="flex w-full flex-col gap-8 md:gap-12 lg:gap-16">
      <Heading>Create New Job</Heading>

      <JobForm job={null} />
    </div>
  );
}
