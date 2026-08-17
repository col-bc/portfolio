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
  TbCircleXFilled,
  TbEye,
  TbEyeOff,
  TbRotate,
} from 'react-icons/tb';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Field, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function LoginForm() {
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

  const reset = () => {
    setEmail('');
    setPassword('');
    setOtp('');
    setError(null);
    setStep('password');
    turnstileRef.current?.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="grid w-full items-center gap-6">
      <FieldLabel>
        {step === 'password' ? 'Login with Password' : 'Enter OTP'}
      </FieldLabel>
      {error && (
        <Alert>
          <TbCircleXFilled className="size-4 shrink-0 text-destructive!" />
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <AlertAction>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  onClick={() => reset()}
                >
                  <TbRotate />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset form</TooltipContent>
            </Tooltip>
          </AlertAction>
        </Alert>
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
      <div className="flex items-center gap-4">
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
          className="max-w-52 flex-1 px-6"
          disabled={step === 'password' && !tsToken}
        >
          {step === 'password' ? 'Login' : 'Verify'}
          <TbArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
