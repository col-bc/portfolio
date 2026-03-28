import ResumeCTA from "@/components/resumeCta";
import {
    Avatar,
    Card,
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

function EmploymentItem({
    company,
    role,
    location,
    dates,
    logo,
    children,
}: {
    company: string;
    role: string;
    location: string;
    dates: string;
    logo: string;
    children: React.ReactNode;
}) {
    return (
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
                        <Avatar.Image src={logo} alt={`${company} Logo`} />
                        <Avatar.Fallback>{company[0]}</Avatar.Fallback>
                    </Avatar.Root>
                    <Flex direction="column" flexGrow={1} gap={0}>
                        <Heading size="xl" textStyle="heading">
                            {role}
                        </Heading>
                        <Text textStyle="body">
                            <Em>{company}</Em>, {location} | {dates}
                        </Text>
                    </Flex>
                </Flex>
                <List.Root textStyle="body" gap={2} pl={4}>
                    {children}
                </List.Root>
            </Card.Body>
        </Card.Root>
    );
}

export default function Employment() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex
                direction="column"
                gap={{ base: 8, md: 12, lg: 16 }}
                as="section">
                <Heading size="3xl" textStyle="heading">
                    <Flex align="center" gap={4}>
                        <TbBriefcase2 size={32} />
                        Employment History
                    </Flex>
                </Heading>

                <EmploymentItem
                    company="Target Corporation"
                    role="Assets Protection Specialist"
                    location="Metro Atlanta Area"
                    dates="Oct 2025 - March 2026"
                    logo="/target.jpg">
                    <List.Item>
                        Audited operational procedures and physical inventory
                        data to identify systemic vulnerabilities and mitigate
                        corporate liability.
                    </List.Item>
                    <List.Item>
                        Conducted complex, high-stakes investigations requiring
                        strict adherence to legal standards, company policy, and
                        ethical compliance.
                    </List.Item>
                    <List.Item>
                        Partnered with cross-functional teams and external law
                        enforcement to resolve security escalations and
                        neutralize physical and financial risks.
                    </List.Item>
                </EmploymentItem>

                <EmploymentItem
                    company="Red Dirt Equipment"
                    role="Systems Analyst"
                    location="Remote, FL"
                    dates="Jan 2020 - Mar 2025"
                    logo="/red_dirt_equipment.png">
                    <List.Item>
                        Analyzed and optimized system workflows to improve
                        operational efficiency and data integrity.
                    </List.Item>
                    <List.Item>
                        Developed and maintained software solutions to support
                        business processes and reporting needs.
                    </List.Item>
                    <List.Item>
                        Collaborated with cross-functional teams to implement
                        technology solutions that align with organizational
                        goals.
                    </List.Item>
                </EmploymentItem>

                <EmploymentItem
                    company="Confidential"
                    role="Full Stack Developer"
                    location="Remote"
                    dates="Nov 2021 - Present"
                    logo="/confidential.png">
                    <List.Item>
                        Engineered responsive, secure, and accessible web
                        applications tailored to strict client specifications
                        and business requirements.
                    </List.Item>
                    <List.Item>
                        Maintained modern security standards and development
                        best practices through proactive code updates,
                        dependency management, and peer code reviews.
                    </List.Item>
                    <List.Item>
                        Utilized Git version control to manage complex codebases
                        and facilitate seamless collaboration across distributed
                        teams.
                    </List.Item>
                </EmploymentItem>

                <EmploymentItem
                    company="Walmart Inc."
                    role="Asset Protection Assistant Store Manager"
                    location="Charlotte, NC"
                    dates="Jun 2017 - Nov 2021"
                    logo="/walmart.webp">
                    <List.Item>
                        Directed a 25-person risk management team, optimizing
                        store profitability and achieving a record-low 0.75%
                        annual shrinkage rate through data-driven operational
                        audits.
                    </List.Item>
                    <List.Item>
                        Managed the full employee lifecycle for the department,
                        including recruiting, coaching, and performance
                        management to exceed high-level corporate metrics.
                    </List.Item>
                    <List.Item>
                        Developed and implemented comprehensive safety and
                        security protocols, resulting in a 20% reduction in
                        workplace incidents and ensuring strict regulatory
                        compliance.
                    </List.Item>
                </EmploymentItem>

                <EmploymentItem
                    company="Walmart Inc."
                    role="Asset Protection Associate"
                    location="Duluth, GA"
                    dates="Jul 2016 - Jun 2017"
                    logo="/walmart.webp">
                    <List.Item>
                        Analyzed loss patterns to detect, deter, and detain bad
                        actors, recovering merchandise and drafting highly
                        accurate legal incident reports for prosecution.
                    </List.Item>
                    <List.Item>
                        Collaborated with local law enforcement and internal
                        teams to resolve security escalations, ensuring a safe
                        shopping environment and minimizing financial losses.
                    </List.Item>
                    <List.Item>
                        Maintained strict adherence to company policies and
                        legal standards while providing exceptional customer
                        service and support.
                    </List.Item>
                </EmploymentItem>

                <ResumeCTA />
            </Flex>
        </Container>
    );
}
