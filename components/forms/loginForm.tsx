'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { verifySession } from '@/lib/auth/session';
import { getCurrentUser, login, verifyOtp } from '@/lib/auth/sessionActions';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  TbArrowLeft,
  TbAuth2Fa,
  TbCircleXFilled,
  TbEye,
  TbEyeOff,
  TbLockOpen,
  TbRotate,
} from 'react-icons/tb';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '../ui/alert';
import { Button, buttonVariants } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Field, FieldContent, FieldDescription, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import { Spinner } from '../ui/spinner';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
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
      setError('Missing required fields.');
      turnstileRef.current?.reset();
      return;
    }

    const token = tsToken || turnstileRef.current?.getResponse() || '';
    if (!token) {
      setError('Turnstile verification failed. Please try again.');
      return;
    }

    const status = await login({
      username: email,
      password,
      turnstileToken: token,
    });

    if (status.success) {
      setStep('otp');
    } else {
      setError(status.error || 'Username or password is incorrect.');
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
      if (onSuccess === undefined) {
        router.push('/auth/manage');
      } else {
        onSuccess();
      }
    } else {
      setError(
        status.error ||
          '2-Step Verification failed. Please check your code generator and try your request again.'
      );
      setOtp('');
    }
  };

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (step === 'password') {
      await loginWithPassword();
    } else if (step === 'otp') {
      await submitOtp();
    }
  }

  const reset = () => {
    setEmail('');
    setPassword('');
    setOtp('');
    setError(null);
    setStep('password');
    turnstileRef.current?.reset();
  };

  React.useEffect(() => {
    const handleEffect = async () => {
      const user = await getCurrentUser();
      if (user) {
        await verifySession();
        router.push('/auth/manage');
      }
    };
    handleEffect();
  }, [router]);

  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          {step === 'password'
            ? 'Enter Your Credentials'
            : '2-Step Verification'}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-6">
          {error && (
            <Alert>
              <TbCircleXFilled className="size-4 shrink-0 text-destructive!" />
              <AlertTitle>Login Unsuccessful</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <Tooltip>
                <TooltipTrigger>
                  <AlertAction
                    className={buttonVariants({
                      size: 'icon-sm',
                      variant: 'secondary',
                    })}
                    onClick={() => reset()}
                  >
                    <TbRotate />
                  </AlertAction>
                </TooltipTrigger>
                <TooltipContent>Reset form</TooltipContent>
              </Tooltip>
            </Alert>
          )}

          <Field>
            <FieldLabel htmlFor="email">
              Email Address <span className="text-xs text-destructive">*</span>
            </FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={step === 'otp'}
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
                disabled={step === 'otp'}
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

          <Field hidden={step !== 'otp'}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp">
                One-Time Password{' '}
                <span className="text-xs text-destructive">*</span>
              </FieldLabel>
              <Link
                href="/auth/2fa/recovery"
                className="text-sm text-primary hover:underline"
              >
                Use Recovery Code
              </Link>
            </div>
            <FieldDescription>
              Enter the 6-digit code from your authenticator app or email.
            </FieldDescription>
            <FieldContent>
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
            </FieldContent>
          </Field>
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
        </CardContent>
        <CardFooter>
          {step === 'otp' && (
            <Button
              hidden
              variant="secondary"
              size="icon"
              onClick={() => setStep('password')}
              aria-label="Go back to password step"
            >
              <TbArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Button
            type="submit"
            disabled={step === 'password' && !tsToken}
            className="ml-auto"
          >
            {step === 'password' && !tsToken ? (
              <Spinner />
            ) : step === 'password' ? (
              <>
                <TbLockOpen className="h-4 w-4" />
                Secure Login
              </>
            ) : (
              <>
                <TbAuth2Fa className="h-4 w-4" />
                Verify Code
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
