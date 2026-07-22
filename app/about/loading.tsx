import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 px-4 py-8 md:gap-12">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Loading...
      </h1>
      <Spinner className="h-8 w-8 text-primary" />
    </section>
  );
}
