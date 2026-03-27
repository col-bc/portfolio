import AuthForm from "@/components/authForm";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { Metadata } from "next";
import { TbShieldLock } from "react-icons/tb";

export const metadata: Metadata = {
    title: "Security",
};

export default function AuthPage() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex
                direction="column"
                gap={{ base: 8, md: 12 }}
                as="section"
                maxW="md"
                mx="auto"
                w="fit">
                <Heading size="3xl" textStyle="heading">
                    <Flex align="center" direction="column" gap={2}>
                        <TbShieldLock size={64} />
                        Authentication
                    </Flex>
                </Heading>
                <AuthForm />
            </Flex>
        </Container>
    );
}
