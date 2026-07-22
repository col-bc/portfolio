import { Fira_Code, Inter, Space_Grotesk } from 'next/font/google';

import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import { cn } from '@/lib/util/utils';
import './globals.css';

const headingFont = Inter({
  subsets: ['latin'],
  variable: '--font-heading',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
});

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
        'font-heading',
        headingFont.variable,
        'font-sans',
        spaceGrotesk.variable
      )}
    >
      <body>
        <ThemeProvider>
          <main className="flex min-h-screen max-w-screen flex-col bg-background text-foreground antialiased">
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
