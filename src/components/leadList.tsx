"use client";
import { logoutAdmin } from "@/app/lib/handleAuth";
import { getLeads } from "@/app/lib/handleLeads";
import {
    Badge,
    Button,
    Card,
    DataList,
    Flex,
    Grid,
    GridItem,
    Spinner,
    Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { Lead } from "../../prisma/generated/prisma/client";
import DeleteLeadConfirmation from "./deleteLeadConfirmation";

export default function LeadList() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchLeads() {
            setLoading(true);
            const response = await getLeads();
            if (response.success) {
                // sort newest to oldest
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

    function popLeadById(id: number) {
        setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
    }

    if (loading) {
        return <Spinner size="xl" />;
    }

    if (leads.length === 0) {
        return <Text>No leads found.</Text>;
    }

    return (
        <>
            {leads.map((lead: Lead) => (
                <Card.Root key={lead.id} as="article">
                    <Card.Header>
                        <Card.Title justifyContent="space-between">
                            <Flex>
                                {lead.name}
                                {lead.viewed ? (
                                    <Badge colorPalette="green" ml="auto">
                                        Viewed
                                    </Badge>
                                ) : (
                                    <Badge colorPalette="red" ml="auto">
                                        New
                                    </Badge>
                                )}
                            </Flex>
                        </Card.Title>
                        <Card.Description>
                            {lead.organization || "Unknown Organization"} -{" "}
                            <Badge>{lead.subject}</Badge>
                        </Card.Description>
                    </Card.Header>
                    <Card.Body>
                        <Grid
                            templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                            gap={2}>
                            <GridItem>
                                <LeadDataItem
                                    label="Received"
                                    value={lead.createdAt.toDateString()}
                                />
                            </GridItem>
                            <GridItem>
                                <LeadDataItem
                                    label="Phone"
                                    value={lead.phone || "Unknown"}
                                />
                            </GridItem>
                            <GridItem>
                                <LeadDataItem
                                    label="Email"
                                    value={lead.email || "Unknown"}
                                />
                            </GridItem>
                            <GridItem>
                                <LeadDataItem
                                    label="Location"
                                    value={`${lead.region || "Unknown"}, ${lead.city || "Unknown"}`}
                                />
                            </GridItem>
                        </Grid>
                    </Card.Body>
                    <Card.Footer justifyContent="space-between" gap={2}>
                        <DeleteLeadConfirmation
                            leadId={lead.id}
                            onClose={() => {
                                popLeadById(lead.id);
                            }}>
                            Delete
                        </DeleteLeadConfirmation>
                        <NextLink href={`/auth/manage/leads/${lead.id}`}>
                            <Button colorPalette="teal" variant="subtle">
                                View Details
                            </Button>
                        </NextLink>
                    </Card.Footer>
                </Card.Root>
            ))}
        </>
    );
}

function LeadDataItem({ label, value }: { label: string; value: string }) {
    return (
        <DataList.Root orientation="horizontal">
            <DataList.ItemLabel>{label}</DataList.ItemLabel>
            <DataList.Item>{value}</DataList.Item>
        </DataList.Root>
    );
}
