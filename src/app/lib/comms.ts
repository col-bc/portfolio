import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);

const notificationFromEmail = "Notify <notify@colbyc.com>";
const publicFromEmail = "Colby Cooper <contact@colbyc.com>";

/**
 * Send a contact confirmation email to the user who submitted the contact form.
 * @param toEmail - The email address of the user who submitted the contact form.
 * @param details - An object containing the name, subject, and message from the contact form submission.
 */
export async function sendContactConfirmation(
    toEmail: string,
    details: {
        name: string;
        subject: string;
        message: string;
    },
) {
    try {
        const result = await resend.emails.send({
            from: publicFromEmail,
            to: toEmail,
            subject: "Received: Your message to Colby Cooper",
            template: {
                id: "portfolio-confirmation-notification",
                variables: {
                    name: details.name,
                    subject: details.subject,
                    message: details.message,
                },
            },
        });
        console.log("Contact confirmation email sent:", result);
    } catch (error) {
        console.error("Error sending contact confirmation email:", error);
    }
}

/**
 * Send a notification email to the site owner when a user submits the contact form.
 * @param name - The name of the user who submitted the contact form.
 * @param message  - The message that the user submitted in the contact form.
 */
export async function sendContactNotification(name: string, message: string) {
    try {
        const result = await resend.emails.send({
            from: notificationFromEmail,
            to: "colby.b.cooper@gmail.com",
            subject: `New contact form submission from ${name}`,
            template: {
                id: "portfolio-contact-notification",
                variables: {
                    name,
                    message,
                },
            },
        });
        console.log("Contact notification email sent:", result);
    } catch (error) {
        console.error("Error sending contact notification email:", error);
    }
}
