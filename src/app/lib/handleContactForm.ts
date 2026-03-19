/**
 * @module handleContactForm
 * @description This module contains functions for handling the submission of the contact form, including CAPTCHA verification and saving the form data to the database.
 */
"use server";
import "server-only";
import { prisma } from "./prisma";

/**
 * @interface ContactFormData
 * @description Represents the data submitted through the contact form.
 */ export interface ContactFormData {
    name: string;
    email: string | null;
    phone: number | null;
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
export async function handleContactForm(data: ContactFormData): Promise<void> {
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

    try {
        await prisma.lead.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                preferredContactMethod: data.preferredContactMethod,
                organization: data.organization,
                subject: data.subject,
                message: data.message,
            },
        });
    } catch (error) {
        console.error("Error saving contact form data:", error);
        throw new Error("Failed to save contact form data");
    }
}
