"use client";

import { Radio, RadioGroup } from "@/components/ui/radio";
import {
    Button,
    Card,
    createListCollection,
    Field,
    Flex,
    Heading,
    Input,
    Portal,
    Select,
    Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

import { LuSendHorizontal } from "react-icons/lu";

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

    return (
        <Flex direction="column" gap={8} id="contact">
            <Card.Root variant="outline" borderColor="border.muted">
                <Card.Body>
                    <Flex
                        as="form"
                        direction="column"
                        gap={6}
                        maxW="md"
                        w="100%"
                        mx="auto">
                        <Heading size="xl" textStyle="heading">
                            Send a Message
                        </Heading>
                        <Field.Root required colorPalette="teal">
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

                        <Field.Root
                            required={contactMethod === "email"}
                            colorPalette="teal">
                            <Field.Label>
                                Email
                                <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                type="email"
                                value={email}
                                placeholder="john.doe@acmeinc.com"
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
                                value={phone}
                                placeholder="(123) 456-7890"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Field.Root>

                        <Field.Root colorPalette="teal">
                            <Field.Label>Organization Name</Field.Label>
                            <Input
                                type="text"
                                placeholder="Acme Inc."
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
                                onValueChange={(e) =>
                                    setContactMethod(e.value)
                                }>
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
                            <Select.Root collection={subjects}>
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

                        <Field.Root required colorPalette="teal">
                            <Field.Label>
                                Message
                                <Field.RequiredIndicator />
                            </Field.Label>
                            <Textarea
                                rows={6}
                                placeholder="Type your message here..."
                            />
                        </Field.Root>
                        <Button colorPalette="teal" type="submit">
                            <LuSendHorizontal />
                            Send Message
                        </Button>
                    </Flex>
                </Card.Body>
            </Card.Root>
        </Flex>
    );
}
