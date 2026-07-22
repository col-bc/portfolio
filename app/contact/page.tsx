import ContactForm from '@/components/forms/contactForm';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb';

export default function ContactPage() {
  return (
    <section className="flex flex-col items-start gap-8 px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Get in Touch
      </h1>
      <p className="text-lg leading-relaxed text-foreground">
        Whether you&apos;re looking to collaborate on a new project or want to
        discuss an open role, I&apos;d love to connect. Fill out the form below
        and I&apos;ll be in touch shortly
      </p>

      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <ContactForm />
        <div className="flex flex-col justify-center gap-4">
          {/* Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://www.linkedin.com/in/colbycooper"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
            >
              <TbBrandLinkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Link>
            <Link
              href="https://github.com/colbc"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
            >
              <TbBrandGithub className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/contract.svg"
              alt="Contract"
              width={500}
              height={500}
              className="hidden w-80 self-center md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
