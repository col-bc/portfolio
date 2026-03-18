"use client";
import { handleAuthAttempt, handleVerifyOtp } from "@/app/lib/handleAuth";
import {
    Alert,
    Box,
    Button,
    Field,
    Flex,
    FlexProps,
    Input,
    PinInput,
    Text,
} from "@chakra-ui/react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";
import { PasswordInput } from "./ui/password-input";

export default function AuthForm({ ...rest }: FlexProps) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [step, setStep] = useState<"auth" | "otp">("auth");
    const [otp, setOtp] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const turnstileRef = useRef<TurnstileInstance | null>(null);

    function updateOtp(next: string) {
        const sanitized = next.replace(/\D/g, "").slice(0, 6);
        setOtp((prev) => (prev === sanitized ? prev : sanitized));
    }

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        if (isSubmitting) return;
        setError(null);
        if (!turnstileToken) {
            setError("Please complete the CAPTCHA challenge.");
            return;
        }
        setIsSubmitting(true);
        try {
            await handleAuthAttempt({ username, password, turnstileToken });
            setTurnstileToken(null);
            setStep("otp");
        } catch {
            setError("Invalid username or password.");
        } finally {
            setIsSubmitting(false);
            setUsername("");
            setPassword("");
            setOtp("");
            setTurnstileToken(null);
            turnstileRef.current?.reset();
        }
    }

    async function handleVerify(e: React.SubmitEvent) {
        e.preventDefault();
        if (isSubmitting) return;
        setError(null);
        if (!/^\d{6}$/.test(otp)) {
            setError("Enter a valid 6-digit OTP.");
            return;
        }
        setIsSubmitting(true);
        try {
            await handleVerifyOtp(otp);
        } catch (err) {
            console.error("OTP verification failed:", err);
            setError("Invalid OTP.");
        } finally {
            setIsSubmitting(false);
            setOtp("");
        }
    }

    return (
        <Flex
            as="form"
            direction="column"
            gap={4}
            onSubmit={step === "auth" ? handleSubmit : handleVerify}
            {...rest}>
            {error && (
                <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Description>{error}</Alert.Description>
                </Alert.Root>
            )}

            <Text color="fg.muted">
                Enter your username and password to sign in
            </Text>
            {step === "auth" ? (
                <>
                    <Field.Root required>
                        <Field.Label>
                            Email
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            type="email"
                            name="username"
                            autoComplete="username"
                            placeholder="Enter your email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Field.Root>
                    <Field.Root required>
                        <Field.Label>
                            Password
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <PasswordInput
                            type="password"
                            name="current-password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            colorPalette="teal"
                        />
                    </Field.Root>
                </>
            ) : (
                <Field.Root required>
                    <Field.Label>
                        One-Time Password (OTP)
                        <Field.RequiredIndicator />
                    </Field.Label>

                    <Box>
                        <Input
                            type="text"
                            name="one-time-code"
                            autoComplete="one-time-code"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="Autofill or paste 6-digit code"
                            value={otp}
                            onChange={(e) => updateOtp(e.target.value)}
                            mb={2}
                        />
                        <PinInput.Root
                            key={step}
                            otp
                            value={otp.split("")}
                            onValueChange={(e) => updateOtp(e.valueAsString)}>
                            <PinInput.HiddenInput data-1p-ignore="true" />
                            <PinInput.Control>
                                <PinInput.Input
                                    index={0}
                                    data-1p-ignore="true"
                                />
                                <PinInput.Input
                                    index={1}
                                    data-1p-ignore="true"
                                />
                                <PinInput.Input
                                    index={2}
                                    data-1p-ignore="true"
                                />
                                <PinInput.Input
                                    index={3}
                                    data-1p-ignore="true"
                                />
                                <PinInput.Input
                                    index={4}
                                    data-1p-ignore="true"
                                />
                                <PinInput.Input
                                    index={5}
                                    data-1p-ignore="true"
                                />
                            </PinInput.Control>
                        </PinInput.Root>
                    </Box>
                </Field.Root>
            )}
            {step === "auth" && (
                <Box w="full">
                    <Turnstile
                        ref={turnstileRef}
                        siteKey="0x4AAAAAACrt5VbunM62aYIZ"
                        onSuccess={(token) => {
                            setTurnstileToken(token);
                        }}
                        options={{
                            size: "flexible",
                        }}
                    />
                </Box>
            )}
            <Button
                type="submit"
                colorPalette="teal"
                loading={isSubmitting}
                disabled={isSubmitting || (step === "auth" && !turnstileToken)}>
                {step === "auth" ? "Sign In" : "Verify"}
            </Button>
        </Flex>
    );
}
