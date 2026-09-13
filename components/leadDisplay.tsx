'use client';

import { handleDeleteLead, handleUpdateLead } from '@/lib/lead/leadActions';
import { Lead } from '@/prisma/generated/client';
import { AlertFeedback } from '@/types';
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
import ConfirmDelete from './confirmDelete';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from './ui/alert';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button, buttonVariants } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Heading } from './ui/heading';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from './ui/toast';

export default function LeadDisplay({ lead }: { lead: Lead }) {
  const router = useRouter();

  const [alert, setAlert] = useState<AlertFeedback | null>(null);
  const [leadStatus, setLeadStatus] = useState(lead.status || '');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [leadCompany, setLeadCompany] = useState(lead.company || '');
  const [leadName, setLeadName] = useState(lead.name || '');
  const [leadEmail, setLeadEmail] = useState(lead.email || '');
  const [leadPhone, setLeadPhone] = useState(lead.phone || '');
  const [leadNotes, setLeadNotes] = useState(lead.notes || '');

  const deleteLead = async () => {
    await handleDeleteLead(lead.id);
    toast.add({
      title: 'Lead deleted successfully',
      description: 'The lead has been deleted successfully.',
      type: 'SUCCESS',
    });
    router.push('/auth/manage/leads');
  };

  const saveLead = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAlert(null);

    const result = await handleUpdateLead(lead.id, {
      status: leadStatus,
      notes: leadNotes,
    });
    if (result.success) {
      setAlert({
        title: 'Lead updated successfully',
        message: 'The lead has been updated successfully.',
        type: 'SUCCESS',
      });
    } else {
      setAlert({
        title: 'Failed to update lead',
        message: 'There was an error updating the lead.',
        type: 'ERROR',
      });
    }
  };

  React.useEffect(() => {
    if (alert) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  return (
    <div className="flex w-full flex-col gap-8 md:gap-12 lg:gap-16">
      <div className="flex flex-col">
        <Heading>{lead.name}</Heading>
        <p className="text-muted-foreground">
          Received on {lead.createdAt.toLocaleDateString()} at{' '}
          {lead.createdAt.toLocaleTimeString()}.
        </p>
      </div>

      {alert && (
        <Alert>
          <AlertIcon type={alert.type} />
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
          <AlertAction
            onClick={() => setAlert(null)}
            className={buttonVariants({ variant: 'ghost', size: 'icon-sm' })}
          >
            <TbX />
          </AlertAction>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-5">
        <div className="order-last flex flex-col gap-4 md:order-first md:gap-6 lg:col-span-3">
          <div className="flex min-h-32 flex-1 flex-col gap-2 rounded-md bg-muted p-4">
            <Label className="font-semibold text-muted-foreground uppercase">
              Message
            </Label>
            <p className="text-foreground">{lead.message}</p>
          </div>
          <div className="mt-auto flex justify-end">
            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              <TbTrash />
              Delete Lead
            </Button>
          </div>
        </div>
        <Card className="w-full max-w-lg shadow lg:col-span-2">
          <CardHeader>
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
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'icon',
                    className: 'ml-auto',
                  })}
                >
                  <TbDotsVertical />
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent align="end" className="w-52">
                    {lead.phone && (
                      <Link href={`tel:${lead.phone}`} passHref>
                        <DropdownMenuItem className="w-full">
                          <TbPhone className="shrink-0" />
                          <span className="truncate">{lead.phone}</span>
                        </DropdownMenuItem>
                      </Link>
                    )}
                    <Link href={`mailto:${lead.email}`} passHref>
                      <DropdownMenuItem className="w-full">
                        <TbMail className="shrink-0" />
                        <span className="truncate">{lead.email}</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4">
              <InputGroup className="shadow-none">
                <InputGroupAddon>
                  <TbBuildingSkyscraper className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  value={leadCompany}
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
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="follow-up">Follow Up</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="default" onClick={saveLead}>
              <TbDeviceFloppy className="h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
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
