/**
 * @module handleLeads
 * @description This module contains functions for handling CRUD operations on leads.
 * All functions require a valid admin session.
 */
"use server";
import { verifySession } from "@/app/lib/handleAuth";
import "server-only";
import { Lead } from "../../../prisma/generated/prisma/browser";
import { prisma } from "./prisma";

/**
 * Retrieves all leads from the database.
 * @returns a promise that resolves to an array of lead objects
 */
export async function getLeads(): Promise<Array<Lead>> {
    await verifySession();
    const leads = await prisma.lead.findMany();
    return leads;
}

/**
 * Retrieves a lead by its ID.
 * @param id the ID of the lead to retrieve
 * @returns a promise that resolves to the lead object if found, or null if not found
 */
export async function getLeadById(id: number): Promise<Lead | null> {
    await verifySession();
    const lead = await prisma.lead.findUnique({
        where: { id },
    });
    return lead;
}

/**
 * Updates a lead by its ID.
 * @param id the ID of the lead to update
 * @param data the data to update the lead with
 * @returns a promise that resolves to the updated lead object
 */
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
): Promise<Lead> {
    await verifySession();
    const updatedLead = await prisma.lead.update({
        where: { id },
        data,
    });
    return updatedLead;
}

/**
 * Deletes a lead by its ID.
 * @param id the ID of the lead to delete
 * @returns a promise that resolves when the lead is deleted
 */
export async function deleteLead(id: number): Promise<void> {
    await verifySession();
    await prisma.lead.delete({
        where: { id },
    });
}
