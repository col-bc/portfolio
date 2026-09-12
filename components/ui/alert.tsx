import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { AlertFeedback } from '@/types';
import {
  TbCircleCheckFilled,
  TbExclamationCircleFilled,
  TbInfoCircleFilled,
} from 'react-icons/tb';

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground',
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
        className
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-action"
      className={cn('absolute top-2.5 right-3', className)}
      {...props}
    />
  );
}

function AlertIcon({ type }: { type: AlertFeedback['type'] }) {
  switch (type) {
    case 'ERROR':
      return (
        <TbExclamationCircleFilled className="size-4 shrink-0 text-red-500!" />
      );
    case 'SUCCESS':
      return (
        <TbCircleCheckFilled className="size-4 shrink-0 text-green-500!" />
      );
    case 'INFO':
      return <TbInfoCircleFilled className="size-4 shrink-0 text-blue-500!" />;
    default:
      return null;
  }
}

export { Alert, AlertAction, AlertDescription, AlertIcon, AlertTitle };
