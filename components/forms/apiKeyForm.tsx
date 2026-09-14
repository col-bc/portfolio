'use client';

import { APIKey } from '@/prisma/generated/client';
import React from 'react';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '../ui/field';
import { Switch } from '../ui/switch';

function ApiKeyForm({ apiKey }: { apiKey: APIKey | null }) {
  const [keyId, setKeyId] = React.useState(apiKey?.id || '');
  const [name, setName] = React.useState(apiKey?.name || '');
  const [keyHint, setKeyHint] = React.useState(apiKey?.keyHint || '');
  const [enabled, setEnabled] = React.useState(apiKey?.enabled || false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field>
        <FieldLabel htmlFor="key-name">Key Name</FieldLabel>
        <input
          id="key-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Field>

      <FieldLabel htmlFor="key-enabled">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enable Key</FieldTitle>
            <FieldDescription>
              The key is currently{' '}
              <strong>{enabled ? 'enabled' : 'disabled'}</strong>. Toggle the
              switch to change its status.
            </FieldDescription>
          </FieldContent>
          <Switch
            id="key-enabled"
            checked={enabled}
            onCheckedChange={(checked) => setEnabled(checked)}
          />
        </Field>
      </FieldLabel>
    </form>
  );
}
