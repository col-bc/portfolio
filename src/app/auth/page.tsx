import AuthForm from "@/components/authForm";
import { Card, Container, Flex, Heading } from "@chakra-ui/react";
import { Metadata } from "next";
import { TbShieldLock } from "react-icons/tb";

export const metadata: Metadata = {
    title: "Authentication",
};

export default function AuthPage() {
    return (
        <Container maxW="4xl" py={{ base: 8, md: 12 }}>
            <Flex
                direction="column"
                gap={{ base: 8, md: 12 }}
                as="section"
                maxW="md"
                mx="auto"
                w="full">
                <Card.Root variant="elevated">
                    <Card.Header>
                        <Heading size="3xl" textStyle="heading">
                            <Flex align="center" direction="column" gap={2}>
                                <TbShieldLock size={64} />
                                Authentication
                            </Flex>
                        </Heading>
                    </Card.Header>
                    <Card.Body>
                        <Heading size="lg" mb={4}>
                            Sign In to Continue
                        </Heading>
                        <AuthForm />
                    </Card.Body>
                </Card.Root>
            </Flex>
        </Container>
    );
}
