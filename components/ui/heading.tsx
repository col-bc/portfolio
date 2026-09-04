import { cva } from 'class-variance-authority';

import { cn } from '@/lib/util/utils';

const headingVariants = cva('font-heading font-bold tracking-tight', {
  variants: {
    size: {
      subSub: 'text-xl md:text-2xl',
      sub: 'text-2xl md:text-3xl',
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
  as,
  className,
  size,
}: {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  size?: 'default' | 'sub' | 'subSub';
}) {
  const Component =
    as || (size === 'subSub' ? 'h3' : size === 'sub' ? 'h2' : 'h1');
  return (
    <Component className={cn(headingVariants({ size }), className)}>
      {children}
    </Component>
  );
}

export { Heading, headingVariants };
