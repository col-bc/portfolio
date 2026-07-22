import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TbArrowRight, TbBarrierBlock, TbHome } from 'react-icons/tb';

export default function Unauthorized() {
  return (
    <section className="flex flex-col items-start gap-8 px-4 py-20 md:gap-12">
      <div className="flex w-full flex-col-reverse items-center gap-8 md:flex-row md:gap-12">
        <div className="w-full max-w-sm">
          <h1 className="mb-6 text-4xl font-black tracking-tight">
            Unauthorized
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            You are not authorized to access this page. Please check your
            permissions or login to continue. If you believe this is an error,
            please{' '}
            <Link href="/contact" className="text-primary hover:underline">
              reach out
            </Link>{' '}
            and let me know.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link href="/">
              <Button variant="default">
                <TbHome />
                Back to Homepage
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="secondary">
                Login <TbArrowRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 items-center justify-center md:flex">
          <div className="relative flex h-64 w-64 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/40 blur-3xl"></div>

            <TbBarrierBlock className="relative z-10 h-48 w-48 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
