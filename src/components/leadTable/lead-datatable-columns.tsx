'use client';

import { cn } from '@/lib/util/utils';
import { type Lead } from '@/prisma/generated/client';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { TbArrowDown } from 'react-icons/tb';
import { DataTableFeatures } from '../table-features';
import { Badge } from '../ui/badge';
import { Button, buttonVariants } from '../ui/button';

const columnHelper = createColumnHelper<DataTableFeatures, Lead>();

const leadBadgeClasses = (status: string) => {
  const val = status.toLocaleLowerCase();
  return cn(
    'uppercase',
    val==='unread' && 'text-primary bg-primary/10! border-primary!',
    ['read', 'in-progress'].includes(val) && 'text-blue-600 dark:text-blue-400',
    val === 'follow-up' && 'text-yellow-600 dark:text-yellow-400',
    val === 'closed' && 'text-foreground'
  );
};

export const leadColumns = columnHelper.columns([
  columnHelper.accessor('name', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Sender Name
          <TbArrowDown
            className={cn(
              'ml-2 h-4 w-4',
              column.getIsSorted() === 'asc' ? 'rotate-180' : ''
            )}
          />
        </Button>
      );
    },
    cell: (info) => (
      <Link
        href={`/auth/manage/leads/${info.row.original.id}`}
        className="text-foreground hover:underline"
      >
        {info.getValue()}
      </Link>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('subject', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Subject
          <TbArrowDown
            className={cn(
              'ml-2 h-4 w-4',
              column.getIsSorted() === 'asc' ? 'rotate-180' : ''
            )}
          />
        </Button>
      );
    },
    enableSorting: true,
    cell: (info) => (
      <Badge variant="secondary" className="uppercase">
        {info.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor('status', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <TbArrowDown
            className={cn(
              'ml-2 h-4 w-4',
              column.getIsSorted() === 'asc' ? 'rotate-180' : ''
            )}
            />
        </Button>
      );
    },
    enableSorting: true,
    cell: (info) => (
      <Badge variant="outline" className={leadBadgeClasses(info.getValue())}>
        
        {info.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor('source', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Source
          <TbArrowDown
            className={cn(
              'ml-2 h-4 w-4',
              column.getIsSorted() === 'asc' ? 'rotate-180' : ''
            )}
          />
        </Button>
      );
    },
    enableSorting: true,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Received Date
          <TbArrowDown
            className={cn(
              'ml-2 h-4 w-4',
              column.getIsSorted() === 'asc' ? 'rotate-180' : ''
            )}
          />
        </Button>
      );
    },
    sortFn: (rowA, rowB, columnId) => {
      const a = new Date(rowA.getValue(columnId) as string).getTime();
      const b = new Date(rowB.getValue(columnId) as string).getTime();
      return a - b;
    },
    enableSorting: true,
    cell: (info) => <span>{new Date(info.getValue()).toLocaleString()}</span>,
  }),
  columnHelper.accessor('id', {
    header: () => 'Actions',
    cell: (info) => (
      <Link
        href={`/auth/manage/leads/${info.getValue()}`}
        className={buttonVariants({ variant: 'outline' })}
      >
        Open
      </Link>
    ),
  }),
]);
