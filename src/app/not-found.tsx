"use client";
import {
    Badge,
    Box,
    Button,
    Card,
    Code,
    Container,
    Flex,
    Heading,
    Link,
    Text,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import {} from "next/router";
import {
    TbAlertTriangleFilled,
    TbArrowNarrowLeft,
    TbArrowNarrowRight,
    TbExternalLink,
} from "react-icons/tb";

export default function NotFound() {
    const path = usePathname();
    const router = useRouter();

    return (
        <Container
            maxW="4xl"
            flexGrow={1}
            py={{ base: 6, md: 8 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center">
            <Card.Root
                maxW="md"
                textAlign="center"
                bg="bg.panel"
                variant="elevated">
                <Card.Header>
                    <Flex
                        align="center"
                        justify="center"
                        textStyle="heading"
                        mb={4}>
                        <TbAlertTriangleFilled size={64} />
                    </Flex>
                    <Heading size="3xl" textStyle="heading">
                        Page Not Found
                    </Heading>
                </Card.Header>
                <Card.Body>
                    <Box mb={2}>
                        <Badge size="lg" colorPalette="red" fontStyle="code">
                            HTTP Error 404
                        </Badge>
                    </Box>
                    <Text mb={4} textAlign="left" textStyle="body">
                        The page at{" "}
                        <Code size="md" fontStyle="code">
                            {path}
                        </Code>{" "}
                        does not exist. Please check the URL for errors and try
                        again. If you believe this is a mistake, please{" "}
                        <Link
                            href="https://github.com/col-bc/portfolio/issues/new"
                            color="cyan.fg">
                            report the issue <TbExternalLink size={16} />
                        </Link>
                        .
                    </Text>
                </Card.Body>
                <Card.Footer>
                    <Flex align="center" justify="space-between" w="100%">
                        <Button
                            onClick={() => router.back()}
                            variant="outline"
                            size="lg">
                            <TbArrowNarrowLeft />
                            Go Back
                        </Button>
                        <Link href="/" _hover={{ textDecoration: "none" }}>
                            <Button size="lg" colorPalette="cyan">
                                Go Home <TbArrowNarrowRight />
                            </Button>
                        </Link>
                    </Flex>
                </Card.Footer>
            </Card.Root>
        </Container>
    );
}
