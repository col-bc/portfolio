import {
    Avatar,
    Box,
    Container,
    Em,
    Flex,
    Heading,
    List,
    Text,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { LuGraduationCap } from "react-icons/lu";

export default function Education() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex direction="column" gap={{ base: 8, md: 12 }} as="section">
                <Flex direction="column" gap={8}>
                    <Heading size="3xl" textStyle="heading">
                        <Flex align="center" gap={3}>
                            <LuGraduationCap size={34} />
                            <span>Education History</span>
                        </Flex>
                    </Heading>

                    <Box>
                        <Flex gap={4} align="start" mb={2}>
                            <Avatar.Root size="2xl">
                                <NextImage
                                    src="/ksu.svg"
                                    width={48}
                                    height={48}
                                    alt="Kennesaw State University"
                                />
                            </Avatar.Root>
                            <Box>
                                <Text fontSize="xl" fontWeight="bold">
                                    Bachelor of Science in Software Engineering
                                    (BS SWE)
                                </Text>
                                <Text color="fg.muted" fontSize="md">
                                    <Em>
                                        Southern Polytechnic College of
                                        Computing and Software Engineering
                                        (CCSE)
                                    </Em>
                                    <br />
                                    Kennesaw State University, 2027
                                </Text>
                            </Box>
                        </Flex>
                        <Text textStyle="body" mb={2}>
                            Currently pursuing a rigorous, systems-focused
                            curriculum to complement my professional background
                            in corporate risk mitigation, with an emphasis on
                            database architecture, secure data pipelines, and
                            scalable software design.
                        </Text>
                        <Text textStyle="body" mb={4}>
                            My education is centered around developing a deep
                            understanding of software engineering principles,
                            software architecture and design patterns, and best
                            practices for building secure, scalable, and
                            maintainable software systems. I am committed to
                            applying these principles in real-world projects and
                            internships to further enhance my skills and
                            contribute to the field of software engineering.
                        </Text>
                        <Flex direction="column" gap={2}>
                            <Heading
                                size="lg"
                                textStyle="heading"
                                fontWeight={500}
                                textDecor="underline">
                                Relevant Coursework
                            </Heading>
                            <List.Root
                                as="ul"
                                pl={4}
                                display="grid"
                                gridTemplateColumns={{
                                    base: "1fr",
                                    md: "repeat(2, 1fr)",
                                }}
                                gap={2}>
                                <List.Item>Database Systems</List.Item>
                                <List.Item>
                                    Data Structures and Algorithms
                                </List.Item>
                                <List.Item>
                                    Software Architecture & Design
                                </List.Item>
                                <List.Item>Computer Networks</List.Item>
                                <List.Item>Cloud Computing Software </List.Item>
                                <List.Item>Testing & Quality</List.Item>
                                <List.Item>
                                    Assurance Operating Systems
                                </List.Item>
                            </List.Root>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
        </Container>
    );
}
