"use client";

import {
    Box,
    Button,
    CloseButton,
    Field,
    FileUpload,
    Flex,
    Input,
    InputGroup,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { TbFileUpload } from "react-icons/tb";

export function ResumeForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        const file = formData.get("resume") as File | null;
        if (!file) return;

        const response = await fetch("/api/resume", {
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            router.refresh();
        } else {
            console.error("Failed to upload resume:", response.statusText);
            setError("Failed to upload resume.");
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            {error && (
                <Box mb={4} color="red">
                    {error}
                </Box>
            )}
            <Field.Root>
                <FileUpload.Root maxFiles={1} mb={6}>
                    <Field.Label h="fit-content">Upload New Resume</Field.Label>
                    <Flex align="center" w="full" gap={4}>
                        <InputGroup
                            flex={1}
                            w="full"
                            startElement={<TbFileUpload />}
                            endElement={
                                <FileUpload.ClearTrigger asChild>
                                    <CloseButton
                                        me="-1"
                                        size="xs"
                                        variant="plain"
                                        focusVisibleRing="inside"
                                        focusRingWidth="2px"
                                        pointerEvents="auto"
                                    />
                                </FileUpload.ClearTrigger>
                            }>
                            <Input asChild>
                                <FileUpload.Trigger>
                                    <FileUpload.FileText lineClamp={1} />
                                </FileUpload.Trigger>
                            </Input>
                        </InputGroup>
                        <Button type="submit" colorPalette="teal">
                            Change Resume
                        </Button>
                    </Flex>
                    <FileUpload.HiddenInput
                        name="resume"
                        accept="application/pdf"
                    />
                    <FileUpload.List />
                </FileUpload.Root>
            </Field.Root>
        </form>
    );
}
