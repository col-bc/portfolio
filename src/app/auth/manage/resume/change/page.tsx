import ChangeResumeForm from '@/components/forms/changeResumeForm';
import { Heading } from '@/components/ui/heading';

export default async function ChangeResumePage() {
  return (
    <section className="flex w-full flex-col gap-8 md:gap-12 lg:gap-16">
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
        <Heading>Change Resume</Heading>
      </div>

      <ChangeResumeForm />
    </section>
  );
}
