import ContactForm from "@/components/contactForm";
import ResumeCTA from "@/components/resumeCta";
import { Container, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Metadata } from "next";
import NextLink from "next/link";
import {
    TbBrandGithub,
    TbBrandLinkedin,
    TbBrandUpwork,
    TbMessage,
} from "react-icons/tb";

export const metadata: Metadata = {
    title: "Contact",
};

export default function Contact() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex
                direction="column"
                gap={{ base: 8, md: 12, lg: 16 }}
                as="section">
                <Heading size="3xl" textStyle="heading">
                    <Flex align="center" gap={4}>
                        <TbMessage size={32} />
                        Get in Touch
                    </Flex>
                </Heading>

                <Flex
                    direction="column"
                    bg="bg.subtle"
                    p={6}
                    align="center"
                    borderRadius="md">
                    <Flex direction="column" gap={4} flex={1} maxW="lg">
                        <Heading size="md" textStyle="heading">
                            Let&apos;s Connect
                        </Heading>
                        <Text>
                            I am currently exploring full-time opportunities in
                            software engineering, systems integration, and
                            technical risk analysis. Whether you are looking to
                            secure your digital infrastructure, optimize your
                            data pipelines, or simply want to connect, my inbox
                            is always open
                        </Text>
                        <Heading
                            size="sm"
                            textStyle="heading"
                            textAlign="center">
                            Find me on these platforms
                        </Heading>
                        <Flex
                            direction="row"
                            align="center"
                            justify="center"
                            gap={6}
                            w="100%">
                            <NextLink
                                href="https://www.linkedin.com/in/colbycooper/"
                                target="_blank"
                                rel="noopener noreferrer">
                                <IconButton colorPalette="teal" size="lg">
                                    <TbBrandLinkedin />
                                </IconButton>
                            </NextLink>
                            <NextLink
                                href="https://www.github.com/col-bc"
                                target="_blank"
                                rel="noopener noreferrer">
                                <IconButton colorPalette="teal" size="lg">
                                    <TbBrandGithub />
                                </IconButton>
                            </NextLink>
                            <NextLink
                                href="https://www.upwork.com/freelancers/~01bbbe06071be625f4?mp_source=portfolio"
                                target="_blank"
                                rel="noopener noreferrer">
                                <IconButton colorPalette="teal" size="lg">
                                    <TbBrandUpwork />
                                </IconButton>
                            </NextLink>
                        </Flex>
                    </Flex>
                </Flex>

                <ContactForm />

                <ResumeCTA />
            </Flex>
        </Container>
    );
}
