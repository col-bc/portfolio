import LeadDisplay from '@/components/leadDisplay';
import { getLeadById } from '@/lib/lead/leadDAL';
import { notFound } from 'next/navigation';

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

  return <LeadDisplay lead={lead} />;
}
