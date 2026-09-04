import { Toaster } from '@/components/ui/toast';
import { verifySession } from '@/lib/auth/session';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import { unauthorized } from 'next/navigation';

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
      {children}
      <Toaster />
    </>
  );
}
