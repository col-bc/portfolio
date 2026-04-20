"use client";

import samples from "@/app/lib/codeSamples";
import { Tooltip } from "@/components/ui/tooltip";
import {
    Box,
    CloseButton,
    CodeBlock,
    createShikiAdapter,
    Dialog,
    Flex,
    IconButton,
    Portal,
    Skeleton,
    Tabs,
    Text,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { TbExternalLink } from "react-icons/tb";
import { HighlighterGeneric } from "shiki";
import { useAccent } from "./accentProvider";
import { useColorMode } from "./ui/color-mode";

/**
 * Loads the Shiki highlighter with the specified languages and themes.
 * @returns {Promise<HighlighterGeneric>} A promise that resolves to the Shiki highlighter instance.
 */
const loadShiki = async () => {
    const { createHighlighter } = await import("shiki");
    return createHighlighter({
        langs: ["python", "tsx", "java", "sql"],
        themes: ["ayu-dark", "ayu-light"],
    });
};

export default function CodeSamples() {
    const [mounted, setMounted] = useState(false);
    const [currentSample, setCurrentSample] = useState("sample1");
    const [showDialog, setShowDialog] = useState(false);
    const { colorMode } = useColorMode();
    const { color } = useAccent();
    console.debug("[DEBUG[] Accent Color in CodeSamples:", color);

    /**
     * Set the component as mounted to ensure that the Shiki highlighter is only loaded on the client side, preventing hydration issues with server-side rendering.
     */
    useEffect(() => {
        setMounted(true);
    }, []);

    /**
     * Memoize the Shiki adapter to avoid unnecessary re-renders and re-initializations of the highlighter when the color mode changes. The adapter is configured to load the Shiki highlighter with the appropriate theme based on the current color mode (dark or light).
     */
    const shikiAdapter = useMemo(() => {
        return createShikiAdapter<HighlighterGeneric<never, never>>({
            load: loadShiki,
            theme: colorMode === "dark" ? "ayu-dark" : "ayu-light",
        });
    }, [colorMode]);

    const sampleKeys = useMemo(() => Object.keys(samples), []);
    const activeSampleData = samples[currentSample];

    if (!mounted) {
        return <Skeleton height="400px" width="100%" />;
    }

    return (
        <CodeBlock.AdapterProvider value={shikiAdapter}>
            <Tabs.Root
                defaultValue="sample1"
                variant="enclosed"
                colorPalette="primary"
                orientation="horizontal"
                value={currentSample}
                onValueChange={(e) => setCurrentSample(e.value)}>
                <Tabs.List
                    overflowX="auto"
                    overflowY="hidden"
                    display="flex"
                    flexDirection="row"
                    gap={{ base: 2, md: 4 }}
                    w="100%"
                    border="1px solid"
                    borderColor="border"
                    borderRadius="xl">
                    {sampleKeys.map((key) => (
                        <Tabs.Trigger
                            key={key}
                            value={key}
                            whiteSpace="nowrap"
                            flexShrink={0}>
                            {samples[key].title}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                {sampleKeys.map((key) => (
                    <Tabs.Content key={key} value={key}>
                        <Box pb={4}>
                            <Text fontSize="sm" color="fg.muted">
                                {samples[key].description}
                            </Text>
                        </Box>

                        {currentSample === key && (
                            <CodeBlock.Root
                                meta={{
                                    colorScheme:
                                        colorMode === "dark"
                                            ? "ayu-dark"
                                            : "ayu-light",
                                }}
                                borderRadius="xl"
                                code={samples[key].code.toString()}
                                language={samples[key].language}>
                                <CodeBlock.Header>
                                    <CodeBlock.Title>
                                        {samples[key].icon}
                                        {samples[key].fileName}
                                    </CodeBlock.Title>
                                    <Box p={1}>
                                        <Tooltip content="Expand Code Sample">
                                            <IconButton
                                                variant="ghost"
                                                size="sm"
                                                aria-label="Expand Code Sample"
                                                onClick={() =>
                                                    setShowDialog(true)
                                                }>
                                                <TbExternalLink />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </CodeBlock.Header>
                                <CodeBlock.Content>
                                    <Box
                                        maxH={96}
                                        w="100%"
                                        overflow="auto"
                                        overflowX={{
                                            base: "scroll",
                                            md: "auto",
                                        }}>
                                        <CodeBlock.Code>
                                            <CodeBlock.CodeText />
                                        </CodeBlock.Code>
                                    </Box>
                                </CodeBlock.Content>
                            </CodeBlock.Root>
                        )}
                    </Tabs.Content>
                ))}
            </Tabs.Root>

            <Dialog.Root
                open={showDialog}
                onOpenChange={(e) => setShowDialog(e.open)}
                scrollBehavior="inside"
                size={{ mdDown: "full", md: "xl" }}
                placement="center"
                motionPreset="slide-in-bottom">
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content
                            h="100dvh"
                            maxH="100dvh"
                            overflow="hidden"
                            display="flex"
                            flexDirection="column">
                            <Dialog.Header>
                                <Dialog.Title textStyle="heading">
                                    {activeSampleData.title}
                                </Dialog.Title>
                                <Dialog.CloseTrigger asChild>
                                    <CloseButton
                                        size="sm"
                                        onClick={() => setShowDialog(false)}
                                    />
                                </Dialog.CloseTrigger>
                            </Dialog.Header>
                            <Dialog.Body flex="1" minH={0} overflow="hidden">
                                <Flex direction="column" h="full" minH={0}>
                                    <Text textStyle="body" mb={4}>
                                        {activeSampleData.description}
                                    </Text>

                                    {/* No redundant AdapterProvider needed here anymore */}
                                    <CodeBlock.Root
                                        display="flex"
                                        flexDirection="column"
                                        flex={1}
                                        minH={0}
                                        code={activeSampleData.code.toString()}
                                        language={activeSampleData.language}
                                        meta={{
                                            colorScheme:
                                                colorMode === "dark"
                                                    ? "ayu-dark"
                                                    : "ayu-light",
                                        }}>
                                        <CodeBlock.Header>
                                            <CodeBlock.Title>
                                                {activeSampleData.icon}
                                                {activeSampleData.fileName}
                                            </CodeBlock.Title>
                                        </CodeBlock.Header>
                                        <CodeBlock.Content flex={1} minH={0}>
                                            <Box
                                                h="full"
                                                w="full"
                                                overflow="auto">
                                                <CodeBlock.Code>
                                                    <CodeBlock.CodeText />
                                                </CodeBlock.Code>
                                            </Box>
                                        </CodeBlock.Content>
                                    </CodeBlock.Root>
                                </Flex>
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </CodeBlock.AdapterProvider>
    );
}
