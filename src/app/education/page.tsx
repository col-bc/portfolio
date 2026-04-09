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

const coursework = [
    "Database Systems",
    "Data Structures and Algorithms",
    "Software Architecture & Design",
    "Computer Networks",
    "Cloud Computing Software",
    "Testing & Quality",
    "Assurance Operating Systems",
];

const certifications = [
    {
        title: "AVADE® Retail Loss Prevention™",
        issuer: "AVADE",
        year: "2025",
        logoSrc: "/avade.png",
        fallback: "AV",
        alt: "AVADE® Retail Loss PreventionTM Logo",
        bullets: [
            "Mastered advanced verbal de-escalation strategies to identify, prevent, and mitigate workplace aggression and violence.",
            "Trained in the use of reasonable and appropriate force, including physical restraints, blocking, and disengaging techniques to ensure personal and customer safety.",
            "Proficient in legal and safe handcuffing procedures and suspect apprehension according to established retail security standards.",
        ],
    },
    {
        title: "Non-Confrontational Interview and Interrogation Techniques",
        issuer: "Wicklander-Zulawski & Associates",
        year: "2017",
        logoSrc: "/wz.png",
        fallback: "WZ",
        alt: "Wicklander-Zulawski & Associates Logo",
        bullets: [
            "Completed intensive training in advanced interview and interrogation techniques, focusing on non-confrontational methods to elicit accurate and reliable information from subjects.",
            "Developed expertise in behavioral analysis, rapport-building, and ethical interviewing practices, enhancing investigative outcomes and ensuring compliance with legal standards.",
            "Applied learned techniques in real-world scenarios, contributing to successful investigations and improved security outcomes.",
        ],
    },
];

const cardHoverStyles = {
    transform: "translateY(-4px)",
    shadow: "xl",
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
                    variant="elevated"
                    bg="bg.panel"
                    _hover={cardHoverStyles}>
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
                                    College of Computing and Software
                                    Engineering at{" "}
                                    <Em>Kennesaw State University,</Em>
                                    2027
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
                                {coursework.map((course) => (
                                    <List.Item key={course}>{course}</List.Item>
                                ))}
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

                {certifications.map((cert) => (
                    <Card.Root
                        key={cert.title}
                        transition="all 0.2s ease-in-out"
                        variant="elevated"
                        bg="bg.panel"
                        _hover={cardHoverStyles}>
                        <Card.Body>
                            <Flex align="start" gap={4} mb={{ base: 2, md: 4 }}>
                                <Avatar.Root size="xl">
                                    <Avatar.Image
                                        src={cert.logoSrc}
                                        alt={cert.alt}
                                    />
                                    <Avatar.Fallback>
                                        {cert.fallback}
                                    </Avatar.Fallback>
                                </Avatar.Root>
                                <Flex direction="column" flexGrow={1} gap={0}>
                                    <Heading
                                        textStyle="heading"
                                        fontSize="xl"
                                        fontWeight="bold"
                                        as="h2">
                                        {cert.title}
                                    </Heading>
                                    <Text textStyle="body">
                                        <Em>{cert.issuer}</Em>, {cert.year}
                                    </Text>
                                </Flex>
                            </Flex>
                            <List.Root gap={2} pl={4} textStyle="body">
                                {cert.bullets.map((bullet, index) => (
                                    <List.Item key={index}>{bullet}</List.Item>
                                ))}
                            </List.Root>
                        </Card.Body>
                    </Card.Root>
                ))}

                <ResumeCTA />
            </Flex>
        </Container>
    );
}
