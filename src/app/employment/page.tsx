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
import { Metadata } from "next";
import { TbBriefcase2 } from "react-icons/tb";

export const metadata: Metadata = {
    title: "Employment",
};

export default function Employment() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex direction="column" gap={{ base: 12, md: 16 }} as="section">
                <Flex direction="column" gap={8}>
                    <Heading size="3xl" textStyle="heading">
                        <Flex align="center" gap={4}>
                            <TbBriefcase2 size={32} />
                            Employment History
                        </Flex>
                    </Heading>
                    <Flex direction="column" gap={{ base: 8, md: 12 }}>
                        <Box>
                            <Flex align="start" gap={4} mb={2}>
                                <Avatar.Root size="xl">
                                    <Avatar.Image
                                        src="/target.jpg"
                                        alt="Target Logo"
                                    />
                                    <Avatar.Fallback>T</Avatar.Fallback>
                                </Avatar.Root>
                                <Flex direction="column" flexGrow={1} gap={0}>
                                    <Heading size="xl" textStyle="heading">
                                        Assets Protection Specialist
                                    </Heading>
                                    <Text>
                                        <Em>Target Corporation</Em>, Metro
                                        Atlanta Area | Oct 2025 - March 2026
                                    </Text>
                                </Flex>
                            </Flex>
                            <List.Root textStyle="body" gap={2} pl={4}>
                                <List.Item>
                                    Audited operational procedures and physical
                                    inventory data to identify systemic
                                    vulnerabilities and mitigate corporate
                                    liability.
                                </List.Item>
                                <List.Item>
                                    Conducted complex, high-stakes
                                    investigations requiring strict adherence to
                                    legal standards, company policy, and ethical
                                    compliance.
                                </List.Item>
                                <List.Item>
                                    Partnered with cross-functional teams and
                                    external law enforcement to resolve security
                                    escalations and neutralize physical and
                                    financial risks.
                                </List.Item>
                            </List.Root>
                        </Box>
                        <Box>
                            <Flex align="start" gap={4} mb={2}>
                                <Avatar.Root size="xl">
                                    <Avatar.Image
                                        src="/red_dirt_equipment.png"
                                        alt="Red Dirt Equipment Logo"
                                    />
                                    <Avatar.Fallback>R</Avatar.Fallback>
                                </Avatar.Root>
                                <Flex direction="column" flexGrow={1} gap={0}>
                                    <Heading size="xl" textStyle="heading">
                                        Systems Analyst
                                    </Heading>
                                    <Text>
                                        <Em>Red Dirt Equipment</Em>, Marianna,
                                        FL | Jan 2020 -Mar 2025
                                    </Text>
                                </Flex>
                            </Flex>
                            <List.Root textStyle="body" gap={2} pl={4}>
                                <List.Item>
                                    Translated complex business requirements
                                    into scalable technical solutions, improving
                                    overall system efficiency and company
                                    profitability.
                                </List.Item>
                                <List.Item>
                                    Architected, developed, and maintained
                                    critical software infrastructure, providing
                                    cross-functional technical support and
                                    system troubleshooting.
                                </List.Item>
                                <List.Item>
                                    Created comprehensive technical
                                    documentation and conducted user training to
                                    ensure seamless adoption of new software
                                    systems and updates.
                                </List.Item>
                            </List.Root>
                        </Box>
                        <Box>
                            <Flex align="start" gap={4} mb={2}>
                                <Avatar.Root size="xl">
                                    <Avatar.Fallback>C</Avatar.Fallback>
                                </Avatar.Root>
                                <Flex direction="column" flexGrow={1} gap={0}>
                                    <Heading size="xl" textStyle="heading">
                                        Full Stack Developer
                                    </Heading>
                                    <Text>
                                        <Em>Confidential</Em>, Remote | Nov 2021
                                        - Present
                                    </Text>
                                </Flex>
                            </Flex>
                            <List.Root textStyle="body" gap={2} pl={4}>
                                <List.Item>
                                    Engineered responsive, secure, and
                                    accessible web applications tailored to
                                    strict client specifications and business
                                    requirements.
                                </List.Item>
                                <List.Item>
                                    Maintained modern security standards and
                                    development best practices through proactive
                                    code updates, dependency management, and
                                    peer code reviews.
                                </List.Item>
                                <List.Item>
                                    Utilized Git version control to manage
                                    complex codebases and facilitate seamless
                                    collaboration across distributed teams.
                                </List.Item>
                            </List.Root>
                        </Box>
                        <Box>
                            <Flex align="start" gap={4} mb={2}>
                                <Avatar.Root size="xl">
                                    <Avatar.Image
                                        src="/walmart.webp"
                                        alt="Walmart Logo"
                                    />
                                    <Avatar.Fallback>W</Avatar.Fallback>
                                </Avatar.Root>
                                <Flex direction="column" flexGrow={1} gap={0}>
                                    <Heading size="xl" textStyle="heading">
                                        Asset Protection Assistant Store Manager
                                    </Heading>
                                    <Text>
                                        <Em>Walmart Inc.</Em>, Charlotte, NC |
                                        Jun 2017 - Nov 2021
                                    </Text>
                                </Flex>
                            </Flex>
                            <List.Root textStyle="body" gap={2} pl={4}>
                                <List.Item>
                                    Directed a 25-person risk management team,
                                    optimizing store profitability and achieving
                                    a record-low 0.75% annual shrinkage rate
                                    through data-driven operational audits.
                                </List.Item>
                                <List.Item>
                                    Managed the full employee lifecycle for the
                                    department, including recruiting, coaching,
                                    and performance management to exceed
                                    high-level corporate metrics.
                                </List.Item>
                                <List.Item>
                                    Developed and implemented comprehensive
                                    safety and security protocols, resulting in
                                    a 20% reduction in workplace incidents and
                                    ensuring strict regulatory compliance.
                                </List.Item>
                            </List.Root>
                        </Box>
                        <Box>
                            <Flex align="start" gap={4} mb={2}>
                                <Avatar.Root size="xl">
                                    <Avatar.Image
                                        src="/walmart.webp"
                                        alt="Walmart Logo"
                                    />
                                    <Avatar.Fallback>W</Avatar.Fallback>
                                </Avatar.Root>
                                <Flex direction="column" flexGrow={1} gap={0}>
                                    <Heading size="xl" textStyle="heading">
                                        Asset Protection Associate
                                    </Heading>
                                    <Text>
                                        <Em>Walmart Inc.</Em>, Duluth, GA | May
                                        2017 - Jun 2017
                                    </Text>
                                </Flex>
                            </Flex>
                            <List.Root textStyle="body" gap={2} pl={4}>
                                <List.Item>
                                    Analyzed loss patterns to detect, deter, and
                                    detain bad actors, recovering merchandise
                                    and drafting highly accurate legal incident
                                    reports for prosecution.
                                </List.Item>
                                <List.Item>
                                    Collaborated with local law enforcement and
                                    internal teams to resolve security
                                    escalations, ensuring a safe shopping
                                    environment and minimizing financial losses.
                                </List.Item>
                                <List.Item>
                                    Maintained strict adherence to company
                                    policies and legal standards while providing
                                    exceptional customer service and support.
                                </List.Item>
                            </List.Root>
                        </Box>
                    </Flex>
                </Flex>

                <ResumeCTA />
            </Flex>
        </Container>
    );
}
