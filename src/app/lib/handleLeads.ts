"use server";
import "server-only";

import { prisma } from "./prisma";

export async function getLeads() {
    const leads = await prisma.lead.findMany();
    return leads;
}

export async function getLeadById(id: number) {
    const lead = await prisma.lead.findUnique({
        where: { id },
    });
    return lead;
}

export async function updateLead(
    id: number,
    data: Partial<{
        name: string;
        email: string;
        phone: number;
        preferredContactMethod: string;
        organization: string;
        subject: string;
        message: string;
        viewed: boolean;
    }>,
) {
    const updatedLead = await prisma.lead.update({
        where: { id },
        data,
    });
    return updatedLead;
}
