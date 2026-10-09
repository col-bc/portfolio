import { Fira_Code, IBM_Plex_Sans, Inter } from 'next/font/google';

import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { getCurrentUser } from '@/lib/auth/session';
import { cn } from '@/lib/utils';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';
import './globals.css';

const ibmPlexSansHeading = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
});

const sansFont = Inter({ subsets: ['latin'], variable: '--font-sans' });

const monoFont = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Colby Cooper | Software Engineer',
    template: '%s | Colby Cooper',
  },
  description:
    'Portfolio of Colby Cooper, a Software Engineering student and full-stack developer building applications with TypeScript, Next.js, React, and Python.',
  keywords: [
    'Colby Cooper',
    'Software Engineer',
    'Full Stack Developer',
    'Atlanta',
    'Next.js',
    'TypeScript',
    'React',
    'Python',
    'Web Development',
    'Software Architecture',
  ],
  authors: [
    {
      name: 'Colby Cooper',
      url: 'https://colbyc.com',
    },
  ],
  creator: 'Colby Cooper',
  metadataBase: new URL('https://colbyc.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://colbyc.com',
    title: 'Colby Cooper | Software Engineer',
    description:
      'Portfolio of Colby Cooper, a Software Engineering student and full-stack developer.',
    siteName: 'Colby Cooper Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Colby Cooper - Software Engineer Portfolio',
      },
    ],
  },
};

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
        monoFont.variable,
        sansFont.variable,
        ibmPlexSansHeading.variable,
        'antialiased',
        'font-mono',
        'font-sans',
        'font-heading'
      )}
    >
      <body>
        <GoogleAnalytics gaId="G-CBL0YRB69Y" />
        <ThemeProvider>
          <main className="flex min-h-screen max-w-screen flex-col overflow-x-clip bg-background font-sans text-foreground">
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
