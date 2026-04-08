/**
 * @module handleAuth
 * @description This module contains functions for handling authentication and TOTP verification for the admin user.
 *
 * Sign in is a two-step process.
 * 1. AuthAttempt is submitted to the server with username, password, and Turnstile token.
 * 2. If the Turnstile token is valid and the credentials are correct, a TOTP session JWT is issued.
 * 3. The user submits a TOTP code, which is verified against the server while the TOTP session JWT is still valid.
 * 4. If the TOTP is valid, an authenticated admin session JWT is issued and the TOTP session JWT is invalidated.
 *
 */

"use server";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as OTPAuth from "otpauth";
import "server-only";

/**
 * @interface AuthAttempt
 * @description Represents an authentication attempt by the admin user, including username, password, and Turnstile token.
 */
export interface AuthAttempt {
    username: string;
    password: string;
    turnstileToken: string;
}

/**
 * Handles an authentication attempt by verifying the Turnstile token and authenticating the admin user
 * @param data the authentication attempt containing username, password, and turnstile token
 * @returns an object with a success property if authentication is successful, otherwise throws an error
 */
export async function handleAuthAttempt(data: AuthAttempt) {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
        throw new Error(
            "Server configuration error: Turnstile secret missing.",
        );
    }

    // Verify the Turnstile token with Cloudflare's API
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", data.turnstileToken);

    const verifyResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            body: formData,
            cache: "no-store",
        },
    );
    const verifyJson = await verifyResponse.json();

    // Reject the submission if Cloudflare says it's invalid
    if (!verifyJson.success) {
        console.error("Turnstile validation failed:", verifyJson);
        throw new Error("CAPTCHA verification failed.");
    }

    // authenticate and issue a JWT for the TOTP session
    if (await authenticateAdmin(data)) {
        const jwt = await issueJWT({ username: "admin" }, "3m");
        // Save the jwt in a cookie for the TOTP session
        (await cookies()).set("totp_session", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 3, // 3 minutes
        });

        return { success: true };
    }
    return { success: false };
}

/**
 * Handles the verification of a TOTP (Time-based One-Time Password) for the admin user
 * @param otp the TOTP to verify
 * @returns a redirect to the leads page if the OTP is valid, otherwise throws an error
 */
export async function handleVerifyOtp(otp: string) {
    //validate the totp session
    const totpSession = (await cookies()).get("totp_session");
    if (!totpSession) {
        throw new Error("TOTP session not found");
    }

    const payload = await verifyJWT(totpSession.value);
    if (!payload) {
        throw new Error("Invalid or expired TOTP session.");
    }

    const totp = new OTPAuth.TOTP({
        issuer: "Colby Portfolio",
        label: "Admin",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(
            process.env.ADMIN_TOTP_SECRET as string,
        ),
    });

    // Calculate the delta
    const delta = totp.validate({ token: otp, window: 1 });

    // Issue a jwt in a cookie for the authenticated admin session
    if (delta !== null) {
        (await cookies()).delete("totp_session");
        const jwt = await issueJWT({ username: "admin" }, "2h");
        (await cookies()).set("admin_session", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 2, // 2 hours
        });
        return redirect("/auth/leads");
    } else {
        console.error("OTP validation failed:", otp);
        throw new Error("Invalid OTP");
    }
}

/**
 * Authenticates the admin user with the provided credentials
 * @param data the authentication attempt containing username, password, and turnstile token
 * @returns true if authentication is successful, otherwise throws an error
 */
async function authenticateAdmin(data: AuthAttempt) {
    const isEmailValid = data.username === process.env.ADMIN_EMAIL;

    const isPasswordValid = await bcrypt.compare(
        data.password,
        process.env.HASHED_ADMIN_PASSWORD as string,
    );

    if (!isEmailValid || !isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    return true;
}

/**
 * Issues a JWT token with the given payload
 * @param payload the payload to include in the JWT
 * @param duration the duration for which the JWT is valid (e.g., "2h" for 2 hours)
 * @returns the signed JWT token
 */
export async function issueJWT(
    payload: Record<string, unknown>,
    duration: string,
) {
    const secret = process.env.SESSION_SECRET;
    if (!secret) {
        throw new Error("JWT secret is not defined");
    }
    const jwt = await new SignJWT({
        role: "admin",
        ...payload,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(duration)
        .sign(new TextEncoder().encode(secret));
    return jwt;
}

/**
 * Verifies a JWT token
 * @param token the JWT token to verify
 * @returns the payload if the token is valid, otherwise null
 */
export async function verifyJWT(token: string) {
    const secret = process.env.SESSION_SECRET;
    if (!secret) {
        throw new Error("JWT secret is not defined");
    }
    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(secret),
        );
        return payload;
    } catch (err) {
        console.error("JWT verification failed:", err);
        return null;
    }
}

/** Destroys the session cookie and forces a redirect to the home page */
export async function logoutAdmin() {
    (await cookies()).delete("admin_session");
    redirect("/");
}

/**
 * Verifies if the current session is valid by checking the admin_session cookie and its JWT.
 * @returns true if the session is valid, otherwise false
 */
export async function verifySession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");
    if (!sessionCookie || !sessionCookie.value) {
        return false;
    }
    const payload = await verifyJWT(sessionCookie.value);
    return payload !== null;
}
