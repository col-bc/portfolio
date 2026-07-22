import { Toaster } from '@/components/ui/sonner';
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
      <Toaster
        position="top-right"
        visibleToasts={3}
        gap={8}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              'flex items-center gap-3 w-52 rounded-xl border border-border bg-card px-4 py-3.5 shadow-lg',
            title: 'text-base font-semibold text-foreground',
            description: 'text-sm text-muted-foreground',
            actionButton:
              'text-sm font-semibold px-3 py-1.5 rounded-md bg-primary text-primary hover:bg-primary/25 transition-colors',
            cancelButton:
              'text-sm font-medium text-muted-foreground hover:text-foreground transition-colors',
            closeButton:
              'text-muted-foreground hover:text-foreground transition-colors',
            success: ' border-green-500! [&_[data-icon]]:text-green-500!',
            info: 'border-blue-500! [&_[data-icon]]:text-blue-500',
            error: 'border-destructive! [&_[data-icon]]:text-destructive',
          },
        }}
      />
    </>
  );
}
