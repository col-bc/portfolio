"use server";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as OTPAuth from "otpauth";
import "server-only";

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
    // verify turnstile token
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
        },
    );
    const verifyJson = await verifyResponse.json();
    // Reject the submission if Cloudflare says it's invalid
    if (!verifyJson.success) {
        console.error("Turnstile validation failed:", verifyJson);
        throw new Error("CAPTCHA verification failed.");
    }

    // authenticate
    if (await authenticateAdmin(data)) return { success: true };
}

/**
 * Verifies a TOTP (Time-based One-Time Password) for the admin user
 * @param otp the TOTP to verify
 * @returns a redirect to the leads page if the OTP is valid, otherwise throws an error
 */
export async function handleVerifyOtp(otp: string) {
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

    // Calculate the delta and allow a 1-period grace window
    const delta = totp.validate({ token: otp, window: 1 });

    if (delta !== null) {
        const jwt = await issueJWT({ username: "admin" });
        // Save the jwt in a cookie or local storage as needed
        (await cookies()).set("admin_session", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 2, // 2 hours
        });
        console.error("OTP validation failed:", otp);
        return redirect("/leads");
    } else {
        console.error("OTP validation failed:", otp);
        throw new Error("Invalid OTP");
    }
}

/**
 * Initializes the admin account by hashing the master password.
 * The hashed password should be stored in the environment variables.

 */
// async function initAdminAccount() {
//     // Initialize the admin account
//     const saltRounds = 12;
//     const myPassword = "your-master-password";

//     const hash = await bcrypt.hash(myPassword, saltRounds);
//     console.log("Hashed Master Password. Store this in .env:", hash);

//     const myAdminEmail = "admin@colbyc.com";
//     const hashedAdminEmail = await bcrypt.hash(myAdminEmail, saltRounds);
//     console.log("Hashed Admin Email. Store this in .env:", hashedAdminEmail);
// }

/**
 * Authenticates the admin user with the provided credentials
 * @param data the authentication attempt containing username, password, and turnstile token
 * @returns true if authentication is successful, otherwise throws an error
 */
async function authenticateAdmin(data: AuthAttempt) {
    if (data.username !== process.env.ADMIN_EMAIL) {
        throw new Error("Invalid credentials");
    }
    // await initAdminAccount();
    const isPasswordValid = await bcrypt.compare(
        data.password,
        process.env.HASHED_ADMIN_PASSWORD as string,
    );
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    return true;
}

/**
 * Issues a JWT token with the given payload
 * @param payload the payload to include in the JWT
 * @returns the signed JWT token
 */
export async function issueJWT(payload: Record<string, unknown>) {
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
        .setExpirationTime("2h") // Session expires in 2 hours
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

/** Checks if the session cookie exists and contains a valid, unexpired JWT */
export async function getSessionStatus() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");
    if (!sessionCookie || !sessionCookie.value) {
        return false;
    }
    const payload = await verifyJWT(sessionCookie.value);
    return payload !== null;
}

/** Destroys the session cookie and forces a redirect to the home page */
export async function logoutAdmin() {
    (await cookies()).delete("admin_session");
    redirect("/");
}
