'use client';
import { handleCreateLead } from '@/lib/lead/leadActions';
import { AlertFeedback } from '@/types';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { useRouter } from 'next/navigation';
import React from 'react';
import { TbDeviceFloppy } from 'react-icons/tb';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Field, FieldLabel, FieldRequiredIndicator } from '../ui/field';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { toast } from '../ui/toast';

const subjects = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'job', label: 'Job Opportunity' },
  { value: 'other', label: 'Other' },
];

export default function CreateLeadForm() {
  const router = useRouter();
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);

  const [alert, setAlert] = React.useState<AlertFeedback | null>(null);
  const [companyName, setCompanyName] = React.useState<string>('');
  const [contactName, setContactName] = React.useState<string>('');
  const [contactEmail, setContactEmail] = React.useState<string>('');
  const [contactPhone, setContactPhone] = React.useState<string>('');
  const [leadSource, setLeadSource] = React.useState<string>('');
  const [subject, setSubject] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);
    if (!contactName || !contactEmail || !message) {
      setAlert({
        type: 'ERROR',
        title: 'Missing Required Fields',
        message: 'Please fill in all required fields.',
      });
      return;
    }

    const tsToken = turnstileRef.current?.getResponse();
    const result = await handleCreateLead(
      {
        subject: leadSource,
        name: contactName,
        company: companyName,
        email: contactEmail,
        phone: contactPhone,
        source: leadSource,
        status: 'unread',
        message,
        notes: '',
      },
      tsToken!
    );
    if (result.success) {
      toast.add({
        title: 'Lead Created',
        description: 'The lead has been successfully created.',
      });
      router.push(`/auth/manage/leads/${result.data.id}`);
    } else {
      setAlert({
        type: 'ERROR',
        title: 'Error Creating Lead',
        message: result.error || 'An error occurred while creating the lead.',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col gap-6"
    >
      {alert && (
        <Alert>
          <AlertIcon type={alert.type} />
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
      <Field>
        <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
        <Input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="contactName">
          Contact Name <FieldRequiredIndicator />
        </FieldLabel>
        <Input
          id="contactName"
          type="text"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="Enter contact name"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="contactEmail">
          Contact Email
          <FieldRequiredIndicator />
        </FieldLabel>
        <Input
          id="contactEmail"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="Enter contact email"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="contactPhone">Contact Phone</FieldLabel>
        <Input
          id="contactPhone"
          type="tel"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          placeholder="Enter contact phone"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="leadSource">Lead Source</FieldLabel>
        <Input
          id="leadSource"
          type="text"
          value={leadSource}
          onChange={(e) => setLeadSource(e.target.value)}
          placeholder="Enter lead source"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="subject">
          Subject <span className="text-xs text-destructive">*</span>
        </FieldLabel>
        <Select
          items={subjects}
          value={subject}
          onValueChange={(value) => setSubject(value!)}
          required
        >
          <SelectTrigger id="subject">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="">Select a subject</SelectItem>
              {subjects.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor="message">
          Message
          <FieldRequiredIndicator />
        </FieldLabel>
        <Textarea
          id="message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          required
        />
      </Field>

      <Turnstile
        ref={turnstileRef}
        siteKey="0x4AAAAAACrt5VbunM62aYIZ"
        options={{
          theme: 'auto',
          size: 'flexible',
          feedbackEnabled: true,
          appearance: 'interaction-only',
        }}
      />

      <Button type="submit">
        <TbDeviceFloppy />
        Save Lead
      </Button>
    </form>
  );
}
