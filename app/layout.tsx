import { Fira_Code, IBM_Plex_Sans, Inter } from 'next/font/google';

import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import { cn } from '@/lib/util/utils';
import { Metadata } from 'next';
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

export const metadata: Metadata = {
  // Using a template allows sub-pages to automatically format like "Projects | Colby Cooper"
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
      url: 'https://your-domain.com', // Update with your actual URL
    },
  ],
  creator: 'Colby Cooper',
  metadataBase: new URL('https://your-domain.com'), // Crucial for resolving relative image paths
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Colby Cooper | Software Engineer',
    description:
      'Portfolio of Colby Cooper, a Software Engineering student and full-stack developer.',
    siteName: 'Colby Cooper Portfolio',
    images: [
      {
        url: '/og-image.png', // Add a 1200x630 image to your public folder
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
