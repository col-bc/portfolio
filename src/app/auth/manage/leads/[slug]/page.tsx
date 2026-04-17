import { LeadDetailForm } from "@/components/leadDetailForm";
import {
    Box,
    Button,
    Code,
    Container,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react";
import { Metadata } from "next";
import NextLink from "next/link";
import { TbArrowLeft, TbFlag } from "react-icons/tb";

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
                <Flex align="start" justify="space-between" wrap="wrap" gap={4}>
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
                    <NextLink href="/auth/manage/leads">
                        <Button variant="ghost" colorPalette="teal" size="sm">
                            <TbArrowLeft size={20} />
                            Back to Leads
                        </Button>
                    </NextLink>
                </Flex>
                <LeadDetailForm slug={slug} />
            </Flex>
        </Container>
    );
}
