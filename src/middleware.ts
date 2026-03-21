/**
 * @module middleware
 * @description Middleware to protect admin routes by verifying JWT tokens.
 */
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/leads")) {
        const session = request.cookies.get("admin_session")?.value;

        if (!session) {
            return NextResponse.redirect(new URL("/auth", request.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
            await jwtVerify(session, secret);
            return NextResponse.next();
        } catch {
            // Token is invalid or expired
            return NextResponse.redirect(new URL("/auth", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth/leads", "/auth/leads/:path*"],
};
