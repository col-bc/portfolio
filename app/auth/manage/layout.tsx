import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toast';
import { verifySession } from '@/lib/auth/session';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import Link from 'next/link';
import { unauthorized } from 'next/navigation';
import {
  TbBriefcase,
  TbFileCv,
  TbFlag,
  TbFolderCode,
  TbLogout,
  TbSettings,
} from 'react-icons/tb';

export default async function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user || !(await verifySession())) {
    unauthorized();
  }

  return (
    <>
      <div className="flex flex-col gap-4 p-4 md:flex-row md:gap-6">
        <nav className="flex shrink-0 flex-row gap-4 rounded-md border border-border bg-card p-2 md:flex-col">
          <Link
            href="/auth/manage/jobs"
            className="flex items-center justify-center rounded p-2 transition-all hover:bg-muted"
          >
            <TbBriefcase className="block size-6" />
          </Link>
          <Link
            href="/auth/manage/resume"
            className="flex items-center justify-center rounded p-2 transition-all hover:bg-muted"
          >
            <TbFileCv className="block size-6" />
          </Link>
          <Link
            href="/auth/manage/projects"
            className="flex items-center justify-center rounded p-2 transition-all hover:bg-muted"
          >
            <TbFolderCode className="block size-6" />
          </Link>
          <Link
            href="/auth/manage/leads"
            className="flex items-center justify-center rounded p-2 transition-all hover:bg-muted"
          >
            <TbFlag className="block size-6" />
          </Link>
          <Link
            href="/auth/manage/settings"
            className="flex items-center justify-center rounded p-2 transition-all hover:bg-muted"
          >
            <TbSettings className="block size-6" />
          </Link>
          <Button
            className="ml-auto flex items-center justify-center rounded p-2 transition-all hover:bg-muted md:mt-auto md:ml-0"
            variant="destructive"
            size="icon"
          >
            <TbLogout className="block size-6" />
          </Button>
        </nav>
        {children}
        <Toaster />
      </div>
    </>
  );
}
