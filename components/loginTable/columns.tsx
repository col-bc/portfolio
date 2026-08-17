'use client';

import { cn } from '@/lib/util/utils';
import { type LoginAttempt } from '@/prisma/generated/client';
import { createColumnHelper } from '@tanstack/react-table';
import {
  TbArrowDown,
  TbBrandChrome,
  TbBrandEdge,
  TbBrandFirefox,
  TbBrandSafari,
  TbBrowser,
  TbCircleCheck,
} from 'react-icons/tb';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { type DataTableFeatures } from './table-features';

const columnHelper = createColumnHelper<DataTableFeatures, LoginAttempt>();

export const columns = columnHelper.columns([
  columnHelper.accessor('timestamp', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Timestamp
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
  columnHelper.accessor('success', {
    header: 'Status',
    cell: (info) => (
      <Badge variant="outline">
        {info.getValue() ? <TbCircleCheck className="mr-2" /> : null}
        {info.getValue() ? 'Success' : 'Failure'}
      </Badge>
    ),
    enableSorting: true,
  }),
  columnHelper.accessor('ipAddress', {
    header: 'IP Address',
  }),
  columnHelper.accessor('userAgent', {
    header: 'User Agent',
    cell: (info) => {
      const obj = JSON.parse(info.getValue());
      const browser = obj.browser ?? 'Unknown';
      const os = obj.os ?? 'Unknown';
      const browserIcon = () => {
        switch (browser.toLowerCase().split(' ')[0]) {
          case 'chrome':
            return <TbBrandChrome className="size-5! shrink-0" />;
          case 'firefox':
            return <TbBrandFirefox className="size-5! shrink-0" />;
          case 'safari':
            return <TbBrandSafari className="size-5! shrink-0" />;
          case 'edge':
            return <TbBrandEdge className="size-5! shrink-0" />;
          default:
            return <TbBrowser className="size-5! shrink-0" />;
        }
      };
      return (
        <div className="flex items-center gap-2">
          {browserIcon()}
          <span>{browser}</span>
          <span>({os})</span>
        </div>
      );
    },
    enableSorting: true,
  }),
]);
