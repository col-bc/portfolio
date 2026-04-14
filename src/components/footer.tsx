import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Footer() {
    return (
        <Flex
            as="footer"
            bg="bg.muted"
            align="center"
            justify="center"
            flexDirection="column"
            py={6}>
            <Text fontSize="sm" color="text.muted">
                &copy; {new Date().getFullYear()}{" "}
                <NextLink href="/auth">Colby Cooper</NextLink>. All rights
                reserved.
            </Text>
            <Text fontSize="sm" color="text.muted">
                Built with
                <Link href="https://nextjs.org/">Next.js</Link>,
                <Link href="https://chakra-ui.com/">Chakra UI</Link>, and a lot
                of coffee.
            </Text>
        </Flex>
    );
}
