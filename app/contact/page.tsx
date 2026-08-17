import ContactIllustration from '@/assets/illustrations/conversation.svg';
import ContactForm from '@/components/forms/contactForm';
import { Heading } from '@/components/ui/heading';

export default function ContactPage() {
  return (
    <section className="flex flex-col items-start gap-8 px-4 py-8">
      <Heading>Get in Touch</Heading>
      <p className="text-lg leading-relaxed text-foreground">
        Whether you&apos;re looking to collaborate on a new project or want to
        discuss an open role, I&apos;d love to connect. Fill out the form below
        and I&apos;ll be in touch shortly
      </p>

      <div className="mb-8 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <ContactForm />
        <div className="flex flex-col items-center">
          <ContactIllustration
            width="800"
            height="600"
            viewBox="0 0 800 600"
            className="hidden size-124 w-full text-primary md:block"
          />
        </div>
      </div>
    </section>
  );
}
