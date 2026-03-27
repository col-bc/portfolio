"use client";
import CodeSamples from "@/components/codeSamples";

import {
    Avatar,
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Link,
    Tag,
    Text,
} from "@chakra-ui/react";
import {
    TbBrandGithub,
    TbBriefcase2,
    TbCloudDownload,
    TbMessage,
    TbSchool,
} from "react-icons/tb";

export default function Home() {
    const skillList = [
        // Core Languages
        "TypeScript",
        "JavaScript",
        "Python",
        "Java",
        "SQL",

        // Frameworks & Backend Logic
        "React",
        "Next.js",
        "Node.js",
        "Django",
        "Flask",
        "Prisma",

        // Architecture, Data & Integration
        "SQLite",
        "NoSQL",
        "GraphQL",
        "RESTful APIs",
        "System Integration",

        // Infrastructure & DevOps
        "GCP",
        "Cloudflare",
        "Docker",
        "Linux",
        "CI/CD",

        // Security, Testing & Operations
        "TCP/IP Networking",
        "Cryptography",
        "Data Integrity",
        "Root-Cause Analysis",
        "Test-Driven Development (TDD)",
        "Agile Methodologies",
    ];

    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex direction="column" gap={{ base: 12, md: 16 }}>
                {/* Intro, Code Samples, Skills Section */}
                <section>
                    <Flex direction="column" gap={10}>
                        {/* Intro */}
                        <Flex direction="column" gap={6}>
                            <Heading size="3xl" textStyle="heading">
                                Hi, I&apos;m Colby Cooper
                            </Heading>
                            <Flex
                                direction={{
                                    base: "column-reverse",
                                    md: "row",
                                }}
                                align={{
                                    base: "center",
                                    md: "flex-start",
                                }}
                                gap={4}>
                                <Text lineHeight={1.7} fontSize="md">
                                    I am a technical problem-solver who treats
                                    every operational bottleneck, data
                                    discrepancy, and software bug like an
                                    investigation. With over five years of
                                    experience managing corporate compliance and
                                    risk mitigation for Fortune 50 retailers, I
                                    now translate those analytical skills into
                                    system architecture and IT infrastructure.
                                    As a Software Engineering candidate
                                    proficient in full-stack development and
                                    database management, I excel in dynamic
                                    environments that require technical
                                    precision, strict ethical standards, and the
                                    ability to bridge the gap between physical
                                    operations and digital ecosystems.
                                </Text>
                                <Avatar.Root
                                    colorPalette="teal"
                                    boxSize={60}
                                    border="6px solid"
                                    borderColor="teal.focusRing"
                                    boxShadow="0 8px 16px color-mix(in srgb, var(--chakra-colors-teal-500) 20%, transparent)">
                                    <Avatar.Image
                                        src="/headshot.jpg"
                                        alt="Colby Cooper"
                                    />
                                </Avatar.Root>
                            </Flex>
                            <Flex direction="row" gap={4}>
                                <Link href="/contact" textDecoration="none">
                                    <Button
                                        colorPalette="teal"
                                        shadow="sm"
                                        shadowColor="teal.emphasized">
                                        <TbMessage />
                                        Get in Touch
                                    </Button>
                                </Link>
                                <Link
                                    href="/Colby Cooper's Resume.pdf"
                                    download
                                    textDecoration="none">
                                    <Button colorPalette="teal" variant="ghost">
                                        <TbCloudDownload />
                                        Download Resume
                                    </Button>
                                </Link>
                            </Flex>
                        </Flex>

                        {/* Code Samples */}
                        <Flex direction="column" gap={6}>
                            <Heading size="2xl" textStyle="heading">
                                Code Samples
                            </Heading>
                            <CodeSamples />
                            <Flex direction="row" p={4} justify="center">
                                <Link
                                    href="https://github.com/col-bc"
                                    textDecoration="none"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <Button
                                        w="100%"
                                        colorPalette="teal"
                                        size="lg"
                                        shadow="sm"
                                        shadowColor="teal.emphasized">
                                        <TbBrandGithub />
                                        View More on GitHub
                                    </Button>
                                </Link>
                            </Flex>
                        </Flex>

                        {/* Skills */}
                        <Flex direction="column" gap={4}>
                            <Heading size="2xl" textStyle="heading">
                                Skills, Technologies, and Frameworks
                            </Heading>
                            <Flex flexWrap="wrap" gap={2}>
                                {skillList.map((s) => (
                                    <Tag.Root
                                        key={s}
                                        size="lg"
                                        variant="subtle">
                                        <Tag.Label>{s}</Tag.Label>
                                    </Tag.Root>
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>
                </section>

                {/* Work Authorizations */}
                <section>
                    <Heading size="2xl" textStyle="heading" mb={4}>
                        Work Authorizations
                    </Heading>
                    <Flex direction="column" gap={4}>
                        <Flex align="center" gap={4}>
                            <Image src="USA.svg" alt="US Flag" w={10} />
                            <Text fontSize="lg" color="fg.muted">
                                Authorized to work for any employer in the
                                United States without sponsorship.
                            </Text>
                        </Flex>
                        <Flex align="center" gap={4}>
                            <Image src="Canada.svg" alt="Canada Flag" w={10} />
                            <Text fontSize="lg" color="fg.muted">
                                Authorized to work for any employer in Canada
                                without sponsorship.
                            </Text>
                        </Flex>
                    </Flex>
                </section>

                {/* Links */}
                <section>
                    <Flex
                        direction={{
                            base: "column",
                            md: "row",
                        }}
                        align={{
                            base: "stretch",
                            md: "center",
                        }}
                        justify={{
                            base: "center",
                            md: "space-between",
                        }}
                        py={4}
                        gap={4}>
                        <Link href="/education" w="100%">
                            <Button
                                w="full"
                                colorPalette="teal"
                                variant="surface"
                                size="lg"
                                px={{ base: 6, md: 12 }}>
                                <TbSchool />
                                Education History
                            </Button>
                        </Link>
                        <Link href="/employment" w="100%">
                            <Button
                                w="full"
                                colorPalette="teal"
                                variant="surface"
                                size="lg"
                                px={{ base: 6, md: 12 }}>
                                <TbBriefcase2 />
                                Employment History
                            </Button>
                        </Link>
                    </Flex>
                </section>
            </Flex>
        </Container>
    );
}
