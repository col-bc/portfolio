"use client";
import { logoutAdmin } from "@/app/lib/handleAuth";
import { getLeads } from "@/app/lib/handleLeads";
import { Checkbox, Link, Spinner, Table, Tag, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Lead } from "../../prisma/generated/prisma/client";

export default function LeadTable() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchLeads() {
            setLoading(true);
            const response = await getLeads();
            if (response.success) {
                setLeads(
                    response.data.sort(
                        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
                    ),
                );
            } else {
                if (response.type === "UNAUTHORIZED") {
                    setLeads([]);
                    await logoutAdmin();
                }
            }
            setLoading(false);
        }

        fetchLeads();
    }, []);

    return (
        <Table.ScrollArea borderWidth="1px">
            <Table.Root variant="outline">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>ID</Table.ColumnHeader>
                        <Table.ColumnHeader>Category</Table.ColumnHeader>
                        <Table.ColumnHeader>Contact Name</Table.ColumnHeader>
                        <Table.ColumnHeader>
                            Organization Name
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>Created At</Table.ColumnHeader>
                        <Table.ColumnHeader>Viewed</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {loading ? (
                        <Table.Row>
                            <Table.Cell colSpan={7} textAlign="center">
                                <Spinner size="lg" />
                            </Table.Cell>
                        </Table.Row>
                    ) : leads.length === 0 ? (
                        <Table.Row>
                            <Table.Cell colSpan={7} textAlign="center">
                                <Text textStyle="body" color="fg.muted">
                                    No leads found.
                                </Text>
                            </Table.Cell>
                        </Table.Row>
                    ) : (
                        leads.map((lead) => (
                            <Table.Row key={lead.id}>
                                <Table.Cell>
                                    <Link
                                        href={`/auth/manage/leads/${lead.id}`}>
                                        {lead.id}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Tag.Root>
                                        <Tag.Label>
                                            {lead.subject
                                                .charAt(0)
                                                .toUpperCase() +
                                                lead.subject.slice(1)}
                                        </Tag.Label>
                                    </Tag.Root>
                                </Table.Cell>
                                <Table.Cell>{lead.name}</Table.Cell>
                                <Table.Cell>
                                    {lead.organization || "N/A"}
                                </Table.Cell>
                                <Table.Cell>
                                    {new Date(lead.createdAt).toLocaleString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        },
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <Checkbox.Root
                                        checked={lead.viewed}
                                        readOnly
                                        variant="solid">
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control />
                                    </Checkbox.Root>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
    );
}
