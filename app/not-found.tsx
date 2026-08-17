import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { TbHome, TbMapPinOff } from 'react-icons/tb';

export default function NotFound() {
  return (
    <section className="flex flex-col items-start gap-8 px-4 py-20 md:gap-12">
      <div className="flex w-full flex-col-reverse items-center gap-8 md:flex-row md:gap-12">
        <div className="w-full max-w-sm">
          <Heading className="mb-6">Page Not Found</Heading>
          <p className="text-base leading-relaxed text-muted-foreground">
            The page you are looking for could not be found or does not exist.
            Please check the URL or return to the homepage. If you believe this
            is an error, please{' '}
            <Link href="/contact" className="text-primary hover:underline">
              reach out
            </Link>{' '}
            and let me know.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <Link
              href="/"
              className={cn(buttonVariants({ size: 'default' }), 'shadow')}
            >
              <TbHome /> Back to Homepage
            </Link>
          </div>
        </div>
        <div className="flex-1 items-center justify-center md:flex">
          <div className="relative flex h-64 w-64 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/40 blur-3xl"></div>
            <TbMapPinOff className="relative z-10 h-48 w-48 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
