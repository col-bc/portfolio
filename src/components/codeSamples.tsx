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
    Tabs,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { TbExternalLink } from "react-icons/tb";
import { HighlighterGeneric } from "shiki";

const shikiAdapter = createShikiAdapter<HighlighterGeneric<never, never>>({
    async load() {
        const { createHighlighter } = await import("shiki");
        return createHighlighter({
            langs: ["python", "tsx", "java", "sql"],
            themes: ["ayu-dark", "github-dark"],
        });
    },
    theme: "ayu-dark",
});

export default function CodeSamples() {
    const [currentSample, setCurrentSample] = useState("sample1");
    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <CodeBlock.AdapterProvider value={shikiAdapter}>
                <Tabs.Root
                    defaultValue="sample1"
                    variant="line"
                    colorPalette="teal"
                    orientation="horizontal"
                    value={currentSample}
                    onValueChange={(e) => setCurrentSample(e.value)}>
                    <Tabs.List>
                        {Object.keys(samples).map((key) => (
                            <Tabs.Trigger key={key} value={key}>
                                {samples[key].title}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                    {Object.keys(samples).map((key) => (
                        <Tabs.Content key={key} value={key}>
                            <Box pb={4}>
                                <Text fontSize="sm" color="fg.muted">
                                    {samples[currentSample].description}
                                </Text>
                            </Box>
                            <CodeBlock.Root
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
                        </Tabs.Content>
                    ))}
                </Tabs.Root>
            </CodeBlock.AdapterProvider>
            <Dialog.Root
                open={showDialog}
                onOpenChange={(e) => setShowDialog(e.open)}
                scrollBehavior="inside"
                size={{
                    mdDown: "full",
                    md: "xl",
                }}
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
                                    {samples[currentSample].title}
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
                                        {samples[currentSample].description}
                                    </Text>
                                    <CodeBlock.AdapterProvider
                                        value={shikiAdapter}>
                                        <CodeBlock.Root
                                            display="flex"
                                            flexDirection="column"
                                            flex={1}
                                            minH={0}
                                            code={samples[
                                                currentSample
                                            ].code.toString()}
                                            language={
                                                samples[currentSample].language
                                            }>
                                            <CodeBlock.Header>
                                                <CodeBlock.Title>
                                                    {
                                                        samples[currentSample]
                                                            .icon
                                                    }
                                                    {
                                                        samples[currentSample]
                                                            .fileName
                                                    }
                                                </CodeBlock.Title>
                                            </CodeBlock.Header>
                                            <CodeBlock.Content
                                                flex={1}
                                                minH={0}>
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
                                    </CodeBlock.AdapterProvider>
                                </Flex>
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}
