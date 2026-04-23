/**
 * @module AccentProvider.tsx
 * @description Provides the AccentContext to its children components, allowing them to access and update the current accent color.
 */
"use client";
import { ColorSwatch, Grid, IconButton, Menu, Portal } from "@chakra-ui/react";
import Cookies from "js-cookie";
import * as React from "react";
import { JSX } from "react";
import { TbPalette } from "react-icons/tb";

// List of available colors that can be used as accent colors. This is used to validate the color input when updating the accent color.
const AVAILABLE_COLORS = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "cyan",
    "blue",
    "purple",
    "pink",
    "gray",
];

/**
 * @interface AccentContextType
 * @description Defines the shape of the AccentContext, which includes the current accent color and a function to update it.
 */
interface AccentContextType {
    color: string;
    setColor: (color: string) => void;
}

/**
 * AccentContext is a React context that holds the current accent color and a function to update it. It is used by the AccentProvider to provide these values to its children components.
 */
const AccentContext = React.createContext<AccentContextType | undefined>(
    undefined,
);

/**
 * AccentProvider component that wraps its children with AccentContext, providing the current accent color and a function to update it.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the AccentContext.
 * @return {JSX.Element} The AccentProvider component.
 */
export function AccentProvider({
    initialColor = "cyan",
    children,
}: {
    children: React.ReactNode;
    initialColor?: string;
}): JSX.Element {
    const [color, setColor] = React.useState<string>(initialColor);

    const handleChangeColor = (newColor: string) => {
        if (AVAILABLE_COLORS.includes(newColor)) {
            setColor(newColor);
            Cookies.set("accentColor", newColor, { expires: 365 });
        } else {
            console.warn(
                `Invalid color: ${newColor}. Available colors are: ${AVAILABLE_COLORS.join(
                    ", ",
                )}`,
            );
        }
    };

    const INLINE_STYLES = `
        :root {
            --color-primary-50: var(--chakra-colors-${color}-50);
            --color-primary-100: var(--chakra-colors-${color}-100);
            --color-primary-200: var(--chakra-colors-${color}-200);
            --color-primary-300: var(--chakra-colors-${color}-300);
            --color-primary-400: var(--chakra-colors-${color}-400);
            --color-primary-500: var(--chakra-colors-${color}-500);
            --color-primary-600: var(--chakra-colors-${color}-600);
            --color-primary-700: var(--chakra-colors-${color}-700);
            --color-primary-800: var(--chakra-colors-${color}-800);
            --color-primary-900: var(--chakra-colors-${color}-900);
            --color-primary-fg: var(--chakra-colors-${color}-fg, var(--chakra-colors-${color}-600));
            --color-primary-bg: var(--chakra-colors-${color}-bg, var(--chakra-colors-${color}-100));
            --color-primary-focusRing: var(--chakra-colors-${color}-focusRing, var(--chakra-colors-${color}-500));
            --color-primary-muted: var(--chakra-colors-${color}-muted, var(--chakra-colors-${color}-200));
            --color-primary-plain: var(--chakra-colors-${color}-plain, var(--chakra-colors-${color}-100));
            --color-primary-solid: var(--chakra-colors-${color}-solid, var(--chakra-colors-${color}-500));
            --color-primary-contrast: var(--chakra-colors-${color}-contrast, var(--chakra-colors-${color}-50));
            --color-primary-subtle: var(--chakra-colors-${color}-subtle, var(--chakra-colors-${color}-100));
            --color-primary-emphasized: var(--chakra-colors-${color}-emphasized, var(--chakra-colors-${color}-600));
        }
    `;

    return (
        <AccentContext.Provider value={{ color, setColor: handleChangeColor }}>
            <style suppressHydrationWarning>{INLINE_STYLES}</style>
            {children}
        </AccentContext.Provider>
    );
}

/**
 * Custom hook to access the AccentContext. Must be used within an AccentProvider.
 * @returns {AccentContextType} The current accent color and a function to update it.
 * @throws Will throw an error if used outside of an AccentProvider.
 */
export const useAccent = (): AccentContextType => {
    const context = React.useContext(AccentContext);
    if (!context) {
        throw new Error("useAccent must be used within an AccentProvider");
    }
    return context;
};

export function AccentChooserButton() {
    const { color, setColor } = useAccent();

    const handleSelectColor = (color: string) => setColor(color);
    const isCurrentColor = (c: string) => c === color;

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <IconButton
                    aria-label="Change Accent Color"
                    variant="ghost"
                    colorPalette="whiteAlpha">
                    <TbPalette size={20} />
                </IconButton>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Grid templateColumns="repeat(5, 1fr)" gap={1} mt={2}>
                            {AVAILABLE_COLORS.map((c) => (
                                <Menu.Item
                                    key={c}
                                    value={`color-swatch-${c}`}
                                    w="fit-content"
                                    h="fit-content">
                                    <IconButton
                                        aria-label={`Select ${c} accent color`}
                                        variant={
                                            isCurrentColor(c)
                                                ? "surface"
                                                : "ghost"
                                        }
                                        onClick={() => handleSelectColor(c)}
                                        size="sm"
                                        mr={2}>
                                        <ColorSwatch value={c} />
                                    </IconButton>
                                </Menu.Item>
                            ))}
                        </Grid>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
}
