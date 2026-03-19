"use client";

import { getLeadById, updateLead } from "@/app/lib/handleLeads";
import { CheckboxCheckedChangeDetails, Field } from "@ark-ui/react";
import {
    Avatar,
    Card,
    Checkbox,
    DataList,
    Flex,
    Heading,
    Spinner,
    Tag,
    Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LeadModel } from "../../prisma/generated/prisma/models/Lead";
import { toaster } from "./ui/toaster";

export function LeadDetailForm({ slug }: { slug: string }) {
    const [detail, setDetail] = useState<LeadModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * Fetches the lead details from the server and updates the state.
     */
    useEffect(() => {
        async function fetchLeadDetail() {
            try {
                setDetail(await getLeadById(parseInt(slug)));
            } finally {
                setLoading(false);
            }
        }
        fetchLeadDetail();
    }, [slug]);

    /**
     * Handles the change event for the "viewed" checkbox.
     * Updates the lead's viewed status both locally and on the server.
     * @param e the checkbox change event details
     */
    async function handleCheckboxChange(e: CheckboxCheckedChangeDetails) {
        const checked = e.checked.valueOf();

        if (detail) {
            setDetail({ ...detail, viewed: !!checked });
            await updateLead(detail.id, { viewed: !!checked });
            toaster.create({
                title: "Lead Updated",
                description: `The lead has been marked as ${!!checked ? "viewed" : "not viewed"}.`,
                closable: true,
                type: "success",
            });
        }
    }

    if (loading) {
        return (
            <Flex justify="center" align="center" height="100%">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <Card.Root w="100%">
            <Card.Body gap={4}>
                <Flex align="center">
                    <Avatar.Root>
                        <Avatar.Fallback name={detail?.name || "?"} />
                    </Avatar.Root>
                    <Heading size="lg" ml={4} flex={1}>
                        {detail?.name}
                    </Heading>
                    <Checkbox.Root
                        display={{
                            base: "none",
                            md: "inline-flex",
                        }}
                        checked={!!detail?.viewed}
                        onCheckedChange={handleCheckboxChange}>
                        <Checkbox.Label>Viewed</Checkbox.Label>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control>
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                    </Checkbox.Root>
                </Flex>
                <Checkbox.Root
                    display={{
                        base: "inline-flex",
                        md: "none",
                    }}
                    checked={!!detail?.viewed}
                    onCheckedChange={handleCheckboxChange}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control>
                        <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Label>Viewed</Checkbox.Label>
                </Checkbox.Root>
                <DataList.Root orientation="horizontal">
                    <DataList.Item>
                        <DataList.ItemLabel>Email</DataList.ItemLabel>
                        <DataList.ItemValue>
                            {detail?.email}
                            {detail?.preferredContactMethod === "email" && (
                                <Tag.Root>
                                    <Tag.Label>Preferred</Tag.Label>
                                </Tag.Root>
                            )}
                        </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>Phone</DataList.ItemLabel>
                        <DataList.ItemValue>
                            {detail?.phone}
                            {detail?.preferredContactMethod === "phone" && (
                                <Tag.Root>
                                    <Tag.Label>Preferred</Tag.Label>
                                </Tag.Root>
                            )}
                        </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>Organization</DataList.ItemLabel>
                        <DataList.ItemValue>
                            {detail?.organization || "N/A"}
                        </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>Received On</DataList.ItemLabel>
                        <DataList.ItemValue>
                            {detail?.createdAt.toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            })}
                        </DataList.ItemValue>
                    </DataList.Item>
                </DataList.Root>
                <Field.Root>
                    <Field.Label>Message</Field.Label>
                    <Textarea value={detail?.message || ""} mt={2} readOnly />
                </Field.Root>
            </Card.Body>
        </Card.Root>
    );
}
