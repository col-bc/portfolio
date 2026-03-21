import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Link,
    Text,
} from "@chakra-ui/react";
import { LuArrowRight, LuCircleAlert } from "react-icons/lu";

export default function NotFound() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex
                direction="column"
                gap={{ base: 8, md: 12 }}
                as="section"
                maxW="md">
                <Box spaceY={4}>
                    <Flex align="center" gap={4}>
                        <LuCircleAlert size={32} />
                        <Heading size="3xl">Page Not Found</Heading>
                    </Flex>
                    <Text>The page you are looking for does not exist.</Text>

                    <Box mt={6}>
                        <Link href="/" colorPalette="teal">
                            <Button
                                size="lg"
                                colorPalette="teal"
                                shadow="sm"
                                shadowColor="teal.emphasized">
                                Go to Homepage <LuArrowRight size={16} />
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
}
