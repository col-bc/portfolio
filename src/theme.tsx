"use client";

import {
    ChakraProvider,
    createSystem,
    defaultConfig,
    defineConfig,
    defineTextStyles,
} from "@chakra-ui/react";

const typography = defineTextStyles({
    body: {
        value: {
            fontFamily: "var(--font-body)",
            fontSize: "md",
        },
    },
    heading: {
        value: {
            fontFamily: "var(--font-heading)",
            fontWeight: "bold",
            lineHeight: "short",
        },
    },
    code: {
        value: {
            fontFamily: "var(--font-mono)",
            fontSize: "xs",
        },
    },
});

const config = defineConfig({
    theme: {
        tokens: {
            colors: {},
            fonts: {
                heading: { value: "var(--font-heading)" },
                body: { value: "var(--font-body)" },
                mono: { value: "var(--font-mono)" },
            },
        },
        textStyles: { ...typography },
    },
});

export const system = createSystem(defaultConfig, config);

export function ThemeProvider(props: { children: React.ReactNode }) {
    const { children } = props;
    return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
