import { prisma } from '@/lib/prisma';
import { Lead } from '@/prisma/generated/client';
import 'server-only';

export async function createLead(data: Omit<Lead, 'id' | 'createdAt'>) {
  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || null,
      subject: data.subject,
      message: data.message,
    },
  });
  return lead;
}

export async function getLeads() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return leads;
}

export async function getLeadById(id: string) {
  const lead = await prisma.lead.findUnique({
    where: {
      id,
    },
  });
  return lead;
}

export async function updateLead(
  id: string,
  {
    status,
    notes,
    subject,
  }: { status?: string; notes?: string; subject?: string }
) {
  const lead = await prisma.lead.update({
    where: {
      id,
    },
    data: {
      status,
      notes,
      subject,
    },
  });
  return lead;
}

export async function deleteLead(id: string) {
  const lead = await prisma.lead.delete({
    where: {
      id,
    },
  });
  return lead;
}

export async function getLeadsByStatus(status: string) {
  const leads = await prisma.lead.findMany({
    where: {
      status,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return leads;
}
