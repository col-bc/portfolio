import NextLink from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-muted/40">
      <div className="container mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground">
        <div className="grid grid-cols-1 items-center gap-2 sm:gap-4 md:grid-cols-3">
          <div className="md:col-span-2 md:text-left">
            &copy; {new Date().getFullYear()} Colby Cooper. All rights reserved.
          </div>
          <div className="align-center flex sm:justify-end">
            <NextLink
              href="/privacy-policy"
              className="border-r border-border pr-2 text-muted-foreground hover:text-foreground hover:underline"
            >
              Privacy Policy
            </NextLink>
            <NextLink
              href="/terms-of-service"
              className="pl-2 text-muted-foreground hover:text-foreground hover:underline"
            >
              Terms of Service
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
