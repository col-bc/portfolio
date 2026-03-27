import ResumeCTA from "@/components/resumeCta";
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
import { TbCertificate, TbSchool } from "react-icons/tb";

export default function Education() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex direction="column" gap={{ base: 8, md: 12 }} as="section">
                <Flex direction="column" gap={8}>
                    <Heading size="3xl" textStyle="heading">
                        <Flex align="center" gap={3}>
                            <TbSchool size={34} />
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
                        <Text textStyle="body" mb={4}>
                            Currently pursuing a rigorous, systems-focused
                            curriculum to complement my professional background
                            in corporate risk mitigation, with an emphasis on
                            database architecture, secure data pipelines, and
                            scalable software design.
                        </Text>
                        <Flex direction="column" gap={2}>
                            <Heading
                                size="lg"
                                textStyle="heading"
                                fontWeight={700}>
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

                    <Flex direction="column" gap={8}>
                        <Heading size="3xl" textStyle="heading">
                            <Flex align="center" gap={4}>
                                <TbCertificate size={32} />
                                Certifications
                            </Flex>
                        </Heading>
                        <Box>
                            <Flex align="start" gap={4} mb={2}>
                                <Avatar.Root size="xl">
                                    <Avatar.Image
                                        src="/wz.png"
                                        alt="Wicklander-Zulawski & Associates Logo"
                                    />
                                    <Avatar.Fallback>WZ</Avatar.Fallback>
                                </Avatar.Root>
                                <Flex direction="column" flexGrow={1} gap={0}>
                                    <Heading size="xl" textStyle="heading">
                                        Non-Confrontational Interview and
                                        Interrogation Techniques
                                    </Heading>
                                    <Text>
                                        <Em>
                                            Wicklander-Zulawski & Associates
                                        </Em>
                                        , 2017
                                    </Text>
                                </Flex>
                            </Flex>
                            <List.Root textStyle="body" gap={2} pl={4}>
                                <List.Item>
                                    Completed intensive training in advanced
                                    interview and interrogation techniques,
                                    focusing on non-confrontational methods to
                                    elicit accurate and reliable information
                                    from subjects.
                                </List.Item>
                                <List.Item>
                                    Developed expertise in behavioral analysis,
                                    rapport-building, and ethical interviewing
                                    practices, enhancing investigative outcomes
                                    and ensuring compliance with legal
                                    standards.
                                </List.Item>
                                <List.Item>
                                    Applied learned techniques in real-world
                                    scenarios, contributing to successful
                                    investigations and improved security
                                    outcomes.
                                </List.Item>
                            </List.Root>
                        </Box>
                    </Flex>

                    <ResumeCTA />
                </Flex>
            </Flex>
        </Container>
    );
}
