'use client';

import InitUserForm from '@/lib/auth/initUserForm';
import { permanentRedirect } from 'next/navigation';
import { TbTools } from 'react-icons/tb';

export default function InitPage() {
  const page = (
    <section className="flex min-h-[75vh] flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <TbTools className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Initialize User
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a superuser for the application.
          </p>
        </div>

        <div className="w-full">
          <InitUserForm />
        </div>

        <p className="max-w-sm text-center text-[10px] tracking-wider text-muted-foreground/60 uppercase">
          Access is restricted to authorized personnel only. Unauthorized access
          is strictly prohibited and will be prosecuted to the fullest extent of
          the law.
        </p>
      </div>
    </section>
  );

  return permanentRedirect('/auth/manage', 'replace');
}
