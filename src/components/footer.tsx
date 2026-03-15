import { Flex, Text } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Flex as="footer" bg="bg.muted" justify="center" py={6}>
            <Text fontSize="sm" color="text.muted">
                &copy; {new Date().getFullYear()} Colby Cooper. All rights
                reserved.
            </Text>
        </Flex>
    );
}
