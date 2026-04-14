import { LeadDetailForm } from "@/components/leadDetailForm";
import { Box, Code, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Metadata } from "next";
import { TbFlag } from "react-icons/tb";

export const metadata: Metadata = {
    title: "Lead Details",
};

export default async function LeadDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex direction="column" gap={{ base: 8, md: 12 }} as="section">
                <Box>
                    <Heading size="3xl" textStyle="heading">
                        <Flex align="center" gap={4}>
                            <TbFlag size={32} />
                            Lead Details
                        </Flex>
                    </Heading>
                    <Text fontSize="lg" color="fg.muted">
                        Lead ID: <Code>{slug}</Code>
                    </Text>
                </Box>
                <LeadDetailForm slug={slug} />
            </Flex>
        </Container>
    );
}
