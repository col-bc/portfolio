import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getLeads } from '@/lib/lead/leadDAL';
import { Metadata } from 'next';
import Link from 'next/link';
import { TbHome } from 'react-icons/tb';

export const metadata: Metadata = {
  title: 'Manage Leads',
};

export default async function LeadsPage() {
  const leads = await getLeads();
  return (
    <>
      <Breadcrumb className="w-full border-b bg-transparent px-4 py-2 text-muted-foreground">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/auth/manage"
              className="flex items-center gap-2"
            >
              <TbHome />
              Manage
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Leads</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex flex-col items-start gap-10 px-4 py-8 md:gap-16 lg:gap-20">
        <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Manage Leads
          </h1>
        </div>
        <div className="flex w-full flex-col gap-4">
          {leads.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border p-8 text-center">
              <h2 className="text-lg font-semibold">No Leads Found</h2>
              <p className="text-sm text-muted-foreground">
                There are no leads available at the moment. Please check back
                later or create a new lead.
              </p>
            </div>
          )}
          {leads.map((lead) => (
            <Link
              key={lead.id}
              href={`/auth/manage/leads/${lead.id}`}
              className="flex flex-col gap-2 rounded-lg border p-4 transition-all hover:-translate-y-1 hover:bg-muted/25 hover:shadow-sm"
            >
              <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
                <Avatar className="mr-4 h-12 w-12 border-2 border-muted">
                  <AvatarFallback className="rounded-full bg-muted text-muted-foreground">
                    {lead.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col">
                  <h4 className="text-lg font-semibold">
                    {lead.name} - {lead.subject}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {lead.email} {lead.phone && `- ${lead.phone}`}
                  </p>
                </div>
                <div className="flex flex-col gap-1 md:items-end">
                  <Badge variant="outline">{lead.status}</Badge>
                  <p className="text-sm text-muted-foreground">
                    {lead.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
