import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { TbCloudDownload } from "react-icons/tb";

export default function ResumeCTA() {
    return (
        <Flex direction="column" gap={4} textAlign="center" align="center">
            <Heading size="xl" textStyle="heading">
                Download My Resume
            </Heading>
            <Text textStyle="body">
                Download my resume to view my work history, skills, and
                accomplishments. Share it with others or keep it for your
                reference. Thank you for your interest!
            </Text>
            <Box>
                <NextLink href="/Colby Cooper's Resume.pdf" download>
                    <Button
                        size="lg"
                        variant="outline"
                        colorPalette="teal"
                        shadow="sm"
                        shadowColor="teal.emphasized">
                        <TbCloudDownload /> Download My Resume
                    </Button>
                </NextLink>
            </Box>
        </Flex>
    );
}
