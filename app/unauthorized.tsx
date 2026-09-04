import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import Link from 'next/link';
import { TbArrowRight, TbHome, TbTrafficCone } from 'react-icons/tb';

export default function Unauthorized() {
  return (
    <section className="flex min-h-[75vh] flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <TbTrafficCone className="h-10 w-10 text-primary" />
          </div>
          <Heading size="sub">Unauthorized Access</Heading>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you are trying to access is restricted. This event has been
            logged for security purposes. Please{' '}
            <Link href="/contact" className="underline hover:text-foreground">
              contact me
            </Link>{' '}
            if you believe this is an error.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <Link
            href="/auth"
            className={buttonVariants({
              size: 'default',
              variant: 'secondary',
            })}
          >
            <span>Login</span>
            <TbArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className={buttonVariants({
              size: 'default',
              variant: 'default',
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
