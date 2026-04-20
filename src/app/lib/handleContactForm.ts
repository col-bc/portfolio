/**
 * @module handleContactForm
 * @description This module contains functions for handling the submission of the contact form, including CAPTCHA verification and saving the form data to the database.
 */
"use server";
import { ActionState } from "@/types";
import { headers } from "next/headers";
import "server-only";
import { sendContactConfirmation, sendContactNotification } from "./comms";
import { prisma } from "./prisma";

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

const ipTracker = new Map<string, { count: number; startTime: number }>();

/**
 * @interface ContactFormData
 * Represents the data submitted through the contact form.
 */
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    preferredContactMethod: "email" | "phone";
    organization: string | null;
    subject: string;
    message: string;
    turnstileToken: string;
}

/**
 * Handles the submission of the contact form by verifying the CAPTCHA and saving the form data to the database
 * @param data the contact form data
 * @returns a promise that resolves when the form data is successfully saved
 */
export async function handleContactForm(
    data: ContactFormData,
): Promise<ActionState<void>> {
    const { turnstileToken, ...leadData } = data;

    // Server-Side Validation
    if (!leadData.name || !leadData.message || !turnstileToken) {
        return {
            success: false,
            error: "Missing required fields. Please fill out the form completely.",
            type: "VALIDATION",
        };
    }

    const requestHeaders = await headers();

    const ipAddress =
        requestHeaders.get("cf-connecting-ip") ||
        requestHeaders.get("x-forwarded-for") ||
        requestHeaders.get("x-real-ip") ||
        "Unknown";

    const country = requestHeaders.get("cf-ipcountry") || "Unknown";
    const region = requestHeaders.get("cf-ipregion") || "Unknown";
    const city = requestHeaders.get("cf-ipcity") || "Unknown";
    const latitude = parseFloat(requestHeaders.get("cf-iplatitude") || "0");
    const longitude = parseFloat(requestHeaders.get("cf-iplongitude") || "0");

    // Rate limiting
    const currentTime = Date.now();
    const record = ipTracker.get(ipAddress) || {
        count: 0,
        startTime: currentTime,
    };
    if (currentTime - record.startTime > RATE_LIMIT_WINDOW_MS) {
        record.count = 1;
        record.startTime = currentTime;
    } else {
        record.count += 1;
    }

    ipTracker.set(ipAddress, record);

    if (record.count > MAX_REQUESTS_PER_WINDOW) {
        console.warn(
            `[RATE LIMIT EXCEEDED] Blocked IP: ${ipAddress} from ${country}`,
        );
        return {
            success: false,
            type: "RATE_LIMIT",
            error: "Too many submissions. Please wait a minute before trying again.",
        };
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
        return {
            success: false,
            error: "Server configuration error: Turnstile secret missing.",
            type: "UNKNOWN",
        };
    }

    // Verify the Turnstile token with Cloudflare's API
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", turnstileToken);

    const verifyResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            body: formData,
            cache: "no-store",
        },
    );

    const verifyJson = await verifyResponse.json();

    if (!verifyJson.success) {
        // Reject the submission
        console.error("Turnstile validation failed:", verifyJson);
        return {
            success: false,
            error: "CAPTCHA verification failed. Please try again.",
            type: "VALIDATION",
        };
    }

    try {
        // Save the lead data to the database using Prisma
        await prisma.lead.create({
            data: {
                ipAddress,
                country,
                region,
                city,
                latitude,
                longitude,
                ...leadData,
            },
        });

        await sendContactNotification(leadData.name, leadData.message);
        await sendContactConfirmation(leadData.email, {
            name: leadData.name,
            subject: leadData.subject,
            message: leadData.message,
        });

        return { success: true, data: undefined };
    } catch (error) {
        console.error("Error saving contact form data:", error);
        return {
            success: false,
            error: "Failed to save contact form data",
            type: "UNKNOWN",
        };
    }
}
