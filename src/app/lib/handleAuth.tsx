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
import { ActionState } from "@/types";
import bcrypt from "bcrypt";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as OTPAuth from "otpauth";
import "server-only";

/**
 * @interface AuthAttempt
 * Represents an authentication attempt by the admin user, including username, password, and Turnstile token.
 */
export interface AuthAttempt {
    username: string;
    password: string;
    turnstileToken: string;
}

/**
 * Handles an authentication attempt by verifying the Turnstile token and authenticating the admin user
 * @param data the authentication attempt containing username, password, and turnstile token
 * @returns {ActionState<void>} an object indicating the success or failure of the authentication attempt
 */
export async function handleAuthAttempt(
    data: AuthAttempt,
): Promise<ActionState<void>> {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
        return {
            success: false,
            error: "Server configuration error: Turnstile secret missing.",
            type: "UNKNOWN",
        };
    }
    // Validate input
    if (
        [data.username, data.password, data.turnstileToken].some(
            (field) => !field,
        )
    ) {
        return {
            success: false,
            error: "Missing required fields. Please check your input and try again.",
            type: "VALIDATION",
        };
    }

    // Verify the Turnstile token with Cloudflare
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", data.turnstileToken);
    // Send the request
    const verifyResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            body: formData,
            cache: "no-store",
        },
    );
    const verifyJson = await verifyResponse.json();
    // Check Turnstile verification result
    if (!verifyJson.success) {
        console.error("Turnstile validation failed:", verifyJson);
        return {
            success: false,
            error: "CAPTCHA validation failed. Please try again.",
            type: "VALIDATION",
        };
    }

    // authenticate and
    const authResult = await authenticateAdmin(data);
    if (authResult.success) {
        // Issue a short JWT for the TOTP session
        const jwt = await issueJWT({ username: "admin" }, "3m");
        (await cookies()).set("totp_session", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 3, // 3 minutes
        });
        return { success: true, data: undefined };
    }
    return {
        success: false,
        error: "Authentication failed. Invalid username or password.",
        type: "UNAUTHORIZED",
    };
}

/**
 * Handles the verification of a TOTP (Time-based One-Time Password) for the admin user
 * @param otp the TOTP to verify
 * @returns a redirect to the leads page if the OTP is valid, otherwise throws an error
 */
export async function handleVerifyOtp(otp: string): Promise<ActionState<void>> {
    //validate the totp session
    const totpSession = (await cookies()).get("totp_session");
    if (!totpSession) {
        return {
            success: false,
            error: "TOTP session not found",
            type: "UNAUTHORIZED",
        };
    }

    // verify jwt by checking if the payload can be decoded
    const payload = await verifyJWT(totpSession.value);
    if (!payload) {
        return {
            success: false,
            error: "Invalid or expired TOTP session.",
            type: "UNAUTHORIZED",
        };
    }

    // verify the totp
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
        return redirect("/auth/manage");
    } else {
        console.error("OTP validation failed:", otp);
        return {
            success: false,
            error: "Invalid OTP",
            type: "UNAUTHORIZED",
        };
    }
}

/**
 * Authenticates the admin user with the provided credentials
 * @param data the authentication attempt containing username, password, and turnstile token
 * @returns true if authentication is successful, otherwise throws an error
 */
async function authenticateAdmin(
    data: AuthAttempt,
): Promise<ActionState<void>> {
    const isEmailValid = data.username === process.env.ADMIN_EMAIL;

    const isPasswordValid = await bcrypt.compare(
        data.password,
        process.env.HASHED_ADMIN_PASSWORD as string,
    );

    if (!isEmailValid || !isPasswordValid) {
        return {
            success: false,
            error: "Invalid username or password",
            type: "UNAUTHORIZED",
        };
    }

    return { success: true, data: undefined };
}

/**
 * Issues a JWT token with the given payload
 * @param payload the payload to include in the JWT
 * @param duration the duration for which the JWT is valid (e.g., "2h" for 2 hours)
 * @returns the signed JWT token
 */
async function issueJWT(
    payload: Record<string, unknown>,
    duration: string,
): Promise<string> {
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
export async function verifyJWT(
    token: string,
): Promise<ActionState<JWTPayload>> {
    const secret = process.env.SESSION_SECRET;
    if (!secret) {
        return {
            success: false,
            error: "JWT secret is not defined",
            type: "UNKNOWN",
        };
    }
    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(secret),
        );
        return { success: true, data: payload };
    } catch (err) {
        console.error("JWT verification failed:", err);
        return {
            success: false,
            error: "Invalid or expired token",
            type: "UNAUTHORIZED",
        };
    }
}

/** Destroys the session cookie and forces a redirect to the home page */
export async function logoutAdmin(): Promise<void> {
    (await cookies()).delete("admin_session");
    redirect("/");
}

/**
 * Verifies if the current session is valid by checking the admin_session cookie and its JWT.
 * @returns true if the session is valid, otherwise false
 */
export async function verifySession(): Promise<boolean> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");
    if (!sessionCookie || !sessionCookie.value) {
        return false;
    }
    const payload = await verifyJWT(sessionCookie.value);
    return payload !== null;
}
