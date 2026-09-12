import ChangeResumeForm from '@/components/forms/changeResumeForm';
import { Heading } from '@/components/ui/heading';
import React from 'react';

export default async function ChangeResumePage() {
  return (
    <React.Fragment>
      <section className="flex flex-col items-start gap-8 md:gap-12 lg:gap-16">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
          <Heading>Change Resume</Heading>
        </div>

        <ChangeResumeForm />
      </section>
    </React.Fragment>
  );
}
