import ContactForm from '@/components/forms/contactForm';

export default function ContactPage() {
  return (
    <section className="flex flex-col items-start gap-8 px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Get in Touch
      </h1>
      <p className="text-lg leading-relaxed text-foreground">
        Interested in collaborating, or have a role that you think I would be a
        good fit for? Please feel free to reach out to me using the form below,
        and I will get back to you as soon as possible.
      </p>

      <ContactForm />
    </section>
  );
}
