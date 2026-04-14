import CodeSamples from "@/components/codeSamples";

import {
    Avatar,
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Tag,
    Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
    TbBriefcase2,
    TbCloudDownload,
    TbMessage,
    TbSchool,
} from "react-icons/tb";

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
    "FastAPI",
    "Prisma",

    // Architecture, Data & Integration
    "PostgreSQL",
    "NoSQL",
    "RESTful APIs",
    "System Integration",
    "Database Design & Normalization",

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
    "Agile Methodologies",
    "Data Structures & Algorithms",
];

export default function Home() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex direction="column" gap={{ base: 8, md: 12, lg: 16 }}>
                {/* Intro, Code Samples, Skills Section */}
                <section>
                    <Flex direction="column" gap={{ base: 8, md: 12, lg: 16 }}>
                        {/* Intro */}
                        <Flex
                            direction="column"
                            gap={6}
                            align={{
                                base: "center",
                                md: "flex-start",
                            }}
                            textAlign={{
                                base: "center",
                                md: "left",
                            }}>
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
                                gap={{ base: 4, md: 6 }}
                                textAlign={{
                                    base: "center",
                                    md: "left",
                                }}>
                                <Flex direction="column" gap={4} flex={1}>
                                    <Text
                                        fontSize="xl"
                                        fontWeight="medium"
                                        color="fg"
                                        lineHeight="short">
                                        I am a technical problem-solver who
                                        treats every operational bottleneck,
                                        data discrepancy, and software bug like
                                        an investigation.
                                    </Text>
                                    <Text
                                        lineHeight="tall"
                                        fontSize="md"
                                        color="fg.muted">
                                        With over five years of experience
                                        managing corporate compliance and risk
                                        mitigation for Fortune 50 retailers, I
                                        now translate those analytical skills
                                        into system architecture and IT
                                        infrastructure. As a Software
                                        Engineering candidate proficient in
                                        full-stack development and database
                                        management, I excel in dynamic
                                        environments that require technical
                                        precision, strict ethical standards, and
                                        the ability to bridge the gap between
                                        physical operations and digital
                                        ecosystems.
                                    </Text>
                                </Flex>
                                <Avatar.Root
                                    colorPalette="teal"
                                    boxSize={60}
                                    border="8px solid"
                                    borderColor="teal.focusRing">
                                    <Avatar.Image
                                        src="/headshot.jpg"
                                        alt="Colby Cooper"
                                    />
                                </Avatar.Root>
                            </Flex>
                            <Flex
                                direction="row"
                                gap={4}
                                flexWrap="wrap"
                                justify={{
                                    base: "center",
                                    md: "flex-start",
                                }}>
                                <NextLink href="/contact">
                                    <Button colorPalette="teal">
                                        <TbMessage />
                                        Get in Touch
                                    </Button>
                                </NextLink>
                                <NextLink href="/api/resume" target="_blank">
                                    <Button
                                        colorPalette="teal"
                                        variant="surface">
                                        <TbCloudDownload />
                                        Download Resume
                                    </Button>
                                </NextLink>
                            </Flex>
                        </Flex>

                        {/* Code Samples */}
                        <Flex direction="column" gap={6}>
                            <Heading size="2xl" textStyle="heading">
                                Code Samples
                            </Heading>
                            <CodeSamples />
                        </Flex>

                        {/* Skills */}
                        <Flex direction="column" gap={6}>
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
                            <Image
                                src="USA.svg"
                                alt="US Flag"
                                w={{
                                    base: 8,
                                    md: 10,
                                }}
                            />
                            <Text fontSize="lg" color="fg.muted">
                                Authorized to work for any employer in the
                                United States without sponsorship.
                            </Text>
                        </Flex>
                        <Flex align="center" gap={4}>
                            <Image
                                src="Canada.svg"
                                alt="Canada Flag"
                                w={{
                                    base: 8,
                                    md: 10,
                                }}
                            />
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
                        align="stretch"
                        justify="center"
                        py={4}
                        gap={4}>
                        <NextLink href="/education">
                            <Button
                                w="full"
                                colorPalette="teal"
                                variant="surface"
                                size="lg"
                                px={{ base: 6, md: 12 }}>
                                <TbSchool />
                                Education History
                            </Button>
                        </NextLink>
                        <NextLink href="/employment">
                            <Button
                                w="full"
                                colorPalette="teal"
                                variant="surface"
                                size="lg"
                                px={{ base: 6, md: 12 }}>
                                <TbBriefcase2 />
                                Employment History
                            </Button>
                        </NextLink>
                    </Flex>
                </section>
            </Flex>
        </Container>
    );
}
