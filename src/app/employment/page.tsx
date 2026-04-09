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

interface Employment {
    company: string;
    role: string;
    location: string;
    dates: [Date, Date];
    logo?: string | null;
    logoAlt?: string;
    description: string[];
}

const history: Employment[] = [
    {
        company: "Targeted Technologies",
        role: "Full Stack Engineer",
        location: "Remote",
        dates: [new Date("2021-11-01"), new Date()],
        logo: null,
        logoAlt: "Freelance Developer",
        description: [
            "Engineered responsive, secure, and accessible web applications utilizing TypeScript and Next.js, tailoring features to strict client specifications.",
            "Architected robust backend services and RESTful APIs using Python (Django/FastAPI) and SQL, applying strict database normalization to optimize data retrieval and system performance.",
            "Managed complex version control operations utilizing Git and maintained Linux-based environments, enforcing security best practices through rigorous peer code reviews.",
        ],
    },
    {
        company: "Catalyst  Brands",
        role: "Asset Protection Associate",
        location: "Metro Atlanta Area",
        dates: [new Date("2026-04-01"), new Date()],
        logo: "catalyst_brands.jpg",
        logoAlt: "Catalyst Brands Logo",
        description: [
            "Conducted comprehensive audits of inventory management and loss prevention protocols, identifying systemic vulnerabilities and implementing corrective action plans to mitigate financial risk.",
            "Executed complex investigations into internal and external theft, utilizing evidence-based interviewing techniques and collaborating with law enforcement to resolve escalations and recover assets.",
            "Maintained strict adherence to company policies and legal standards while providing exceptional customer service and support in a fast-paced retail environment.",
        ],
    },
    {
        company: "Target Corporation",
        role: "Assets Protection Specialist",
        location: "Metro Atlanta Area",
        dates: [new Date("2025-10-01"), new Date("2026-03-31")],
        logo: "/target.jpg",
        logoAlt: "Target Corporation Logo",
        description: [
            "Audited operational procedures and physical inventory data to identify systemic vulnerabilities and mitigate corporate liability.",
            "Conducted complex, high-stakes investigations requiring strict adherence to legal standards, company policy, and ethical compliance, and increased law enforcement response time by 15%.",
            "Partnered with cross-functional teams and external law enforcement to resolve security escalations and neutralize physical and financial risks.",
        ],
    },
    {
        company: "Red Dirt Equipment",
        role: "Business Analyst",
        location: "Remote, FL",
        dates: [new Date("2020-01-01"), new Date("2025-03-31")],
        logo: "/red_dirt_equipment.png",
        logoAlt: "Red Dirt Equipment Logo",
        description: [
            "Analyzed financial and operational data across sales, service, accounting, and rentals to pinpoint underperforming areas, while simultaneously managing IT systems to ensure the integrity and availability of critical business data, increasing profitability by 22%.",
            "Evaluated cross-departmental workflows to identify process gaps, designing and executing targeted action plans that improved overall organizational efficiency.",
            "Collaborated with external vendors to scope, develop, and implement customized software solutions, streamlining dealership operations and directly increasing profitability.",
        ],
    },
    {
        company: "Walmart Inc.",
        role: "Assistant Store Manager, Asset Protection",
        location: "Charlotte, NC",
        dates: [new Date("2017-06-01"), new Date("2021-11-30")],
        logo: "/walmart.webp",
        logoAlt: "Walmart Inc. Logo",
        description: [
            "Analyzed complex inventory and Point of Sale (POS) data to identify anomalous trends, directing a 25-person team to execute targeted audits that achieved a record-low 0.75% annual shrinkage rate.",
            "Investigated systemic vulnerabilities and procedural gaps, utilizing evidence-based interviewing techniques to resolve complex internal fraud cases, mitigate liability, and recover corporate assets.",
            "Engineered data-driven risk mitigation protocols and managed physical security systems, driving a 20% reduction in workplace safety incidents while ensuring strict regulatory compliance.",
        ],
    },
    {
        company: "Walmart Inc.",
        role: "Asset Protection Associate",
        location: "Duluth, GA",
        dates: [new Date("2016-07-01"), new Date("2017-06-30")],
        logo: "/walmart.webp",
        logoAlt: "Walmart Inc. Logo",
        description: [
            "Analyzed loss patterns to detect, deter, and detain bad actors, recovering merchandise and drafting highly accurate legal incident reports for prosecution.",
            "Collaborated with local law enforcement and internal teams to resolve security escalations, ensuring a safe shopping environment and minimizing financial losses.",
            "Maintained strict adherence to company policies and legal standards while providing exceptional customer service and support.",
        ],
    },
];

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

                {history.map((job) => (
                    <EmploymentItem
                        key={`${job.company}-${job.role}`}
                        {...job}
                    />
                ))}

                <ResumeCTA />
            </Flex>
        </Container>
    );
}

function EmploymentItem({
    company,
    role,
    location,
    dates,
    logo,
    logoAlt,
    description,
}: Employment) {
    function formattedDate(d: Date) {
        return d.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
        });
    }

    function elapsedTime(start: Date, end: Date) {
        const totalMonths =
            (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        return `${years > 0 ? `${years} yr${years > 1 ? "s" : ""} ` : ""}${
            months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : ""
        }`.trim();
    }

    return (
        <Card.Root
            transition="all 0.2s ease-in-out"
            _hover={{
                transform: "translateY(-4px)",
                shadow: "xl",
            }}
            variant="elevated"
            bg="bg.panel">
            <Card.Body>
                <Flex align="start" gap={4} mb={{ base: 2, md: 4 }}>
                    <Avatar.Root size="xl">
                        <Avatar.Image
                            src={logo ?? undefined}
                            alt={logoAlt ?? `${company} Logo`}
                        />
                        <Avatar.Fallback>{company[0]}</Avatar.Fallback>
                    </Avatar.Root>
                    <Flex direction="column" flexGrow={1} gap={0}>
                        <Heading size="xl" textStyle="heading">
                            {role}
                        </Heading>
                        <Text textStyle="body">
                            <Em>{company}</Em>, {location} |{" "}
                            {formattedDate(dates[0])} -{" "}
                            {formattedDate(dates[1])} (
                            {elapsedTime(dates[0], dates[1])})
                        </Text>
                    </Flex>
                </Flex>
                <List.Root textStyle="body" gap={2} pl={4}>
                    {description.map((item, index) => (
                        <List.Item key={index}>{item}</List.Item>
                    ))}
                </List.Root>
            </Card.Body>
        </Card.Root>
    );
}
