'use client';

import { cn } from '@/lib/util/utils';
import { type Lead } from '@/prisma/generated/client';
import { createColumnHelper } from '@tanstack/react-table';
import { TbArrowDown } from 'react-icons/tb';
import { DataTableFeatures } from '../table-features';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const columnHelper = createColumnHelper<DataTableFeatures, Lead>();

export const leadColumns = columnHelper.columns([
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
    cell: (info) => info.getValue().toLocaleString(),
    enableSorting: true,
    sortFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId) as Date;
      const b = rowB.getValue(columnId) as Date;
      return new Date(a).getTime() - new Date(b).getTime();
    },
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
      <Badge
        variant="secondary"
        className={cn(
          'uppercase',
          info.getValue().toLowerCase() === 'closed' && 'text-green-500'
        )}
      >
        {info.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor('name', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
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
]);
