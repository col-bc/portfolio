import LeadTable from "@/components/leadList";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { Metadata } from "next";
import { TbFlag } from "react-icons/tb";

export const metadata: Metadata = {
    title: "Leads",
};

export default function LeadsPage() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex direction="column" gap={{ base: 8, md: 12 }} as="section">
                <Heading size="3xl" textStyle="heading">
                    <Flex align="center" gap={4}>
                        <TbFlag size={32} />
                        Leads
                    </Flex>
                </Heading>
                <LeadTable />
            </Flex>
        </Container>
    );
}
