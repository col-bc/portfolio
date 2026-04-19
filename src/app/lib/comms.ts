import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);

const fromEmail = "Notify <notify@colbyc.com";

/**
 * Send a contact confirmation email to the user who submitted the contact form.
 * @param toEmail - The email address of the user who submitted the contact form.
 * @param name - The name of the user who submitted the contact form.
 * @param message - The message that the user submitted in the contact form.
 *
 */
export async function sendContactConfirmation(
    toEmail: string,
    details: {
        name: string;
        subject: string;
        message: string;
    },
) {
    await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        template: {
            id: "portfolio-confirmation-notification",
            variables: {
                name: details.name,
                subject: details.subject,
                message: details.message,
            },
        },
    });
}

/**
 * Send a notification email to the site owner when a user submits the contact form.
 * @param name - The name of the user who submitted the contact form.
 * @param message  - The message that the user submitted in the contact form.
 */
export async function sendContactNotification(name: string, message: string) {
    await resend.emails.send({
        from: fromEmail,
        to: "colby.b.cooper@gmail.com",
        template: {
            id: "portfolio-contact-notification",
            variables: {
                name,
                message,
            },
        },
    });
}
