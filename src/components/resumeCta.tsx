import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { TbCloudDownload } from "react-icons/tb";

export default function ResumeCTA() {
    return (
        <Flex direction="column" gap={4} bg="bg.muted" p={6} borderRadius="md">
            <Heading size="xl" textStyle="heading">
                Download My Resume
            </Heading>
            <Text>
                For a more detailed overview of my work history, skills, and
                accomplishments, please feel free to download my resume or get
                in touch with me directly. I am always open to discussing
                potential opportunities and collaborations.
            </Text>
            <Box textAlign="center">
                <Link href="/Colby Cooper's Resume.pdf" download>
                    <Button
                        size="lg"
                        colorPalette="teal"
                        shadow="sm"
                        shadowColor="teal.emphasized">
                        <TbCloudDownload /> Download Resume
                    </Button>
                </Link>
            </Box>
        </Flex>
    );
}
