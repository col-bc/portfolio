"use client";
import { handleAuthAttempt, handleVerifyOtp } from "@/app/lib/handleAuth";
import {
    Alert,
    Button,
    Field,
    Flex,
    FlexProps,
    Input,
    PinInput,
    Text,
} from "@chakra-ui/react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { useEffect, useRef, useState } from "react";
import { PasswordInput } from "./ui/password-input";

export default function AuthForm({ ...rest }: FlexProps) {
    const [mounted, setMounted] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [step, setStep] = useState<"auth" | "otp">("auth");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const turnstileRef = useRef<TurnstileInstance | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    /**
     * Handles the submission of the authentication form.
     * @param e the form submit event
     * @returns a promise that resolves when the authentication attempt is complete
     */
    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        if (isSubmitting) return;
        setError(null);
        if (!turnstileToken) {
            setError("Please complete the CAPTCHA challenge.");
            return;
        }
        setIsSubmitting(true);
        const result = await handleAuthAttempt({
            username,
            password,
            turnstileToken,
        });
        if (!result.success) {
            setError(result.error || "Invalid username or password.");
            setTurnstileToken(null);
            turnstileRef.current?.reset();
            setPassword("");
            setIsSubmitting(false);
            return;
        }
        setStep("otp");
        setIsSubmitting(false);
        setUsername("");
        setPassword("");
        setOtp(["", "", "", "", "", ""]);
        turnstileRef.current?.reset();
    }

    /**
     * Handles the verification of the OTP (One-Time Password) entered by the user.
     * @param e the form submit event
     * @returns a promise that resolves when the OTP verification is complete
     */
    async function handleVerify(e: React.SubmitEvent) {
        e.preventDefault();
        if (isSubmitting) return;
        setError(null);
        if (otp.some((digit) => digit === "")) {
            setError("Please enter the complete 6-digit OTP.");
            return;
        }
        setIsSubmitting(true);
        const result = await handleVerifyOtp(otp.join(""));
        if (!result.success) {
            setError(result.error || "Invalid OTP.");
            setOtp(["", "", "", "", "", ""]);
            setIsSubmitting(false);
            return;
        }
        setIsSubmitting(false);
    }

    return (
        <Flex
            as="form"
            direction="column"
            gap={6}
            onSubmit={step === "auth" ? handleSubmit : handleVerify}
            {...rest}>
            {error && (
                <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Description>{error}</Alert.Description>
                </Alert.Root>
            )}

            <Text color="fg.muted">
                {step === "auth"
                    ? "Enter your username and password to sign in"
                    : "Enter the 6-digit code from your authenticator app"}
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

                    <PinInput.Root
                        value={otp}
                        onValueChange={(e) => setOtp(e.value)}
                        autoFocus
                        spaceX={4}
                        otp>
                        <PinInput.Input index={0} />
                        <PinInput.Input index={1} />
                        <PinInput.Input index={2} />
                        <PinInput.Input index={3} />
                        <PinInput.Input index={4} />
                        <PinInput.Input index={5} />
                    </PinInput.Root>
                </Field.Root>
            )}
            {step === "auth" && mounted && (
                <Turnstile
                    ref={turnstileRef}
                    siteKey="0x4AAAAAACrt5VbunM62aYIZ"
                    onSuccess={(token) => {
                        setTurnstileToken(token);
                    }}
                    options={{
                        theme: "auto",
                        size: "flexible",
                        feedbackEnabled: true,
                        appearance: "always",
                    }}
                    style={{
                        height: "67px",
                    }}
                />
            )}
            <Button
                type="submit"
                mt={2}
                colorPalette="teal"
                loading={isSubmitting}
                disabled={isSubmitting || (step === "auth" && !turnstileToken)}>
                {step === "auth" ? "Sign In" : "Verify"}
            </Button>
        </Flex>
    );
}
