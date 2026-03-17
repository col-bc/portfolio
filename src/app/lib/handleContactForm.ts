"use server";

import { prisma } from "./prisma";
export interface ContactFormData {
    name: string;
    email: string | null;
    phone: number | null;
    preferredContactMethod: "email" | "phone";
    organization: string | null;
    subject: string;
    message: string;
    turnstileToken: string;
}

export async function handleContactForm(data: ContactFormData) {
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
