import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const headingVariants = cva('font-bold tracking-tight', {
  variants: {
    size: {
      subSub: 'text-xl underline decoration-chart-1 decoration-2 md:text-2xl',
      sub: 'text-2xl underline decoration-chart-1 decoration-2 md:text-3xl',
      default:
        'text-4xl leading-tight font-black! tracking-tighter md:text-5xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

function Heading({
  children,
  className,
  size,
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'sub' | 'subSub';
}) {
  if (size === 'subSub') {
    return (
      <h3 className={cn(headingVariants({ size }), className)}>{children}</h3>
    );
  }
  if (size === 'sub') {
    return (
      <h2 className={cn(headingVariants({ size }), className)}>{children}</h2>
    );
  }
  return (
    <h1 className={cn(headingVariants({ size }), className)}>{children}</h1>
  );
}

export { Heading, headingVariants };
