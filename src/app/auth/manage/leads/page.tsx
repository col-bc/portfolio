import { DataTable } from '@/components/data-table';
import { leadColumns } from '@/components/leadTable/lead-datatable-columns';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { getLeads } from '@/lib/lead/leadDAL';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { TbPlus } from 'react-icons/tb';

export const metadata: Metadata = {
  title: 'Manage Leads',
};

export default async function LeadsPage() {
  const leads = await getLeads();
  return (
    <React.Fragment>
      <div className="flex w-full flex-col gap-8 md:gap-12 lg:gap-16">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
          <Heading>Manage Leads</Heading>
          <Link
            href="/auth/manage/leads/new"
            className={buttonVariants({ size: 'lg', className: 'shadow' })}
          >
            <TbPlus className="h-4 w-4" />
            Create New Lead
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border p-8 text-center">
            <h2 className="text-lg font-semibold">No Leads Found</h2>
            <p className="text-sm text-muted-foreground">
              There are no leads available at the moment. Please check back
              later or create a new lead.
            </p>
          </div>
        ) : (
          <DataTable data={leads} columns={leadColumns} />
        )}
      </div>
    </React.Fragment>
  );
}
