import LeadList from "@/components/leadList";
import { ResumeForm } from "@/components/resumeForm";
import { Card, Container, Flex, Heading, Tabs } from "@chakra-ui/react";
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

                <Tabs.Root
                    defaultValue="resume"
                    variant="enclosed"
                    colorPalette="teal">
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
                        <Card.Root>
                            <Card.Header>
                                <Card.Title>Upload New Resume</Card.Title>
                                <Card.Description>
                                    Update your resume to keep it current and
                                    relevant.
                                </Card.Description>
                            </Card.Header>
                            <Card.Body gap={6}>
                                <ResumeForm />
                                <Heading size="lg">Current Resume</Heading>
                                <embed
                                    src={`/api/resume?t=${Date.now()}`}
                                    type="application/pdf"
                                    width="100%"
                                    height="600px"
                                />
                            </Card.Body>
                        </Card.Root>
                    </Tabs.Content>
                    <Tabs.Content value="leads">
                        <LeadList />
                    </Tabs.Content>
                </Tabs.Root>
            </Flex>
        </Container>
    );
}
