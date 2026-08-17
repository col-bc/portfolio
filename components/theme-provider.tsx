'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import * as React from 'react';
import { TbMoonStars, TbSun } from 'react-icons/tb';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

function ThemeToggleButton() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="size-6" />;
  }

  const ColorModeIcon =
    resolvedTheme === 'dark' ? <TbMoonStars size={24} /> : <TbSun size={24} />;
  const toggleTheme = () => {
    setTheme(resolvedTheme == 'dark' ? 'light' : 'dark');
  };

  return (
    <React.Suspense fallback={<Skeleton className="size-6" />}>
      <Button variant="ghost" size="icon" onClick={() => toggleTheme()}>
        {ColorModeIcon}
      </Button>
    </React.Suspense>
  );
}

export { ThemeProvider, ThemeToggleButton };
