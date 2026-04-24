/**
 * @module middleware
 * @description Middleware to protect admin routes by verifying JWT tokens.
 */
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Verifies the session token from the cookie and returns true if valid, false otherwise.
 * @param token - the JWT token to verify
 * @returns {Promise<boolean>} - true if the token is valid, false otherwise
 */
async function verifySessionToken(token: string) {
    try {
        const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
        await jwtVerify(token, secret);
        return true;
    } catch (e) {
        console.error("JWT verification failed:", e);
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const session = request.cookies.get("admin_session")?.value;

    if (request.nextUrl.pathname === "/auth") {
        // Bypass authentication for the login page if the user is already authenticated
        if (session && (await verifySessionToken(session))) {
            return NextResponse.redirect(new URL("/auth/manage", request.url));
        }
        return NextResponse.next();
    }
    // Protect all routes under /auth/manage
    else if (request.nextUrl.pathname.startsWith("/auth/manage")) {

        // Redirect to login if no session cookie is found
        if (!session) {
            return NextResponse.redirect(new URL("/auth", request.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
            await jwtVerify(session, secret);
            return NextResponse.next();
        } catch (e) {
            console.error("JWT verification failed:", e);
            // Token is invalid or expired
            return NextResponse.redirect(new URL("/auth", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth", "/auth/manage", "/auth/manage/:path*"],
};
