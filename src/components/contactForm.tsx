"use client";

import { handleContactForm } from "@/app/lib/handleContactForm";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { Avatar } from "@ark-ui/react";
import {
    Alert,
    Box,
    Button,
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

export default function Contact() {
    const subjects = createListCollection({
        items: [
            { value: "general", label: "General Inquiry" },
            { value: "job", label: "Job Opportunity" },
            { value: "contract", label: "Contract / Freelance Work" },
            { value: "consulting", label: "Consulting Opportunity" },
            { value: "Collaboration", label: "Collaboration" },
            { value: "other", label: "Other" },
        ],
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [contactMethod, setContactMethod] = useState<string | null>("email");
    const [orgName, setOrgName] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [sent, setSent] = useState(true);

    function resetForm() {
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

    async function handleSubmit(e: React.ChangeEvent) {
        e.preventDefault();
        setError(null);
        if (!turnstileToken) {
            setError("Please complete the CAPTCHA challenge.");
            return;
        }
        try {
            await handleContactForm({
                name,
                email: email || null,
                phone: phone ? parseInt(phone) : null,
                preferredContactMethod: contactMethod as "email" | "phone",
                organization: orgName,
                subject: subject,
                message: message,
                turnstileToken: turnstileToken,
            });
            setSent(true);
            resetForm();
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setError(
                "There was an error submitting the form. Please try again later.",
            );
        }
    }

    return (
        <Flex direction="column" gap={8} id="contact">
            {sent ? (
                <Flex direction="column" gap={4} alignItems="center">
                    <Avatar.Root>
                        <TbCircleCheck size={64} color="green" />
                    </Avatar.Root>
                    <Heading size="xl" textStyle="heading">
                        Message Sent!
                    </Heading>
                    <Text fontSize="lg" color="fg.muted">
                        Thank you for reaching out. I&apos;ll get back to you as
                        soon as possible.
                    </Text>
                    <Button colorPalette="teal" onClick={() => setSent(false)}>
                        Send Another Message
                    </Button>
                </Flex>
            ) : (
                <Flex
                    as="form"
                    onSubmit={handleSubmit}
                    direction="column"
                    gap={6}
                    maxW="md"
                    w="100%"
                    mx="auto">
                    <Heading size="xl" textStyle="heading">
                        Send a Message
                    </Heading>
                    {error && (
                        <Alert.Root status="error">
                            <Alert.Indicator />
                            <Alert.Description>{error}</Alert.Description>
                        </Alert.Root>
                    )}
                    <Field.Root required colorPalette="teal">
                        <Field.Label>
                            Name
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            type="text"
                            placeholder="John Doe"
                            shadow="xs"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Field.Root>

                    <Field.Root
                        required={contactMethod === "email"}
                        colorPalette="teal">
                        <Field.Label>
                            Email
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            type="email"
                            placeholder="john.doe@acmeinc.com"
                            shadow="xs"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Field.Root>

                    <Field.Root
                        required={contactMethod === "phone"}
                        colorPalette="teal">
                        <Field.Label>
                            Phone
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            type="tel"
                            placeholder="(123) 456-7890"
                            shadow="xs"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Field.Root>

                    <Field.Root colorPalette="teal">
                        <Field.Label>Organization Name</Field.Label>
                        <Input
                            type="text"
                            placeholder="Acme Inc."
                            shadow="xs"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                        />
                    </Field.Root>

                    <Field.Root required colorPalette="teal">
                        <Field.Label>
                            Requested Contact Method
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <RadioGroup
                            defaultValue="Email"
                            onValueChange={(e) => setContactMethod(e.value)}>
                            <Flex gap={4}>
                                <Radio value="email">Email</Radio>
                                <Radio value="phone">Phone</Radio>
                            </Flex>
                        </RadioGroup>
                    </Field.Root>

                    <Field.Root required colorPalette="teal">
                        <Field.Label>
                            Subject
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Select.Root
                            collection={subjects}
                            onValueChange={(e) => setSubject(e.value[0])}>
                            <Select.HiddenSelect />
                            <Select.Control shadow="xs" rounded="sm">
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
                                            <Select.Item item={s} key={s.value}>
                                                {s.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                    </Field.Root>

                    <Field.Root required colorPalette="teal">
                        <Field.Label>
                            Message
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Textarea
                            rows={6}
                            placeholder="Type your message here..."
                            shadow="xs"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Field.Root>
                    <Box w="full">
                        <Turnstile
                            siteKey="0x4AAAAAACrt5VbunM62aYIZ"
                            onSuccess={(token) => {
                                setTurnstileToken(token);
                            }}
                            options={{
                                size: "flexible",
                            }}
                        />
                    </Box>
                    <Button
                        colorPalette="teal"
                        type="submit"
                        shadow="sm"
                        shadowColor="teal.emphasized"
                        disabled={!turnstileToken}>
                        Send Message
                        <TbSend2 />
                    </Button>
                </Flex>
            )}
        </Flex>
    );
}
