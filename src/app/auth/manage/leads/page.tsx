import LeadList from "@/components/leadList";
import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import { Metadata } from "next";
import NextLink from "next/link";
import { TbArrowLeft, TbFlag } from "react-icons/tb";

export const metadata: Metadata = {
    title: "Leads",
};

export default function LeadsPage() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex direction="column" gap={{ base: 8, md: 12 }} as="section">
                <Flex align="start" justify="space-between" wrap="wrap" gap={4}>
                    <Heading size="3xl" textStyle="heading">
                        <Flex align="center" gap={4}>
                            <TbFlag size={32} />
                            Leads
                        </Flex>
                    </Heading>
                    <NextLink href="/auth/manage">
                        <Button variant="ghost" colorPalette="teal" size="sm">
                            <TbArrowLeft size={20} />
                            Back to Manage
                        </Button>
                    </NextLink>
                </Flex>
                <Box>
                    <LeadList />
                </Box>
            </Flex>
        </Container>
    );
}
