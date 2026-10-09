'use client';

import { createApiKey } from '@/lib/api/apiActions.';
import { APIKey, User } from '@/prisma/generated/client';
import { AlertFeedback } from '@/types';
import Link from 'next/link';
import React from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '../ui/dialog';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '../ui/field';
import { Input } from '../ui/input';
import PasswordInput from '../ui/passwordInput';
import { Switch } from '../ui/switch';

function ApiKeyForm({
  apiKey,
  open,
  onOpenChange,
  user,
}: {
  apiKey: APIKey | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}) {
  const [alert, setAlert] = React.useState<AlertFeedback | null>(null);
  const [keyId, setKeyId] = React.useState(apiKey?.id || '');
  const [name, setName] = React.useState(apiKey?.name || '');
  const [generatedKey, setGeneratedKey] = React.useState<string | null>(null);
  const [keyHint, setKeyHint] = React.useState(apiKey?.keyHint || '');
  const [enabled, setEnabled] = React.useState<boolean>(
    apiKey?.enabled || true
  );

  React.useEffect(() => {
    const handleApiKeyChange = () => {
      if (apiKey) {
        setKeyId(apiKey.id);
        setName(apiKey.name);
        setKeyHint(apiKey.keyHint);
        setEnabled(apiKey.enabled);
      }
    };
    if (apiKey) handleApiKeyChange();
  }, [apiKey]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);
    setGeneratedKey(null);

    if (!name) {
      setAlert({
        type: 'ERROR',
        title: 'Cannot Submit',
        message: 'Name is required',
      });
      return;
    }
    const result = await createApiKey(user.id, { name });
    if (!result.success) {
      setAlert({
        type: 'ERROR',
        title: 'Error',
        message: result.error || 'Failed to create API key',
      });
      setGeneratedKey(null);
      return;
    } else {
      setGeneratedKey(result.data?.secret);
      setKeyId(result.data?.object?.id || '');
      setKeyHint(result.data?.object?.keyHint || '');
      setEnabled(result.data?.object?.enabled || true);
      setAlert({
        type: 'SUCCESS',
        title: 'API Key Created',
        message: 'The API key was successfully created.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              {apiKey ? `Edit API Key: ${apiKey.name}` : 'Create API Key'}
            </DialogTitle>
            <DialogDescription>
              {apiKey
                ? `Edit the details for API Key: ${apiKey.name}`
                : 'Fill in the details to create a new API Key.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {alert && (
              <Alert>
                <AlertIcon type={alert.type} />
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            )}
            <Field>
              <FieldLabel htmlFor="key-name">
                Key Name<span className="text-xs text-destructive">*</span>
              </FieldLabel>
              <Input
                id="key-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Acme Application"
                required
              />
            </Field>

            <FieldLabel htmlFor="key-enabled">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>
                    Enable Key{' '}
                    <span className="text-xs text-destructive">*</span>
                  </FieldTitle>
                  <FieldDescription>
                    The key is currently{' '}
                    <strong>{enabled ? 'enabled' : 'disabled'}</strong>. Toggle
                    the switch to change its status.
                  </FieldDescription>
                </FieldContent>
                <Switch
                  id="key-enabled"
                  checked={enabled}
                  onCheckedChange={(checked) => setEnabled(!!checked.valueOf())}
                />
              </Field>
            </FieldLabel>

            {keyId && (
              <Field>
                <FieldLabel htmlFor="key-value">Key Preview</FieldLabel>
                <PasswordInput
                  id="key-value"
                  value={
                    generatedKey
                      ? generatedKey
                      : keyHint + Array.from({ length: 32 }, () => '*').join('')
                  }
                  readOnly
                  placeholder="Your API key"
                />
                {!generatedKey && (
                  <FieldDescription>
                    Copy this key and store it securely. You won&apos;t be able
                    to view it again.
                  </FieldDescription>
                )}
              </Field>
            )}
            <DialogFooter>
              {generatedKey ? (
                <DialogClose>
                  <Button variant="secondary">Close</Button>
                </DialogClose>
              ) : (
                <Button type="submit">
                  {apiKey ? 'Update API Key' : 'Create API Key'}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

function ApiKeyList({ keys, user }: { keys: APIKey[]; user: User }) {
  const [selectedKey, setSelectedKey] = React.useState<APIKey | null>(null);
  return (
    <ul>
      {keys.map((apiKey) => (
        <li
          key={apiKey.id}
          className="flex flex-col gap-2 sm:flex-row sm:items-center"
        >
          <Link
            href="#"
            className="min-w-24 font-medium hover:text-primary hover:underline"
            onClick={() => setSelectedKey(apiKey)}
          >
            {apiKey.name}
          </Link>
          <code className="truncate font-mono text-ellipsis">
            {apiKey.keyHint + Array.from({ length: 32 }, () => '*').join('')}
          </code>
          <span className="text-right text-muted-foreground">
            {apiKey.enabled ? 'Enabled' : 'Disabled'}
          </span>
        </li>
      ))}
      <ApiKeyForm
        apiKey={selectedKey}
        user={user}
        open={!!selectedKey}
        onOpenChange={(open) => {
          if (!open) setSelectedKey(null);
        }}
      />
    </ul>
  );
}

export { ApiKeyForm, ApiKeyList };
