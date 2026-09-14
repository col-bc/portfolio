'use client';

import { APIKey } from '@/prisma/generated/client';
import React from 'react';
import { TbKey } from 'react-icons/tb';
import { ApiKeyForm } from './forms/apiKeyForm';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from './ui/empty';

export default function ApiKeyWrapper({ keys }: { keys: APIKey[] }) {
  const [showCreateKeyDialog, setShowCreateKeyDialog] = React.useState(false);
  const [currentKey, setCurrentKey] = React.useState<APIKey | null>(null);

  const handleCreateKey = () => {
    setCurrentKey(null);
    setShowCreateKeyDialog(true);
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Manage API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          {keys.length === 0 ? (
            <Empty>
              <EmptyMedia>
                <TbKey size={48} />
              </EmptyMedia>
              <EmptyTitle>No API Keys Found</EmptyTitle>
              <EmptyDescription>
                No API keys have been created yet.
              </EmptyDescription>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCreateKey()}
              >
                Create API Key
              </Button>
            </Empty>
          ) : (
            <ul>
              {keys.map((key) => (
                <li key={key.id}>{key.name}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <ApiKeyForm
        open={showCreateKeyDialog}
        onOpenChange={(open) => setShowCreateKeyDialog(open)}
        apiKey={null}
      />
    </>
  );
}
