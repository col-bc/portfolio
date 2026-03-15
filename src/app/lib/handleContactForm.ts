"use server";

export interface ContactFormData {
    name: string;
    email: string | null;
    phone: number | null;
    preferredContactMethod: "email" | "phone";
    organization: string | null;
    subject: string;
    message: string;
}

export async function handleContactForm(data: ContactFormData) {
    console.log(data);
}
