import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { ThemeProvider } from "@/theme";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Inter, Lexend, Source_Code_Pro } from "next/font/google";
import Script from "next/script";

const headingFont = Lexend({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-heading",
    display: "swap",
});

const bodyFont = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

const monoFont = Source_Code_Pro({
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
                    {`
                :root {
                    --font-heading: ${headingFont.style.fontFamily};
                    --font-body: ${bodyFont.style.fontFamily};
                    --font-mono: ${monoFont.style.fontFamily};
                }
            `}
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
                            bg="bg.panel">
                            <Container maxW="4xl" py={2} as="header" w="100%">
                                <Heading
                                    textStyle="heading"
                                    fontSize="4xl"
                                    textDecoration="underline"
                                    textDecorationColor="teal"
                                    textDecorationStyle="wavy"
                                    m={0}>
                                    Colby Cooper
                                </Heading>
                                <Text fontSize="lg" color="fg.muted">
                                    Technical Problem-Solver & Developer
                                </Text>
                            </Container>
                            <Navbar />
                            <Box
                                flexGrow={1}
                                as="main"
                                w="100%"
                                mb={6}
                                overflowX="hidden"
                                overflowY="auto">
                                {children}
                            </Box>
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
