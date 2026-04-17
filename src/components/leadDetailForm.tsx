"use client";

import { logoutAdmin } from "@/app/lib/handleAuth";
import { getLeadById, updateLead } from "@/app/lib/handleLeads";
import { Field } from "@ark-ui/react";
import {
    Avatar,
    Button,
    Card,
    DataList,
    DataListItem,
    Flex,
    Heading,
    Spinner,
    Tag,
    Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LeadModel } from "../../prisma/generated/prisma/models/Lead";
import DeleteLeadConfirmation from "./deleteLeadConfirmation";
import { toaster } from "./ui/toaster";

export function LeadDetailForm({ slug }: { slug: string }) {
    const [detail, setDetail] = useState<LeadModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    /**
     * Fetches the lead details from the server and updates the state.
     */
    useEffect(() => {
        async function fetchLeadDetail() {
            const result = await getLeadById(Number(slug));
            if (result.success) {
                setDetail(result.data);
            } else {
                setDetail(null);
                if (result.type === "UNAUTHORIZED") {
                    await logoutAdmin();
                }
            }
            setLoading(false);
        }
        fetchLeadDetail();
    }, [slug]);

    /**
     * Handles the change event for the "viewed" checkbox.
     * Updates the lead's viewed status both locally and on the server.
     * @param e the checkbox change event details
     */
    async function handleReadToggle() {
        if (detail) {
            const result = await updateLead(detail.id, {
                viewed: !detail.viewed,
            });
            if (result.success) {
                toaster.create({
                    title: "Lead Updated",
                    description: `The lead has been marked as ${!!detail?.viewed ? "viewed" : "not viewed"}.`,
                    closable: true,
                    type: "success",
                });
            } else {
                if (result.type === "UNAUTHORIZED") {
                    await logoutAdmin();
                }
                setDetail({ ...detail, viewed: !detail.viewed });
                toaster.create({
                    title: "Error Updating Lead",
                    description: result.error,
                    closable: true,
                    type: "error",
                });
            }
        }
    }

    function afterDelete() {
        router.push("/auth/manage/leads");
        toaster.create({
            title: "Lead Deleted",
            description: "The lead has been successfully deleted.",
            closable: true,
            type: "success",
        });
    }

    if (loading || !detail) {
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
                </Flex>
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
                    <DataListItem>
                        <DataList.ItemLabel>IP Address</DataList.ItemLabel>
                        <DataList.ItemValue>
                            {detail?.ipAddress || "Unknown"}
                        </DataList.ItemValue>
                    </DataListItem>
                    <DataListItem>
                        <DataList.ItemLabel>Location</DataList.ItemLabel>
                        <DataList.ItemValue>
                            {detail
                                ? `${detail.region || "Unknown"}, ${
                                      detail.city || "Unknown"
                                  }`
                                : "Unknown"}
                        </DataList.ItemValue>
                    </DataListItem>
                    <DataListItem>
                        <DataList.ItemLabel>Coordinates</DataList.ItemLabel>
                        <DataList.ItemValue>
                            {detail?.latitude && detail?.longitude
                                ? `${detail.latitude.toFixed(
                                      4,
                                  )}, ${detail.longitude.toFixed(4)}`
                                : "Unknown"}
                        </DataList.ItemValue>
                    </DataListItem>
                </DataList.Root>
                <Field.Root>
                    <Field.Label>Message</Field.Label>
                    <Textarea
                        value={detail?.message || ""}
                        mt={2}
                        rows={6}
                        readOnly
                    />
                </Field.Root>
            </Card.Body>
            <Card.Footer justifyContent="space-between" gap={2}>
                <DeleteLeadConfirmation
                    leadId={detail.id}
                    onClose={afterDelete}>
                    Delete
                </DeleteLeadConfirmation>
                <Button colorPalette="teal" onClick={handleReadToggle}>
                    Mark as {detail.viewed ? "Not Viewed" : "Viewed"}
                </Button>
            </Card.Footer>
        </Card.Root>
    );
}
