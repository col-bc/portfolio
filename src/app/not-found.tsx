"use client";
import {
    Box,
    Button,
    Code,
    Container,
    Flex,
    Heading,
    Link,
    Text,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { TbAlertTriangleFilled, TbArrowNarrowRight } from "react-icons/tb";

export default function NotFound() {
    const path = usePathname();
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex
                direction="column"
                gap={{ base: 8, md: 12 }}
                as="section"
                maxW="md">
                <Box spaceY={4}>
                    <Flex align="center" gap={4}>
                        <TbAlertTriangleFilled size={32} />
                        <Heading size="3xl">Page Not Found</Heading>
                    </Flex>
                    <Box>
                        <Text>
                            The page at <Code size="md">{path}</Code> does not
                            exist. Please check the URL for errors or return to
                            the homepage.
                        </Text>
                    </Box>

                    <Box mt={6}>
                        <Link href="/" colorPalette="teal">
                            <Button
                                size="lg"
                                colorPalette="teal"
                                shadow="sm"
                                shadowColor="teal.emphasized">
                                Go Home <TbArrowNarrowRight />
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
}
