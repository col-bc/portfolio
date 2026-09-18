'use server';

import { Lead } from '@/prisma/generated/browser';
import { ActionState } from '@/types';
import { verifyTurnstileToken } from '../auth/session';
import { getCurrentUser } from '../auth/sessionActions';
import { createLead, deleteLead, getLeads, updateLead } from './leadDAL';

export async function handleCreateLead(
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
    const lead = await createLead({
      ...data,
      status: 'unread',
      source: 'contact-form',
    });
    return { success: true, data: lead };
  } catch (error) {
    console.warn('Error creating lead:', error);
    return { success: false, error: 'Failed to create lead', type: 'UNKNOWN' };
  }
}

export async function handleGetLeads(): Promise<ActionState<Lead[]>> {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }
  try {
    const leads = await getLeads();
    return { success: true, data: leads };
  } catch (error) {
    console.warn('Error fetching leads:', error);
    return { success: false, error: 'Failed to fetch leads', type: 'UNKNOWN' };
  }
}

export async function handleDeleteLead(
  leadId: string
): Promise<ActionState<null>> {
  const userStatus = await getCurrentUser();
  if (!userStatus) {
    return {
      success: false,
      error: 'User not authenticated.',
      type: 'UNAUTHORIZED',
    };
  }
  try {
    await deleteLead(leadId);
    return { success: true, data: null };
  } catch (error) {
    console.warn('Error deleting lead:', error);
    return { success: false, error: 'Failed to delete lead', type: 'UNKNOWN' };
  }
}

export async function handleUpdateLead(
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
    const updatedLead = await updateLead(leadId, data);
    return { success: true, data: updatedLead };
  } catch (error) {
    console.warn('Error updating lead:', error);
    return { success: false, error: 'Failed to update lead', type: 'UNKNOWN' };
  }
}
