/**
 * @module handleContactForm
 * @description This module contains functions for handling the submission of the contact form, including CAPTCHA verification and saving the form data to the database.
 */
"use server";
import { ActionState } from "@/types";
import "server-only";
import { prisma } from "./prisma";

/**
 * @interface ContactFormData
 * @description Represents the data submitted through the contact form.
 */
export interface ContactFormData {
    name: string;
    email: string | null;
    phone: string | null;
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

    // Reject the submission if Cloudflare says it's invalid
    if (!verifyJson.success) {
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
            data: leadData,
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
