/**
 * @module handleLeads
 * @description This module contains functions for handling CRUD operations on leads.
 * All functions require a valid admin session.
 */
"use server";
import { verifySession } from "@/app/lib/handleAuth";
import { ActionState } from "@/types";
import "server-only";
import { Lead } from "../../../prisma/generated/prisma/browser";
import { prisma } from "./prisma";

/**
 * Retrieves all leads from the database.
 * @returns {Promise<ActionState<Lead[]>>} a promise that resolves to an array of lead objects
 */
export async function getLeads(): Promise<ActionState<Lead[]>> {
    const isValidSession = await verifySession();
    if (!isValidSession) {
        return {
            success: false,
            error: "Unauthorized: Invalid or missing admin session.",
            type: "UNAUTHORIZED",
        };
    }

    const leads = await prisma.lead.findMany();
    return { success: true, data: leads };
}

/**
 * Retrieves a lead by its ID.
 * @param id the ID of the lead to retrieve
 * @returns {Promise<ActionState<Lead | null>>} a promise that resolves to the lead object if found, or null if not found
 */
export async function getLeadById(
    id: number,
): Promise<ActionState<Lead | null>> {
    const isValidSession = await verifySession();
    if (!isValidSession) {
        return {
            success: false,
            error: "Unauthorized: Invalid or missing admin session.",
            type: "UNAUTHORIZED",
        };
    }
    const lead = await prisma.lead.findUnique({
        where: { id },
    });
    return { success: true, data: lead };
}

/**
 * Updates a lead by its ID.
 * @param id the ID of the lead to update
 * @param data the data to update the lead with
 * @returns {Promise<ActionState<Lead>>} a promise that resolves to the updated lead object
 */
export async function updateLead(
    id: number,
    data: Partial<{
        name: string;
        email: string;
        phone: string;
        preferredContactMethod: string;
        organization: string;
        subject: string;
        message: string;
        viewed: boolean;
    }>,
): Promise<ActionState<Lead>> {
    const isValidSession = await verifySession();
    if (!isValidSession) {
        return {
            success: false,
            error: "Unauthorized: Invalid or missing admin session.",
            type: "UNAUTHORIZED",
        };
    }
    const updatedLead = await prisma.lead.update({
        where: { id },
        data,
    });
    return { success: true, data: updatedLead };
}

/**
 * Deletes a lead by its ID.
 * @param id the ID of the lead to delete
 * @returns {Promise<ActionState<void>>} a promise that resolves when the lead is deleted
 */
export async function deleteLead(id: number): Promise<ActionState<void>> {
    const isSessionValid = await verifySession();
    if (!isSessionValid) {
        return {
            success: false,
            error: "Unauthorized: Invalid or missing admin session.",
            type: "UNAUTHORIZED",
        };
    }
    await prisma.lead.delete({
        where: { id },
    });
    return { success: true, data: undefined };
}
