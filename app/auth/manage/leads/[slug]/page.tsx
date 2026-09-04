import LeadDisplay from '@/components/leadDisplay';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getLeadById } from '@/lib/lead/leadDAL';
import { notFound } from 'next/navigation';
import { TbHome } from 'react-icons/tb';

export default async function ManageJobDetail({
  params,
}: {
  params: { slug: string };
}) {
  const resolvedParams = await params;
  const leadId = resolvedParams.slug;

  const lead = await getLeadById(leadId);

  if (!lead) {
    notFound();
  }

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
            <BreadcrumbLink href="/auth/manage/leads">Leads</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{lead.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex flex-col items-start gap-10 px-4 py-8 md:gap-16 lg:gap-20">
        <LeadDisplay lead={lead} />
      </section>
    </>
  );
}
