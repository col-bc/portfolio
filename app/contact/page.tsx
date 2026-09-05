import ContactForm from '@/components/forms/contactForm';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbMail,
  TbMapPin,
} from 'react-icons/tb';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <section className="flex flex-col items-start gap-10 px-4 py-8 md:gap-16 lg:gap-20">
      <div className="flex flex-col gap-6 md:gap-8">
        <Heading>Get in Touch</Heading>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Whether you&apos;re looking to collaborate on a new project or want to
          discuss an open role, I&apos;d love to connect. Fill out the form
          below and I&apos;ll be in touch shortly.
        </p>
      </div>

      <div className="mb-8 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <ContactForm />
        <div className="flex h-full w-full flex-col justify-center space-y-8 rounded-xl bg-muted/50 p-8 lg:p-12">
          <div>
            <h3 className="font-heading text-xl font-semibold">
              Direct Contact
            </h3>
            <p className="mt-2 text-muted-foreground">
              Prefer to send an email directly? Reach out at:
            </p>
            {/* Update with your actual email */}
            <a
              href="mailto:colby@example.com"
              className="mt-4 flex items-center text-primary hover:underline"
            >
              <TbMail className="mr-2 h-5 w-5" />
              colby@example.com
            </a>
          </div>

          <hr className="border-border" />

          <div>
            <h3 className="font-heading text-xl font-semibold">Location</h3>
            <div className="mt-4 flex items-center text-muted-foreground">
              <TbMapPin className="mr-2 h-5 w-5 text-primary" />
              Kennesaw, GA (EST)
            </div>
          </div>

          <hr className="border-border" />

          <div>
            <h3 className="font-heading text-xl font-semibold">Connect</h3>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="https://github.com/col-bc"
                target="_blank"
                className={buttonVariants({
                  variant: 'outline',
                  className: 'w-fit justify-start',
                })}
              >
                <TbBrandGithub className="mr-2 h-5 w-5" />
                GitHub Repositories
              </Link>
              <Link
                href="https://www.linkedin.com/in/colbycooper/"
                target="_blank"
                className={buttonVariants({
                  variant: 'outline',
                  className: 'w-fit justify-start',
                })}
              >
                <TbBrandLinkedin className="mr-2 h-5 w-5" />
                LinkedIn Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
