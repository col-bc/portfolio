import { cn } from '@/lib/utils';
import { TbLoader } from 'react-icons/tb';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <TbLoader
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
