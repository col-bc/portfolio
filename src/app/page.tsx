"use client";
import { sample1, sample2, sample3, sample4 } from "@/codeSamples";
import {
    Avatar,
    Box,
    Button,
    CodeBlock,
    Container,
    createShikiAdapter,
    Flex,
    Heading,
    Link,
    Tabs,
    Tag,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaDatabase, FaJava, FaPython, FaReact } from "react-icons/fa";
import {
    LuBriefcaseBusiness,
    LuDownload,
    LuGithub,
    LuGraduationCap,
    LuMessageSquare,
} from "react-icons/lu";
import type { HighlighterGeneric } from "shiki";

const shikiAdapter = createShikiAdapter<HighlighterGeneric<never, never>>({
    async load() {
        const { createHighlighter } = await import("shiki");
        return createHighlighter({
            langs: [
                "tsx",
                "scss",
                "html",
                "python",
                "json",
                "tsx",
                "java",
                "sql",
            ],
            themes: ["ayu-dark", "github-dark"],
        });
    },
    theme: "ayu-dark",
});

export default function Home() {
    const [currentSample, setCurrentSample] = useState("sample1");

    const sampleDescriptions: Record<string, string> = {
        sample1: sample1.description,
        sample2: sample2.description,
        sample3: sample3.description,
        sample4: sample4.description,
    };

    const skillList = [
        // Core Languages
        "TypeScript",
        "JavaScript",
        "Python",
        "Java",
        "SQL",
        "HTML",
        "CSS",

        // Frameworks & Backend Logic
        "React",
        "Next.js",
        "Node.js",
        "Django",
        "Flask",
        "Vue.js",

        // Architecture, Data & Integration
        "NoSQL",
        "GraphQL",
        "RESTful APIs",
        "Data Mapping",
        "System Integration",

        // Infrastructure & DevOps
        "GCP",
        "Docker",
        "Linux",
        "Git",
        "CI/CD",

        // Security, Testing & Operations
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
                                    shadow="lg">
                                    <Avatar.Image
                                        src="/headshot.jpg"
                                        alt="Colby Cooper"
                                    />
                                </Avatar.Root>
                            </Flex>
                            <Flex direction="row" gap={4}>
                                <Link href="/contact" textDecoration="none">
                                    <Button colorPalette="teal">
                                        <LuMessageSquare size={18} />
                                        Get in Touch
                                    </Button>
                                </Link>
                                <Link
                                    href="/Colby Cooper's Resume.pdf"
                                    download
                                    textDecoration="none">
                                    <Button colorPalette="teal" variant="ghost">
                                        <LuDownload size={18} />
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
                            <CodeBlock.AdapterProvider value={shikiAdapter}>
                                <Tabs.Root
                                    defaultValue="sample1"
                                    variant="line"
                                    colorScheme="teal"
                                    orientation="horizontal"
                                    value={currentSample}
                                    onValueChange={(e) =>
                                        setCurrentSample(e.value)
                                    }>
                                    <Tabs.List>
                                        <Tabs.Trigger value="sample1">
                                            Hash Table
                                        </Tabs.Trigger>
                                        <Tabs.Trigger value="sample2">
                                            SQL Queries
                                        </Tabs.Trigger>
                                        <Tabs.Trigger value="sample3">
                                            ZKA Login
                                        </Tabs.Trigger>
                                        <Tabs.Trigger value="sample4">
                                            Django Views
                                        </Tabs.Trigger>
                                    </Tabs.List>
                                    <Box pt={4}>
                                        <Text fontSize="sm" color="fg.muted">
                                            {sampleDescriptions[currentSample]}
                                        </Text>
                                    </Box>
                                    <Tabs.Content value="sample1">
                                        <CodeBlock.Root
                                            code={sample1.code.toString()}
                                            language={sample1.language}>
                                            <CodeBlock.Header>
                                                <CodeBlock.Title>
                                                    <FaJava size={18} />
                                                    {sample1.title}
                                                </CodeBlock.Title>
                                            </CodeBlock.Header>
                                            <CodeBlock.Content>
                                                <Box
                                                    maxH={96}
                                                    w="100%"
                                                    overflow="auto"
                                                    overflowX={{
                                                        base: "scroll",
                                                        md: "auto",
                                                    }}>
                                                    <CodeBlock.Code>
                                                        <CodeBlock.CodeText />
                                                    </CodeBlock.Code>
                                                </Box>
                                            </CodeBlock.Content>
                                        </CodeBlock.Root>
                                    </Tabs.Content>
                                    <Tabs.Content value="sample2">
                                        <CodeBlock.Root
                                            code={sample2.code.toString()}
                                            language={sample2.language}>
                                            <CodeBlock.Header>
                                                <CodeBlock.Title>
                                                    <FaDatabase size={18} />
                                                    {sample2.title}
                                                </CodeBlock.Title>
                                            </CodeBlock.Header>
                                            <CodeBlock.Content>
                                                <Box
                                                    maxH={96}
                                                    w="100%"
                                                    overflow="auto"
                                                    overflowX={{
                                                        base: "scroll",
                                                        md: "auto",
                                                    }}>
                                                    <CodeBlock.Code>
                                                        <CodeBlock.CodeText />
                                                    </CodeBlock.Code>
                                                </Box>
                                            </CodeBlock.Content>
                                        </CodeBlock.Root>
                                    </Tabs.Content>
                                    <Tabs.Content value="sample3">
                                        <CodeBlock.Root
                                            code={sample3.code.toString()}
                                            language={sample3.language}>
                                            <CodeBlock.Header>
                                                <CodeBlock.Title>
                                                    <FaReact size={18} />
                                                    {sample3.title}
                                                </CodeBlock.Title>
                                            </CodeBlock.Header>
                                            <CodeBlock.Content>
                                                <Box
                                                    maxH={96}
                                                    w="100%"
                                                    overflow="auto"
                                                    overflowX={{
                                                        base: "scroll",
                                                        md: "auto",
                                                    }}>
                                                    <CodeBlock.Code>
                                                        <CodeBlock.CodeText />
                                                    </CodeBlock.Code>
                                                </Box>
                                            </CodeBlock.Content>
                                        </CodeBlock.Root>
                                    </Tabs.Content>
                                    <Tabs.Content value="sample4">
                                        <CodeBlock.Root
                                            code={sample4.code.toString()}
                                            language={sample4.language}>
                                            <CodeBlock.Header>
                                                <CodeBlock.Title>
                                                    <FaPython size={18} />
                                                    {sample4.title}
                                                </CodeBlock.Title>
                                            </CodeBlock.Header>
                                            <CodeBlock.Content>
                                                <Box
                                                    maxH={96}
                                                    w="100%"
                                                    overflow="auto"
                                                    overflowX={{
                                                        base: "scroll",
                                                        md: "auto",
                                                    }}>
                                                    <CodeBlock.Code>
                                                        <CodeBlock.CodeText />
                                                    </CodeBlock.Code>
                                                </Box>
                                            </CodeBlock.Content>
                                        </CodeBlock.Root>
                                    </Tabs.Content>
                                </Tabs.Root>
                            </CodeBlock.AdapterProvider>
                            <Flex direction="row" p={4} justify="center">
                                <Link
                                    href="https://github.com/col-bc"
                                    textDecoration="none"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <Button
                                        w="100%"
                                        colorPalette="teal"
                                        size="lg">
                                        <LuGithub />
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

                {/* Links */}
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
                    p={4}
                    gap={4}>
                    <Link href="/education" w="100%">
                        <Button
                            w="full"
                            colorPalette="teal"
                            size="lg"
                            px={{ base: 6, md: 12 }}>
                            <LuGraduationCap />
                            Education History
                        </Button>
                    </Link>
                    <Link href="/employment" w="100%">
                        <Button
                            w="full"
                            colorPalette="teal"
                            size="lg"
                            px={{ base: 6, md: 12 }}>
                            <LuBriefcaseBusiness />
                            Employment History
                        </Button>
                    </Link>
                </Flex>

                {/* Projects Section */}
                {/* <section id="projects">
                    <Flex direction="column" gap={8}>
                        <Heading size="2xl" textStyle="heading">
                            Personal Projects
                        </Heading>
                        <Text fontSize="lg" color="fg.muted">
                            Coming Soon
                        </Text>
                    </Flex>
                </section> */}
            </Flex>
        </Container>
    );
}
