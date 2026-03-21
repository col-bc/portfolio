import AuthForm from "@/components/authForm";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { Metadata } from "next";
import { LuShieldCheck } from "react-icons/lu";

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
                    <Flex align="center" gap={4}>
                        <LuShieldCheck size={32} />
                        Authentication
                    </Flex>
                </Heading>
                <AuthForm />
            </Flex>
        </Container>
    );
}
