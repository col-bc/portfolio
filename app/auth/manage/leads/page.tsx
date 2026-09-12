import { leadColumns } from '@/components/leadTable/dt-lead-columns';
import { DataTable } from '@/components/loginTable/table';
import { Heading } from '@/components/ui/heading';
import { getLeads } from '@/lib/lead/leadDAL';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Manage Leads',
};

export default async function LeadsPage() {
  const leads = await getLeads();
  return (
    <React.Fragment>
      <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
        <Heading>Manage Leads</Heading>
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
