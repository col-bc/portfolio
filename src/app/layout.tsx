import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { ThemeProvider } from "@/theme";
import { Box, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Fira_Code, Geist, Roboto_Flex } from "next/font/google";
import Script from "next/script";

const headingFont = Geist({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-heading",
    display: "swap",
});

const bodyFont = Roboto_Flex({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

const monoFont = Fira_Code({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        template: "%s | Colby Cooper",
        default: "Colby Cooper",
    },
    description: "Technical Problem-Solver & Developer",
    metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props;
    return (
        <html
            suppressHydrationWarning={true}
            lang="en"
            className={`${headingFont.className} ${bodyFont.className} ${monoFont.className}`}>
            <head>
                <style>
                    {`:root {
                        --font-heading: ${headingFont.style.fontFamily};
                        --font-body: ${bodyFont.style.fontFamily};
                        --font-mono: ${monoFont.style.fontFamily};
                    }`}
                </style>
                {/* <!-- Google Tag Manager --> */}
                <Script id="gtm-script">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MPF8HZ39');`}</Script>
                {/* <!-- End Google Tag Manager --> */}
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <ColorModeProvider>
                    <ThemeProvider>
                        <Flex
                            direction="column"
                            textStyle="body"
                            minH="100vh"
                            maxW="100vw"
                            bg="bg"
                            position="relative"
                            zIndex={0}>
                            <Box
                                position="absolute"
                                top="10%"
                                left="-10%"
                                w="50vw"
                                h="50vw"
                                maxW="600px"
                                maxH="600px"
                                borderRadius="50%"
                                bg="cyan.focusRing/15"
                                filter="blur(140px)"
                                pointerEvents="none"
                                zIndex={0}
                            />

                            <Container
                                maxW="4xl"
                                py={2}
                                as="header"
                                w="100%"
                                position="relative"
                                zIndex={1}>
                                <Link
                                    href="/"
                                    _hover={{ textDecoration: "none" }}
                                    w="fit"
                                    display="flex"
                                    flexDir="column"
                                    alignItems="start">
                                    <Heading
                                        textStyle="heading"
                                        fontSize="4xl"
                                        textDecoration="underline"
                                        textDecorationColor="cyan.focusRing"
                                        textDecorationStyle="wavy"
                                        textUnderlineOffset={6}
                                        m={0}>
                                        Colby Cooper
                                    </Heading>
                                    <Text
                                        fontSize="lg"
                                        color="fg.muted"
                                        fontWeight={500}
                                        mb={2}>
                                        Technical Problem-Solver & Developer
                                    </Text>
                                </Link>
                            </Container>
                            <Navbar />
                            <Flex
                                direction="column"
                                flexGrow={1}
                                as="main"
                                w="100%"
                                mb={6}
                                overflowX="hidden"
                                overflowY="auto">
                                {children}
                            </Flex>
                            <Footer />
                        </Flex>
                    </ThemeProvider>
                </ColorModeProvider>
                {/* <!-- Google tag (gtag.js) --> */}
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-CBL0YRB69Y"></Script>
                <Script id="gtag-script">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-CBL0YRB69Y');
                    `}
                </Script>
                {/* <!-- End Google tag (gtag.js) --> */}
                {/* <!-- Google Tag Manager (noscript) --> */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-MPF8HZ39"
                        height="0"
                        width="0"></iframe>
                </noscript>
                {/* <!-- End Google Tag Manager (noscript) --> */}
            </body>
        </html>
    );
}
