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
            <Card.Root maxW="md" textAlign="center" shadow="lg">
                <Card.Header>
                    <Flex
                        align="center"
                        justify="center"
                        textStyle="heading"
                        mb={4}>
                        <TbAlertTriangleFilled size={64} />
                    </Flex>
                    <Heading size="3xl" textStyle="heading" mb={6}>
                        Page Not Found
                    </Heading>
                </Card.Header>
                <Card.Body>
                    <Box mb={2}>
                        <Badge size="lg" colorPalette="red">
                            HTTP Error 404
                        </Badge>
                    </Box>
                    <Text mb={4} textAlign="left" textStyle="body">
                        The page at <Code size="md">{path}</Code> does not
                        exist. Please check the URL for errors and try again. If
                        you believe this is a mistake, please{" "}
                        <Link
                            href="https://github.com/col-bc/portfolio/issues/new"
                            color="teal.fg">
                            report the issue
                        </Link>
                        .
                    </Text>
                </Card.Body>
                <Card.Footer>
                    <Link href="/" _hover={{ textDecoration: "none" }}>
                        <Button
                            size="lg"
                            colorPalette="teal"
                            shadow="sm"
                            shadowColor="teal.emphasized">
                            Go Home <TbArrowNarrowRight />
                        </Button>
                    </Link>
                </Card.Footer>
            </Card.Root>
        </Container>
    );
}
