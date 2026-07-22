'use client';

import { handleDeleteLead, handleUpdateLead } from '@/lib/lead/leadActions';
import { Lead } from '@/prisma/generated/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { TbDeviceFloppy, TbMail, TbPhone, TbTrash, TbX } from 'react-icons/tb';
import { toast } from 'sonner';
import ConfirmDelete from './confirmDelete';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button, buttonVariants } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Field, FieldLabel } from './ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';

export default function LeadDisplay({ lead }: { lead: Lead }) {
  const router = useRouter();

  const [leadStatus, setLeadStatus] = useState(lead.status);
  const [leadNotes, setLeadNotes] = useState(lead.notes || '');

  const deleteLead = async () => {
    await handleDeleteLead(lead.id);
    toast.success('Lead deleted successfully');
  };

  const saveLead = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await handleUpdateLead(lead.id, {
      status: leadStatus,
      notes: leadNotes,
    });
    if (result.success) {
      toast.success('Lead updated successfully');
      router.refresh();
    } else {
      toast.error('Failed to update lead');
    }
  };

  const handleStatusSave = async (newStatus: string) => {
    setLeadStatus(newStatus);

    const result = await handleUpdateLead(lead.id, {
      status: newStatus,
      notes: leadNotes,
    });

    if (result.success) {
      toast.success('Status updated successfully');
      router.refresh();
    } else {
      toast.error('Failed to update status');
      setLeadStatus(lead.status);
    }
  };

  return (
    <div className="flex w-full flex-col gap-8 md:gap-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <h1 className="flex-1 text-3xl font-bold tracking-tight capitalize md:text-4xl">
          {lead.subject} - {lead.createdAt.toLocaleDateString()} at{' '}
          {lead.createdAt.toLocaleTimeString()}
        </h1>
        <Badge className="p-3! text-lg! text-primary capitalize">
          {leadStatus}
        </Badge>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>
                {lead.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-xl font-semibold">{lead.name}</p>
              <Badge variant="secondary">
                {lead.subject.charAt(0).toUpperCase() + lead.subject.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({ variant: 'outline' })}
            >
              Actions
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {lead.phone && (
                <DropdownMenuItem>
                  <TbPhone />
                  Call {lead.phone}
                </DropdownMenuItem>
              )}
              {lead.email && (
                <DropdownMenuItem className="truncate">
                  <TbMail />
                  Email {lead.email}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <ProgressDialog value={leadStatus} onSave={handleStatusSave}>
            Update Status
          </ProgressDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field>
          <FieldLabel>Message</FieldLabel>
          <Textarea value={lead.message} readOnly disabled className="h-48" />
        </Field>
        <Field>
          <FieldLabel>Notes</FieldLabel>
          <Textarea
            value={leadNotes}
            onChange={(e) => setLeadNotes(e.target.value)}
            className="h-48"
            placeholder="Add notes about this lead..."
          />
        </Field>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Button variant="default" onClick={saveLead}>
          <TbDeviceFloppy className="h-4 w-4" />
          Save Changes
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="px-4 md:mr-auto"
        >
          <TbX className="h-4 w-4" />
          Cancel
        </Button>
        <ConfirmDelete
          onConfirm={deleteLead}
          title="Delete this Lead?"
          description="You cannot recover deleted leads. Are you sure you want to continue?"
        >
          <TbTrash className="h-4 w-4" />
          Delete Lead
        </ConfirmDelete>
      </div>
    </div>
  );
}

function ProgressDialog({
  value,
  onSave,
  children,
}: {
  value: string;
  onSave: (value: string) => void;
  children: React.ReactNode;
}) {
  const [localStatus, setLocalStatus] = React.useState(value);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setLocalStatus(value);
      }}
    >
      <AlertDialogTrigger
        className={buttonVariants({ variant: 'outline' })}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Lead Status</AlertDialogTitle>
          <AlertDialogDescription>
            What is the new status of this lead? This will update the
            lead&apos;s status. You can change this anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Field className="w-52">
          <Select
            value={localStatus}
            onValueChange={(val) => setLocalStatus(val as string)}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Unread">Unread</SelectItem>
              <SelectItem value="Read">Read</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Follow Up">Follow Up</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();

              onSave(localStatus);
              setIsOpen(false);
            }}
          >
            Save Status
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
