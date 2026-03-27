import ContactForm from "@/components/contactForm";
import { Button, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import {
    TbBrandGithub,
    TbBrandLinkedin,
    TbBrandUpwork,
    TbMessage,
} from "react-icons/tb";
export default function Contact() {
    return (
        <Container maxW="4xl" py={{ base: 6, md: 8 }}>
            <Flex direction="column" gap={{ base: 8, md: 12 }} as="section">
                <Heading size="3xl" textStyle="heading">
                    <Flex align="center" gap={4}>
                        <TbMessage size={32} />
                        Get in Touch
                    </Flex>
                </Heading>

                <Flex
                    direction="row"
                    bg="bg.muted"
                    p={6}
                    justify="center"
                    gap={3}
                    borderRadius="md">
                    <Flex direction="column" gap={4} flex={1} maxW="lg">
                        <Text fontSize="md" mx="auto">
                            I am currently exploring full-time opportunities in
                            software engineering, systems integration, and
                            technical risk analysis. Whether you are looking to
                            secure your digital infrastructure, optimize your
                            data pipelines, or simply want to connect, my inbox
                            is always open
                        </Text>
                        <Heading
                            size="lg"
                            textAlign="center"
                            textStyle="subheading">
                            Find me on these platforms
                        </Heading>
                        <Flex direction="row" justify="center" gap={6} w="100%">
                            <Link
                                href="https://www.linkedin.com/in/colbycooper/"
                                target="_blank"
                                rel="noopener noreferrer"
                                textDecoration="none">
                                <Button colorPalette="teal">
                                    <TbBrandLinkedin />
                                </Button>
                            </Link>
                            <Link
                                href="https://www.github.com/col-bc"
                                target="_blank"
                                rel="noopener noreferrer"
                                textDecoration="none">
                                <Button colorPalette="teal">
                                    <TbBrandGithub />
                                </Button>
                            </Link>
                            <Link
                                href="https://www.upwork.com/freelancers/~01bbbe06071be625f4?mp_source=portfolio"
                                target="_blank"
                                rel="noopener noreferrer"
                                textDecoration="none">
                                <Button colorPalette="teal">
                                    <TbBrandUpwork />
                                </Button>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
                <ContactForm />
            </Flex>
        </Container>
    );
}
