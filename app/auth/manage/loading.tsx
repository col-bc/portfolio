import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-8 px-4 py-8 md:gap-12">
      <Spinner className="size-24 text-muted-foreground" />
      <p className="animate-pulse text-muted-foreground">
        Getting things ready...
      </p>
    </div>
  );
}
