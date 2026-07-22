'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { login, verifyOtp } from '@/lib/auth/sessionActions';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  TbArrowLeft,
  TbArrowRight,
  TbExclamationCircleFilled,
  TbEye,
  TbEyeOff,
  TbPasswordFingerprint,
  TbPasswordUser,
} from 'react-icons/tb';
import { Button } from '../ui/button';
import { Field, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';

export default function LoginForm(
  props: React.FormHTMLAttributes<HTMLFormElement>
) {
  const router = useRouter();

  const turnstileRef = React.useRef<TurnstileInstance | null>(null);

  const [error, setError] = React.useState<string | null>(null);
  const [tsToken, setTsToken] = React.useState<string | null>(null);
  const [step, setStep] = React.useState<'password' | 'otp'>('password');
  const [showPassword, setShowPassword] = React.useState(false);
  const [otp, setOtp] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const loginWithPassword = async () => {
    if (!email || !password) {
      setError('Email and password are required.');
      turnstileRef.current?.reset();
      return;
    }

    const status = await login({
      username: email,
      password,
      turnstileToken: (tsToken || turnstileRef.current?.getResponse()) ?? '',
    });

    if (status.success) {
      setStep('otp');
    } else {
      setError(
        status.error ||
          'Login failed. Please check your credentials and try your request again.'
      );
      setPassword('');
      turnstileRef.current?.reset();
    }
  };

  const submitOtp = async () => {
    if (!otp) {
      setError('One Time Password is required.');
      return;
    }

    const status = await verifyOtp(otp);

    if (status.success) {
      router.refresh();
      router.push('/auth/manage');
    } else {
      setError(
        status.error ||
          '2-Step Verification failed. Please check your code generator and try your request again.'
      );
      setOtp('');
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields correctly.');
      return;
    }

    if (step === 'password') {
      await loginWithPassword();
    } else if (step === 'otp') {
      await submitOtp();
    }
  };

  return (
    <div className="flex w-full flex-col-reverse items-center gap-8 md:flex-row md:gap-12">
      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-sm items-center gap-4"
        {...props}
      >
        <h4 className="text-lg leading-none font-semibold tracking-tight">
          {step === 'password'
            ? 'Please login to Continue'
            : 'Verify One Time Password'}
        </h4>
        {error && (
          <div
            className="flex w-full items-start gap-2 text-sm text-destructive"
            role="alert"
            aria-live="assertive"
          >
            <TbExclamationCircleFilled className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {step === 'password' && (
          <>
            <Field>
              <FieldLabel htmlFor="email">
                Email <span className="text-xs text-destructive">*</span>
              </FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">
                Password <span className="text-xs text-destructive">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <InputGroupButton onClick={toggleShowPassword}>
                  {showPassword ? (
                    <TbEye className="h-5 w-5" />
                  ) : (
                    <TbEyeOff className="h-5 w-5" />
                  )}
                </InputGroupButton>
              </InputGroup>
            </Field>
          </>
        )}
        {step === 'otp' && (
          <Field>
            <FieldLabel htmlFor="otp">
              One Time Password{' '}
              <span className="text-xs text-destructive">*</span>
            </FieldLabel>
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(val) => setOtp(val)}
              autoComplete="one-time-code"
              autoFocus
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Field>
        )}
        {step === 'password' && (
          <Turnstile
            ref={turnstileRef}
            siteKey="0x4AAAAAACrt5VbunM62aYIZ"
            options={{
              theme: 'auto',
              size: 'flexible',
              feedbackEnabled: true,
              appearance: 'interaction-only',
            }}
            onSuccess={(token) => {
              setTsToken(token);
            }}
          />
        )}

        <div className="mt-2 flex items-center gap-2">
          {step === 'otp' && (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setStep('password')}
            >
              <TbArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Button
            type="submit"
            className="max-w-52 flex-1"
            disabled={step === 'password' && !tsToken}
          >
            {step === 'password' ? 'Login' : 'Verify'}
            <TbArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </form>
      <div className="hidden flex-1 items-center justify-center md:flex">
        <div className="relative flex h-64 w-64 items-center justify-center text-primary">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl"></div>
          {step === 'password' ? (
            <TbPasswordUser className="relative z-10 h-48 w-48" />
          ) : (
            <TbPasswordFingerprint className="relative z-10 h-48 w-48" />
          )}
        </div>
      </div>
    </div>
  );
}
