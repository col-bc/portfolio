'use server';

import { Lead } from '@/prisma/generated/browser';
import { ActionState } from '@/types';
import { getCurrentUser } from '../auth/session';
import { prisma } from '../prisma';
import { verifyTurnstileToken } from '../util/auth.util';

export async function createLead(
  data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>,
  tsToken: string
): Promise<ActionState<Lead>> {
  const status = await verifyTurnstileToken(tsToken);
  if (!status) {
    return {
      success: false,
      error: 'Turnstile verification failed',
      type: 'VALIDATION',
    };
  }
  try {
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
    return { success: true, data: lead };
  } catch (error) {
    console.warn('Error creating lead:', error);
    return {
      success: false,
      error: 'Failed to create lead',
      type: 'SERVER_ERROR',
    };
  }
}

export async function deleteLead(leadId: string): Promise<ActionState<null>> {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }
  try {
    const lead = await prisma.lead.delete({
      where: {
        id: leadId,
      },
    });
    if (!lead) {
      return { success: false, error: 'Lead not found', type: 'NOT_FOUND' };
    }
    return { success: true, data: null };
  } catch (error) {
    console.warn('Error deleting lead:', error);
    return {
      success: false,
      error: 'Failed to delete lead',
      type: 'SERVER_ERROR',
    };
  }
}

export async function updateLead(
  leadId: string,
  data: { status?: string; notes?: string; subject?: string }
): Promise<ActionState<Lead>> {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }
  try {
    const lead = await prisma.lead.update({
      where: {
        id: leadId,
      },
      data: {
        status: data.status,
        notes: data.notes,
        subject: data.subject,
      },
    });

    return { success: true, data: lead };
  } catch (error) {
    console.warn('Error updating lead:', error);
    return {
      success: false,
      error: 'Failed to update lead',
      type: 'SERVER_ERROR',
    };
  }
}
