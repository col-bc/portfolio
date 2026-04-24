"use client";

import type { IconButtonProps, SpanProps } from "@chakra-ui/react";
import {
    ClientOnly,
    IconButton,
    Menu,
    Portal,
    Skeleton,
    Span,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider, useTheme } from "next-themes";
import * as React from "react";
import { TbDeviceDesktop, TbMoonStars, TbSunHigh } from "react-icons/tb";

export type ColorModeProviderProps = ThemeProviderProps;

export function ColorModeProvider(props: ColorModeProviderProps) {
    return (
        <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
    );
}

export type ColorMode = "light" | "dark" | "system";

export interface UseColorModeReturn {
    colorMode: ColorMode;
    setColorMode: (colorMode: ColorMode) => void;
    toggleColorMode: (colorMode: ColorMode) => void;
}

export function useColorMode(): UseColorModeReturn {
    const { resolvedTheme, setTheme, forcedTheme } = useTheme();
    const colorMode = forcedTheme || resolvedTheme;
    const toggleColorMode = (val: ColorMode) => {
        setTheme(val);
        Cookies.set("themePreference", val, { expires: 365 });
    };
    return {
        colorMode: colorMode as ColorMode,
        setColorMode: setTheme,
        toggleColorMode,
    };
}

export function useColorModeValue<T>(light: T, dark: T) {
    const { colorMode } = useColorMode();
    return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
    const { colorMode } = useColorMode();
    return colorMode === "system" ? (
        <TbDeviceDesktop />
    ) : colorMode === "light" ? (
        <TbSunHigh />
    ) : (
        <TbMoonStars />
    );
}

type ColorModeButtonProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeButton = React.forwardRef<
    HTMLButtonElement,
    ColorModeButtonProps
>(function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode();
    return (
        <ClientOnly fallback={<Skeleton boxSize="9" />}>
            <Menu.Root>
                <Menu.Trigger asChild>
                    <IconButton
                        variant="ghost"
                        aria-label="Toggle color mode"
                        ref={ref}
                        {...props}
                        css={{
                            _icon: {
                                width: "5",
                                height: "5",
                            },
                        }}>
                        <ColorModeIcon />
                    </IconButton>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item
                                value="lightMode"
                                onClick={() => toggleColorMode("light")}>
                                <TbSunHigh />
                                Light Theme
                            </Menu.Item>
                            <Menu.Item
                                value="darkMode"
                                bg={"useDark" in window ? "red.500" : undefined}
                                onClick={() => toggleColorMode("dark")}>
                                <TbMoonStars />
                                Dark Theme
                            </Menu.Item>
                            <Menu.Item
                                value="systemMode"
                                onClick={() => toggleColorMode("system")}>
                                <TbDeviceDesktop />
                                Match System
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </ClientOnly>
    );
});

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(
    function LightMode(props, ref) {
        return (
            <Span
                color="fg"
                display="contents"
                className="chakra-theme light"
                colorPalette="gray"
                colorScheme="light"
                ref={ref}
                {...props}
            />
        );
    },
);

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(
    function DarkMode(props, ref) {
        return (
            <Span
                color="fg"
                display="contents"
                className="chakra-theme dark"
                colorPalette="gray"
                colorScheme="dark"
                ref={ref}
                {...props}
            />
        );
    },
);
