import { prisma } from '@/lib/prisma';
import { cache } from 'react';
import 'server-only';

export const getLeads = cache(async () => {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return leads;
});

export const getLeadById = cache(async (id: string) => {
  const lead = await prisma.lead.findUnique({
    where: {
      id,
    },
  });
  return lead;
});

export const getLeadsByStatus = cache(async (status: string) => {
  const leads = await prisma.lead.findMany({
    where: {
      status,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return leads;
});
