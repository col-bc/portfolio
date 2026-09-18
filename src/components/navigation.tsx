'use client';

import { cn } from '@/lib/util/utils';
import { User } from '@/prisma/generated/client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBriefcase,
  TbFileCv,
  TbFlag,
  TbFolderCode,
  TbMenu,
  TbMessages,
  TbPlus,
  TbSettings,
  TbX,
} from 'react-icons/tb';
import LogoutButton from './logoutButton';
import { ThemeToggleButton } from './theme-provider';
import { Button, buttonVariants } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Separator } from './ui/separator';

function LinkList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const linkClasses = (path: string) => {
    const baseClasses =
      'text-base px-3 py-2 rounded transition-colors duration-200 hover:text-foreground w-full block';
    return pathname === path
      ? `${baseClasses} text-foreground font-medium bg-muted`
      : `${baseClasses} text-muted-foreground font-normal`;
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Me' },
    { href: '/resume', label: 'Resume' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={cn(linkClasses(link.href), 'md:w-auto md:py-1.5')}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

export default function Navigation({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <header className="bg-background">
        <div className="container mx-auto flex max-w-5xl gap-2.5 px-4 py-2.5">
          <div className="mr-auto flex max-w-80 flex-1 flex-col">
            <Link
              href="/"
              className="font-heading text-3xl font-semibold tracking-tighter text-foreground transition-colors duration-200 hover:text-primary"
            >
              Colby Cooper
            </Link>
            <span className="mb-2.5 text-sm text-muted-foreground">
              Technical Problem Solver & Software Developer
            </span>
          </div>
          <div className="hidden gap-2.5 md:flex">
            <Link
              href="https://github.com/col-bc"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'secondary', size: 'xs' })}
            >
              <TbBrandGithub />
              Github
            </Link>
            <Link
              href="https://www.linkedin.com/in/colbycooper/"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'secondary', size: 'xs' })}
            >
              <TbBrandLinkedin />
              LinkedIn
            </Link>
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-50 w-full border-y border-muted bg-muted">
        <nav className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-1.5">
          {/* Desktop Links */}
          <div className="hidden flex-1 gap-2 md:flex">
            <LinkList />
          </div>

          {/* Action Items */}
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            {!!user && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={buttonVariants({ variant: 'ghost', size: 'icon' })}
                >
                  <TbSettings />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <TbPlus className="h-4 w-4" />
                        Quick Create
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="w-42">
                          <Link href="/auth/manage/jobs/new" passHref>
                            <DropdownMenuItem>
                              <TbBriefcase className="h-4 w-4" />
                              Employment
                            </DropdownMenuItem>
                          </Link>
                          <Link href="/auth/manage/projects/new" passHref>
                            <DropdownMenuItem>
                              <TbFolderCode className="h-4 w-4" />
                              Project
                            </DropdownMenuItem>
                          </Link>
                          <Link href="/auth/manage/leads/new" passHref>
                            <DropdownMenuItem>
                              <TbFlag className="h-4 w-4" />
                              Lead
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Manage Site</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Link
                        href="/auth/manage/jobs"
                        className="flex w-full items-center gap-2"
                      >
                        <TbBriefcase className="h-4 w-4" />
                        Employment
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/auth/manage/resume"
                        className="flex w-full items-center gap-2"
                      >
                        <TbFileCv className="h-4 w-4" />
                        Resume
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/auth/manage/projects"
                        className="flex w-full items-center gap-2"
                      >
                        <TbFolderCode className="h-4 w-4" />
                        Projects
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/auth/manage/leads"
                        className="flex w-full items-center gap-2"
                      >
                        <TbFlag className="h-4 w-4" />
                        Leads
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/auth/manage/settings"
                        className="flex w-full items-center gap-2"
                      >
                        <TbSettings className="h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <Separator className="my-1" />
                  <LogoutButton
                    className="w-full"
                    buttonClassName={buttonVariants({
                      variant: 'destructive',
                      size: 'sm',
                      className: 'justify-start w-full',
                    })}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <ThemeToggleButton />
            <Link
              href="/contact"
              className={buttonVariants({
                variant: 'outline',
              })}
            >
              <TbMessages />
              Get in Touch
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle Navigation"
            >
              {isOpen ? <TbX size={20} /> : <TbMenu size={20} />}
            </Button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-nav"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full px-4 pt-2 pb-4 md:hidden"
            >
              <div className="flex w-full flex-col gap-1 rounded-lg border border-border bg-background p-4 shadow">
                <LinkList onNavigate={() => setIsOpen(false)} />
                {!!user && (
                  <>
                    <Separator className="my-2" />
                    <LogoutButton />
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
