import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
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
                <Link
                    href="/api/resume"
                    target="_blank"
                    _hover={{
                        textDecor: "none",
                    }}>
                    <Button size="lg" variant="outline" colorPalette="primary">
                        <TbCloudDownload /> Download My Resume
                    </Button>
                </Link>
            </Box>
        </Flex>
    );
}
