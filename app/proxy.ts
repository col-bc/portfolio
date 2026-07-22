import { verifySession } from '@/lib/session';
import { getCurrentUser } from '@/lib/sessionActions';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const RESTRICTED_PATHS = ['/auth/:path*'];

export async function proxy(request: NextRequest) {
  const user = await getCurrentUser();
  if (
    RESTRICTED_PATHS.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    ) &&
    (!user || !(await verifySession()))
  ) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: RESTRICTED_PATHS,
};
