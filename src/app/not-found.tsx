"use client";
import {
    Button,
    Card,
    Code,
    Container,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { TbAlertTriangleFilled, TbArrowNarrowRight } from "react-icons/tb";

export default function NotFound() {
    const path = usePathname();
    return (
        <Container
            maxW="4xl"
            flexGrow={1}
            py={{ base: 6, md: 8 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center">
            <Flex
                h="100%"
                direction="column"
                align="center"
                justify="center"
                gap={{ base: 8, md: 12 }}
                as="section">
                <Card.Root
                    w="100%"
                    borderColor="border.error"
                    boxShadow="sm"
                    boxShadowColor="bg.error">
                    <Card.Header>
                        <Heading size="3xl" textStyle="heading">
                            <Flex align="center" gap={4}>
                                <TbAlertTriangleFilled size={32} />
                                Page Not Found
                            </Flex>
                        </Heading>
                    </Card.Header>
                    <Card.Body gap={4}>
                        <Heading size="lg" textStyle="heading">
                            HTTP Error 404
                        </Heading>

                        <Text>
                            The page at <Code size="md">{path}</Code> does not
                            exist. Please check the URL for errors or return to
                            the homepage.
                        </Text>
                    </Card.Body>
                    <Card.Footer>
                        <NextLink href="/">
                            <Button
                                size="lg"
                                colorPalette="teal"
                                shadow="sm"
                                shadowColor="teal.emphasized">
                                Go Home <TbArrowNarrowRight />
                            </Button>
                        </NextLink>
                    </Card.Footer>
                </Card.Root>
            </Flex>
        </Container>
    );
}
