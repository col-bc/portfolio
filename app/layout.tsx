import { Fira_Code, IBM_Plex_Sans, Inter } from 'next/font/google';

import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import { cn } from '@/lib/util/utils';
import './globals.css';

const redHatDisplay = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
});

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const monoFont = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'antialiased',
        monoFont.variable,
        'font-mono',
        'font-heading',
        'font-body',
        'font-sans',
        'font-sans',
        inter.variable,
        redHatDisplay.variable
      )}
    >
      <body>
        <ThemeProvider>
          <main className="flex min-h-screen max-w-screen flex-col overflow-x-clip bg-background text-foreground antialiased">
            <Navigation user={user} />

            <div className="container mx-auto flex max-w-5xl flex-1 flex-col">
              {children}
            </div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
