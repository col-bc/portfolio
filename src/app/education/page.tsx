import ResumeCTA from "@/components/resumeCta";
import {
    Avatar,
    Box,
    Card,
    Container,
    Em,
    Flex,
    Heading,
    List,
    Text,
} from "@chakra-ui/react";
import { Metadata } from "next";
import NextImage from "next/image";
import { TbCertificate, TbSchool } from "react-icons/tb";

export const metadata: Metadata = {
    title: "Education",
};

export default function Education() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex
                direction="column"
                gap={{ base: 8, md: 12, lg: 16 }}
                as="section">
                <Heading size="3xl" textStyle="heading" as="h1">
                    <Flex align="center" gap={3}>
                        <TbSchool size={34} />
                        <span>Education History</span>
                    </Flex>
                </Heading>

                <Card.Root
                    transition="all 0.2s ease-in-out"
                    _hover={{
                        bg: "white/05",
                        transform: "translateY(-2px)",
                        shadow: "lg",
                    }}>
                    <Card.Body>
                        <Flex gap={4} align="start" mb={{ base: 2, md: 4 }}>
                            <Avatar.Root size="2xl">
                                <NextImage
                                    src="/ksu.svg"
                                    width={48}
                                    height={48}
                                    alt="Kennesaw State University"
                                />
                            </Avatar.Root>
                            <Box>
                                <Heading
                                    textStyle="heading"
                                    fontSize="xl"
                                    fontWeight="bold"
                                    as="h2">
                                    Bachelor of Science in Software Engineering
                                    (BS SWE)
                                </Heading>
                                <Text color="fg.muted" fontSize="md">
                                    <Em>
                                        Southern Polytechnic College of
                                        Engineering and Engineering Technology
                                    </Em>
                                    <br />
                                    Kennesaw State University, 2027
                                </Text>
                            </Box>
                        </Flex>
                        <Text textStyle="body" mb={{ base: 4, md: 6 }}>
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
                                fontWeight={700}
                                as="h3">
                                Relevant Coursework
                            </Heading>
                            <List.Root
                                as="ul"
                                pl={4}
                                textStyle="body"
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
                    </Card.Body>
                </Card.Root>

                <Heading size="3xl" textStyle="heading" as="h1">
                    <Flex align="center" gap={4}>
                        <TbCertificate size={32} />
                        Certifications
                    </Flex>
                </Heading>

                <Card.Root
                    transition="all 0.2s ease-in-out"
                    _hover={{
                        bg: "white/05",
                        transform: "translateY(-2px)",
                        shadow: "lg",
                    }}>
                    <Card.Body>
                        <Flex align="start" gap={4} mb={{ base: 2, md: 4 }}>
                            <Avatar.Root size="xl">
                                <Avatar.Image
                                    src="/wz.png"
                                    alt="Wicklander-Zulawski & Associates Logo"
                                />
                                <Avatar.Fallback>WZ</Avatar.Fallback>
                            </Avatar.Root>
                            <Flex direction="column" flexGrow={1} gap={0}>
                                <Heading
                                    textStyle="heading"
                                    fontSize="xl"
                                    fontWeight="bold"
                                    as="h2">
                                    Non-Confrontational Interview and
                                    Interrogation Techniques
                                </Heading>
                                <Text textStyle="body">
                                    <Em>Wicklander-Zulawski & Associates</Em>,
                                    2017
                                </Text>
                            </Flex>
                        </Flex>
                        <List.Root gap={2} pl={4} textStyle="body">
                            <List.Item textStyle="body">
                                Completed intensive training in advanced
                                interview and interrogation techniques, focusing
                                on non-confrontational methods to elicit
                                accurate and reliable information from subjects.
                            </List.Item>
                            <List.Item>
                                Developed expertise in behavioral analysis,
                                rapport-building, and ethical interviewing
                                practices, enhancing investigative outcomes and
                                ensuring compliance with legal standards.
                            </List.Item>
                            <List.Item>
                                Applied learned techniques in real-world
                                scenarios, contributing to successful
                                investigations and improved security outcomes.
                            </List.Item>
                        </List.Root>
                    </Card.Body>
                </Card.Root>

                <ResumeCTA />
            </Flex>
        </Container>
    );
}
