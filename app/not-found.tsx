import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import Link from 'next/link';
import { TbHome, TbMap2 } from 'react-icons/tb';

export default function NotFound() {
  return (
    <section className="flex min-h-[75vh] flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <TbMap2 className="h-10 w-10 text-primary" />
          </div>
          <Heading size="sub">Page Not Found</Heading>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you are looking for does not exist. You can return to the
            homepage or log in if you have the appropriate credentials.
          </p>
        </div>
        <div className="flex w-full max-w-2xs justify-center">
          <Link
            href="/"
            className={buttonVariants({
              size: 'default',
              variant: 'default',
              className: 'w-full',
            })}
          >
            <TbHome className="h-4 w-4" />
            <span>GoBack Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
