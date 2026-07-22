'use client';

import { cn } from '@/lib/util/utils';
import { User } from '@/prisma/generated/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TbMenu, TbMessages, TbSettings } from 'react-icons/tb';
import LogoutButton from './logoutButton';
import { ThemeToggleButton } from './theme-provider';
import { buttonVariants } from './ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { Separator } from './ui/separator';

function LinkList() {
  const pathname = usePathname();

  const linkClasses = (path: string) => {
    const baseClasses =
      'text-sm px-2 py-1 rounded-full transition-colors duration-200 hover:text-foreground';
    return pathname === path
      ? `${baseClasses} text-foreground font-medium bg-muted`
      : `${baseClasses} text-muted-foreground font-base`;
  };

  return (
    <>
      <Link href="/about" className={linkClasses('/about')}>
        About Me
      </Link>
      <Link href="/projects" className={linkClasses('/projects')}>
        Projects
      </Link>
      <Link href="/contact" className={linkClasses('/contact')}>
        Contact
      </Link>
    </>
  );
}

export default function Navigation({ user }: { user: User | null }) {
  return (
    <Collapsible>
      <nav className="container mx-auto flex w-full max-w-5xl items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter whitespace-nowrap underline decoration-primary! decoration-dashed decoration-2"
          >
            Colby Cooper
          </Link>
          <div className="hidden w-full gap-4 md:flex">
            <LinkList />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          {!!user && (
            <Link
              href="/auth/manage"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'hidden md:flex'
              )}
            >
              <TbSettings />
            </Link>
          )}
          {user && <LogoutButton className="hidden md:flex" />}
          <CollapsibleTrigger
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'md:hidden',
            })}
          >
            <TbMenu size={20} />
          </CollapsibleTrigger>
          <Link
            href="/contact"
            className={buttonVariants({ variant: 'default', size: 'sm' })}
          >
            <TbMessages />
            Get in Touch
          </Link>
        </div>
      </nav>
      <CollapsibleContent>
        <div className="flex w-full flex-col items-start gap-2 bg-popover p-4 md:hidden">
          <LinkList />
          {!!user && (
            <>
              <Separator className="my-2" />
              <Link
                href="/auth/manage"
                className="font-base rounded-full px-2 py-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                Manage Site
              </Link>
              <LogoutButton className="w-full" />
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
