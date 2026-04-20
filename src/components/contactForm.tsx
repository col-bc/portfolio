"use client";

import { handleContactForm } from "@/app/lib/handleContactForm";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { Avatar } from "@ark-ui/react";
import {
    Alert,
    Box,
    Button,
    Card,
    createListCollection,
    Field,
    Flex,
    Heading,
    Input,
    Portal,
    Select,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
import { TbCircleCheck, TbSend2 } from "react-icons/tb";

const subjects = createListCollection({
    items: [
        { value: "general", label: "General Inquiry" },
        { value: "job", label: "Job Opportunity" },
        { value: "contract", label: "Contract / Freelance Work" },
        { value: "consulting", label: "Consulting Opportunity" },
        { value: "collaboration", label: "Collaboration" },
        { value: "Bug Report", label: "Bug Report / Website Issue" },
        { value: "other", label: "Other" },
    ],
});

/**
 * Formats a phone number string by removing non-digit characters and applying a standard formatting pattern. The function takes a string input, extracts the numeric digits, and formats it in the style of (123) 456-7890 for 10-digit numbers, or (123) 456 for shorter numbers. If the input is empty or null, it returns the original value.
 * @param {string} value - The phone number string to be formatted.
 * @returns {string} The formatted phone number string.
 */
function formatPhoneNumber(value: string): string {
    if (!value) return value;
    const num = value.replace(/[^\d]/g, "");
    const numLen = num.length;
    if (numLen < 4) return num;
    if (numLen < 7) {
        return `(${num.slice(0, 3)}) ${num.slice(3)}`;
    }
    return `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6, 10)}`;
}

export default function ContactForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [contactMethod, setContactMethod] = useState<string | null>("email");
    const [orgName, setOrgName] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [sent, setSent] = useState<boolean>(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Resets the contact form fields and state to their initial values. This function clears all input fields, resets the preferred contact method to "email", clears any error messages, and resets the CAPTCHA token. It is called after a successful form submission to prepare the form for a new message.
     * @returns {void}
     */
    function resetForm(): void {
        setName("");
        setEmail("");
        setPhone("");
        setContactMethod("email");
        setOrgName("");
        setSubject("");
        setMessage("");
        setTurnstileToken(null);
        setError(null);
    }

    /**
     * Handles the form submission event by validating the input fields, checking the CAPTCHA token, and sending the form data to the server. If the CAPTCHA challenge is not completed, it sets an error message. If the form submission is successful, it displays a success message and resets the form. If there is an error during submission, it sets the appropriate error message and allows the user to try again.
     * @param {React.SyntheticEvent<HTMLFormElement>} e - The form submission event object.
     * @returns {Promise<void>} A promise that resolves when the form submission process is complete.
     */
    async function handleSubmit(
        e: React.SyntheticEvent<HTMLFormElement>,
    ): Promise<void> {
        e.preventDefault();
        setError(null);

        if (!turnstileToken) {
            setError("Please complete the CAPTCHA challenge.");
            return;
        }

        setIsSubmitting(true);

        const result = await handleContactForm({
            name,
            email: email,
            phone: phone,
            preferredContactMethod: contactMethod as "email" | "phone",
            organization: orgName,
            subject: subject,
            message: message,
            turnstileToken: turnstileToken,
        });
        if (!result.success) {
            setError(result.error);
            setIsSubmitting(false);
            return;
        }
        setSent(true);
        resetForm();
        setIsSubmitting(false);
    }

    return (
        <Flex direction="column" gap={8} id="contact" align="center">
            {sent ? (
                <Card.Root
                    as="section"
                    variant="subtle"
                    maxW="lg"
                    w="100%"
                    textAlign="center">
                    <Card.Body gap={6}>
                        <Flex
                            direction="column"
                            gap={4}
                            alignItems="center"
                            maxW="lg"
                            w="100%">
                            <Avatar.Root>
                                <TbCircleCheck size={64} color="green" />
                            </Avatar.Root>
                            <Heading size="xl" textStyle="heading">
                                Message Sent!
                            </Heading>
                            <Text
                                fontSize="lg"
                                color="fg.muted"
                                textAlign="center">
                                Thank you for reaching out. I&apos;ll get back
                                to you as soon as possible.
                            </Text>
                            <Button
                                colorPalette="cyan"
                                onClick={() => setSent(false)}>
                                Send Another Message
                            </Button>
                        </Flex>
                    </Card.Body>
                </Card.Root>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: "100%",
                        maxWidth: "var(--chakra-sizes-lg)",
                    }}>
                    <Flex direction="column" gap={6}>
                        <Heading size="xl" textStyle="heading">
                            Send a Message
                        </Heading>
                        {error && (
                            <Alert.Root status="error">
                                <Alert.Indicator />
                                <Alert.Description>{error}</Alert.Description>
                            </Alert.Root>
                        )}
                        <Field.Root required colorPalette="cyan">
                            <Field.Label>
                                Name
                                <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root required colorPalette="cyan">
                            <Field.Label>
                                Email
                                <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                type="email"
                                placeholder="john.doe@acmeinc.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root required colorPalette="cyan">
                            <Field.Label>
                                Phone
                                <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                type="tel"
                                placeholder="(123) 456-7890"
                                value={formatPhoneNumber(phone)}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root colorPalette="cyan">
                            <Field.Label>Organization Name</Field.Label>
                            <Input
                                type="text"
                                placeholder="Acme Inc."
                                value={orgName}
                                onChange={(e) => setOrgName(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root required colorPalette="cyan">
                            <Field.Label>
                                Requested Contact Method
                                <Field.RequiredIndicator />
                            </Field.Label>
                            <RadioGroup
                                defaultValue="Email"
                                onValueChange={(e) =>
                                    setContactMethod(e.value)
                                }>
                                <Flex gap={4}>
                                    <Radio value="email">Email</Radio>
                                    <Radio value="phone">Phone</Radio>
                                </Flex>
                            </RadioGroup>
                        </Field.Root>

                        <Field.Root required colorPalette="cyan">
                            <Field.Label>
                                Subject
                                <Field.RequiredIndicator />
                            </Field.Label>
                            <Select.Root
                                collection={subjects}
                                onValueChange={(e) => setSubject(e.value[0])}>
                                <Select.HiddenSelect />
                                <Select.Control>
                                    <Select.Trigger>
                                        <Select.ValueText placeholder="Choose a subject" />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                </Select.Control>
                                <Portal>
                                    <Select.Positioner>
                                        <Select.Content
                                            textStyle="body"
                                            fontSize="sm">
                                            {subjects.items.map((s) => (
                                                <Select.Item
                                                    item={s}
                                                    key={s.value}>
                                                    {s.label}
                                                    <Select.ItemIndicator />
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Portal>
                            </Select.Root>
                        </Field.Root>

                        <Field.Root required colorPalette="cyan">
                            <Field.Label>
                                Message
                                <Field.RequiredIndicator />
                            </Field.Label>
                            <Textarea
                                rows={6}
                                placeholder="Type your message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Field.Root>

                        <Box>
                            <Turnstile
                                siteKey="0x4AAAAAACrt5VbunM62aYIZ"
                                onSuccess={(token) => {
                                    setTurnstileToken(token);
                                }}
                                options={{
                                    size: "flexible",
                                    appearance: "always",
                                    feedbackEnabled: true,
                                }}
                            />
                        </Box>

                        <Button
                            colorPalette="cyan"
                            type="submit"
                            loading={isSubmitting}
                            disabled={!turnstileToken || isSubmitting}>
                            Send Message
                            <TbSend2 />
                        </Button>
                    </Flex>
                </form>
            )}
        </Flex>
    );
}
