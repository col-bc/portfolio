import LeadTable from "@/components/leadTable";
import { ResumeForm } from "@/components/resumeForm";
import { Card, Container, Flex, Heading, Tabs, Text } from "@chakra-ui/react";
import { TbBrowser, TbFileTextAi, TbFlag } from "react-icons/tb";

export default function ManagePage() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex direction="column" gap={{ base: 8, md: 12 }} as="section">
                <Heading size="3xl" textStyle="heading">
                    <Flex align="center" gap={4}>
                        <TbBrowser size={32} />
                        Site Management
                    </Flex>
                </Heading>

                <Card.Root>
                    <Tabs.Root defaultValue="resume">
                        <Card.Body>
                            <Tabs.List>
                                <Tabs.Trigger value="resume">
                                    <TbFileTextAi size={24} />
                                    Resume
                                </Tabs.Trigger>
                                <Tabs.Trigger value="leads">
                                    <TbFlag size={24} />
                                    Leads
                                </Tabs.Trigger>
                            </Tabs.List>
                            <Tabs.Content value="resume">
                                <Card.Title mb={6}>
                                    Resume Management
                                </Card.Title>
                                <ResumeForm />
                                <object
                                    data={`/api/resume?t=${Date.now()}`}
                                    type="application/pdf"
                                    width="100%"
                                    height="600px">
                                    {/* Fallback for browsers that don't support inline PDFs */}
                                    <Text>
                                        Your browser does not support PDFs.{" "}
                                        <a href="/api/resume">
                                            Download it here
                                        </a>
                                        .
                                    </Text>
                                </object>
                            </Tabs.Content>
                            <Tabs.Content value="leads">
                                <Card.Title mb={6}>Leads Management</Card.Title>
                                <LeadTable />
                            </Tabs.Content>
                        </Card.Body>
                    </Tabs.Root>
                </Card.Root>
            </Flex>
        </Container>
    );
}
