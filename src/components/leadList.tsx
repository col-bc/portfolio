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
import { JSX, useEffect, useState } from "react";
import { TbEye, TbTrash } from "react-icons/tb";
import { Lead } from "../../prisma/generated/prisma/client";
import DeleteLeadConfirmation from "./deleteLeadConfirmation";

export default function LeadList() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * Fetches the list of leads from the server and updates the state.
     */
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

    /**
     * Removes a lead from the state by its ID.
     * @param id - The ID of the lead to remove.
     */
    function popLeadById(id: number): void {
        setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
    }

    if (loading) {
        return (
            <Flex justify="center" py={12}>
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (leads.length === 0) {
        return <Text>No leads found.</Text>;
    }

    return (
        <>
            {leads.map((lead: Lead) => (
                <Card.Root
                    key={lead.id}
                    as="article"
                    mb={{ base: 6, md: 12 }}
                    variant="elevated">
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
                            gap={4}>
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
                            <TbTrash size={18} />
                            Delete Lead
                        </DeleteLeadConfirmation>
                        <NextLink href={`/auth/manage/leads/${lead.id}`}>
                            <Button colorPalette="cyan" variant="subtle">
                                <TbEye size={18} />
                                View Details
                            </Button>
                        </NextLink>
                    </Card.Footer>
                </Card.Root>
            ))}
        </>
    );
}

/**
 * LeadDataItem component renders a single data item with a label and value. It uses the DataList component from Chakra UI to display the label and value in a horizontal orientation. This component is used within the LeadList component to display various details about each lead, such as the received date, phone number, email, and location.
 * @param param0 - An object containing the label and value for the data item.
 * @returns {JSX.Element} A JSX element representing the data item with its label and value.
 */
function LeadDataItem({
    label,
    value,
}: {
    label: string;
    value: string;
}): JSX.Element {
    return (
        <DataList.Root orientation="horizontal">
            <DataList.ItemLabel>{label}</DataList.ItemLabel>
            <DataList.Item>{value}</DataList.Item>
        </DataList.Root>
    );
}
