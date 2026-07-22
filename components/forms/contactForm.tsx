'use client';

import { handleCreateLead } from '@/lib/lead/leadActions';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import React from 'react';
import {
  TbExclamationCircle,
  TbInfoCircle,
  TbMessageCheck,
  TbSend2,
} from 'react-icons/tb';
import { Alert } from '../ui/alert';
import { Button } from '../ui/button';
import { Field, FieldLabel } from '../ui/field';
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

function handleFormatPhoneNumber(value: string): string {
  // Remove all non-digit characters and limit to 10 digits
  const cleaned = value.replace(/\D/g, '').slice(0, 10);

  // Format the cleaned number as (123) 456-7890
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    const part1 = match[1] ? `(${match[1]}` : '';
    const part2 = match[2] ? `) ${match[2]}` : '';
    const part3 = match[3] ? `-${match[3]}` : '';
    return `${part1}${part2}${part3}`;
  }
  return cleaned;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const subjects = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'job', label: 'Job Opportunity' },
  { value: 'other', label: 'Other' },
];

export default function ContactForm() {
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);

  const [error, setError] = React.useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = React.useState<string | null>(
    null
  );
  const [message, setMessage] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [company, setCompany] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [tsToken, setTsToken] = React.useState<string | null>(null);

  const resetForm = () => {
    setSelectedSubject(null);
    setMessage('');
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    // validate data
    if (!name || !email || !selectedSubject || !message) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // send data to server
    const formData = {
      name,
      company,
      email,
      phone,
      subject: selectedSubject,
      message,
      source: 'contact_form',
      status: 'unread',
      notes: '',
    };
    const status = await handleCreateLead(formData, tsToken || '');
    if (status.success) {
      setIsSubmitted(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      {isSubmitted ? (
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <TbMessageCheck className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Thank you for reaching out!</h2>
          <p className="text-sm text-muted-foreground">
            I appreciate your message and will get back to you as soon as
            possible.
          </p>
          <Button variant="outline" onClick={resetForm}>
            Send Another Message
          </Button>
        </div>
      ) : (
        <>
          {error && (
            <Alert variant="destructive">
              <TbExclamationCircle className="mr-2 h-4 w-4" />
              <span>{error}</span>
            </Alert>
          )}

          <Field>
            <FieldLabel htmlFor="name">
              Full Name <span className="text-xs text-destructive">*</span>
            </FieldLabel>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="company">
              Company{' '}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </FieldLabel>
            <Input
              id="company"
              type="text"
              autoComplete="organization"
              placeholder="Acme Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">
              Email <span className="text-xs text-destructive">*</span>
            </FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="john.doe@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">
              Phone Number
              <span className="text-xs text-muted-foreground">(optional)</span>
            </FieldLabel>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(123) 456-7890"
              value={phone}
              onChange={(e) =>
                setPhone(handleFormatPhoneNumber(e.target.value))
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="subject">
              Subject <span className="text-xs text-destructive">*</span>
            </FieldLabel>
            <Select
              items={subjects}
              value={selectedSubject}
              onValueChange={(value) => setSelectedSubject(value)}
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
              Message <span className="text-xs text-destructive">*</span>
            </FieldLabel>
            <Textarea
              id="message"
              placeholder="Write your message here..."
              className="h-40 resize-y"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
            onSuccess={(token) => {
              setTsToken(token);
            }}
          />
          <p className="text-sm text-muted-foreground">
            <TbInfoCircle className="mr-1 inline-block h-4 w-4" />
            By submitting this form, you agree to the processing of your
            personal data in accordance with our{' '}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <Button type="submit" className="w-full" disabled={!tsToken}>
            <TbSend2 />
            Send Message
          </Button>
        </>
      )}
    </form>
  );
}
