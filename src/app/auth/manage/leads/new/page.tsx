import NewLeadForm from '@/components/forms/newLeadForm';
import { Heading } from '@/components/ui/heading';

export default function CreateNewLeadPage() {
  return (
    <div className="flex w-full flex-col gap-8 md:gap-12 lg:gap-16">
      <Heading>Create New Lead</Heading>

      <NewLeadForm />
    </div>
  );
}
