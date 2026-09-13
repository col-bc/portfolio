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
      <div className="flex flex-col items-start gap-8 p-4 md:flex-row md:gap-12 lg:gap-16">
        <section className="flex w-full flex-col items-start gap-8 py-8 md:gap-12 lg:gap-16">
          {children}
        </section>
        <Toaster />
      </div>
    </>
  );
}
