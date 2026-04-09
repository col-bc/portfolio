"use client";

import {
    ChakraProvider,
    createSystem,
    defaultConfig,
    defineConfig,
    defineRecipe,
    defineSlotRecipe,
    defineTextStyles,
} from "@chakra-ui/react";

const tactileAnimations = {
    transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
    _hover: {
        translate: "0 -2px",
    },
    _active: {
        scale: "0.95 !important",
    },
};

const buttonRecipe = defineRecipe({
    base: {},

    variants: {
        variant: {
            solid: tactileAnimations,
            outline: tactileAnimations,
            surface: tactileAnimations,
        },
    },
});

const dialogRecipe = defineSlotRecipe({
    base: {
        content: {
            _open: {
                animation:
                    "slideUpEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            },
            _closed: {
                animation:
                    "slideUpExit 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            },
        },
        backdrop: {
            _open: { animation: "fadeEnter 0.4s ease-out forwards" },
            _closed: { animation: "fadeExit 0.3s ease-in forwards" },
        },
    },
    slots: [],
});

const typography = defineTextStyles({
    body: {
        value: {
            fontFamily: "var(--font-body)",
            fontSize: "md",
            lineHeight: "tall",
            color: "fg.muted",
        },
    },
    heading: {
        value: {
            fontFamily: "var(--font-heading)",
            fontWeight: "bold",
            lineHeight: "short",
            color: "fg",
        },
    },
    code: {
        value: {
            fontFamily: "var(--font-mono)",
            fontSize: "xs",
            lineHeight: "short",
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
        semanticTokens: {
            radii: {
                l1: { value: "{radii.lg}" },
                l2: { value: "{radii.xl}" },
                l3: { value: "{radii.2xl}" },
            },
            shadows: {
                panel: { value: "0 1px 2px rgba(0, 0, 0, 0.05)" },
                elevated: { value: "0 4px 6px rgba(0, 0, 0, 0.1)" },
            },
        },
        keyframes: {
            slideUpEnter: {
                "0%": {
                    opacity: 0,
                    transform: "translateY(24px) scale(0.98)",
                },
                "100%": {
                    opacity: 1,
                    transform: "translateY(0) scale(1)",
                },
            },
            slideUpExit: {
                "0%": {
                    opacity: 1,
                    transform: "translateY(0) scale(1)",
                },
                "100%": {
                    opacity: 0,
                    transform: "translateY(24px) scale(0.98)",
                },
            },
            fadeEnter: {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 },
            },
            fadeExit: {
                "0%": { opacity: 1 },
                "100%": { opacity: 0 },
            },
        },
        textStyles: { ...typography },
        slotRecipes: { dialog: dialogRecipe },
        recipes: { button: buttonRecipe },
    },
});

export const system = createSystem(defaultConfig, config);

export function ThemeProvider(props: { children: React.ReactNode }) {
    const { children } = props;
    return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
