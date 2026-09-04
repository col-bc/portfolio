'use client';

import { handleDeleteLead, handleUpdateLead } from '@/lib/lead/leadActions';
import { Lead } from '@/prisma/generated/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
    TbBuildingSkyscraper,
    TbDeviceFloppy,
    TbDotsVertical,
    TbIdBadge2,
    TbList,
    TbMail,
    TbPhone,
    TbTrash,
    TbX,
} from 'react-icons/tb';
import { toast } from 'sonner';
import ConfirmDelete from './confirmDelete';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button, buttonVariants } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from './ui/input-group';
import { Label } from './ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

export default function LeadDisplay({ lead }: { lead: Lead }) {
  const router = useRouter();

  const [leadStatus, setLeadStatus] = useState(lead.status || '');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [leadCompany, setLeadCompany] = useState(lead.company || '');
  const [leadName, setLeadName] = useState(lead.name || '');
  const [leadEmail, setLeadEmail] = useState(lead.email || '');
  const [leadPhone, setLeadPhone] = useState(lead.phone || '');
  const [leadNotes, setLeadNotes] = useState(lead.notes || '');

  const deleteLead = async () => {
    await handleDeleteLead(lead.id);
    toast.success('Lead deleted successfully');
    router.push('/auth/manage/leads');
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

  return (
    <div className="flex w-full flex-col gap-8 md:gap-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col">
          <h1 className="mb-2 flex-1 text-3xl font-bold tracking-tight capitalize md:text-4xl">
            {lead.subject}: From {lead.name}
          </h1>
          <p className="text-muted-foreground">
            Received on {lead.createdAt.toLocaleDateString()} at{' '}
            {lead.createdAt.toLocaleTimeString()}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({ variant: 'secondary' })}
            >
              <TbDotsVertical />
              Actions
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {lead.phone && (
                <DropdownMenuItem className="truncate">
                  <Link
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-2"
                  >
                    <TbPhone />
                    Call Phone
                  </Link>
                </DropdownMenuItem>
              )}
              {lead.email && (
                <DropdownMenuItem className="truncate">
                  <Link
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-2"
                  >
                    <TbMail />
                    Send Email
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <TbTrash />
                Delete Lead
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-3">
          <Label className="mb-4">Message</Label>
          <p className="text-muted-foreground">{lead.message}</p>
        </div>
        <Card className="w-full max-w-lg shadow lg:col-span-2">
          <CardContent>
            <div className="mb-6 flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-xl">
                  {lead.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">{lead.name}</h3>
                <p className="text-muted-foreground">
                  <TbBuildingSkyscraper className="mr-2 inline" />
                  {lead.company || 'Unknown Org'}
                </p>
              </div>
              <Badge
                variant="default"
                className="ml-auto self-start tracking-tight uppercase"
              >
                {leadStatus}
              </Badge>
            </div>

            <div className="mb-6 flex flex-col gap-4">
              <InputGroup className="shadow-none">
                <InputGroupAddon>
                  <TbBuildingSkyscraper className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  value={lead.company || ''}
                  onChange={(e) => setLeadCompany(e.target.value)}
                  placeholder="Company Name"
                />
              </InputGroup>
              <InputGroup className="shadow-none">
                <InputGroupAddon>
                  <TbIdBadge2 className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Full Name"
                />
              </InputGroup>
              <InputGroup className="shadow-none">
                <InputGroupAddon>
                  <TbMail className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="Email Address"
                />
                <InputGroupText>
                  <Link
                    href={`mailto:${leadEmail}`}
                    className={buttonVariants({ variant: 'outline' })}
                  >
                    Email
                  </Link>
                </InputGroupText>
              </InputGroup>
              <InputGroup className="shadow-none">
                <InputGroupAddon>
                  <TbPhone className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="Phone Number"
                />
                <InputGroupText>
                  <Link
                    href={`tel:${leadPhone}`}
                    className={buttonVariants({ variant: 'outline' })}
                  >
                    Call
                  </Link>
                </InputGroupText>
              </InputGroup>

              <Select
                value={leadStatus}
                onValueChange={(val) => setLeadStatus(val as string)}
              >
                <SelectTrigger className="w-full shadow-none">
                  <TbList className="mr-2 h-4 w-4 text-muted-foreground" />
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
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex w-full flex-col gap-4 md:flex-row ">
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
      </div>

      <ConfirmDelete
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={deleteLead}
        title="Delete Lead?"
        description="You cannot recover deleted leads. Are you sure you want to continue?"
      />
    </div>
  );
}
