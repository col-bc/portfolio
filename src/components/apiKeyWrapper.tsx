'use client';

import { APIKey, User } from '@/prisma/generated/client';
import React from 'react';
import { TbKey } from 'react-icons/tb';
import { ApiKeyForm, ApiKeyList } from './forms/apiKeyForm';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from './ui/empty';

export default function ApiKeyWrapper({
  keys,
  user,
}: {
  keys: APIKey[];
  user: User;
}) {
  const [showCreateKeyDialog, setShowCreateKeyDialog] = React.useState(false);
  const [currentKey, setCurrentKey] = React.useState<APIKey | null>(null);

  const handleCreateKey = () => {
    setCurrentKey(null);
    setShowCreateKeyDialog(true);
  };

  return (
    <>
      <Card className="w-full max-w-lg shadow">
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
            <ApiKeyList keys={keys} user={user} />
          )}
        </CardContent>
      </Card>

      <ApiKeyForm
        open={showCreateKeyDialog}
        user={user}
        onOpenChange={(open) => setShowCreateKeyDialog(open)}
        apiKey={null}
      />
    </>
  );
}
