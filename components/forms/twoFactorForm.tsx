'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { verifyOtp } from '@/lib/auth/sessionActions';
import { getTotpSetupData } from '@/lib/auth/twoFactor';
import { handleSetTwoFactorEnabled } from '@/lib/user/userActions';
import { User } from '@/prisma/generated/client';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import {
  TbAlertCircle,
  TbArrowRight,
  TbCheck,
  TbCopy,
  TbEye,
} from 'react-icons/tb';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Field, FieldContent, FieldLabel } from '../ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Separator } from '../ui/separator';

export default function TwoFactorForm({ user }: { user: User }) {
  const [setupData, setSetupData] = React.useState<{
    uri: string;
    secret: string;
  } | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [step, setStep] = React.useState<
    'loading' | 'setup' | 'confirm' | 'enabled'
  >(user.twoFactorEnabled ? 'enabled' : 'loading');
  const [otp, setOtp] = React.useState('');

  React.useEffect(() => {
    async function loadData() {
      const response = await getTotpSetupData();
      if (response.success) {
        setSetupData(response.data);
        setStep('setup');
      } else {
        setError(response.error);
      }
    }
    loadData();
  }, []);

  const handleVerifyCode = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = await verifyOtp(otp, false);
    if (status.success) {
      const status = await handleSetTwoFactorEnabled(true);
      if (status.success) {
        setStep('enabled');
      }
    } else {
      setError(status.error || 'Failed to verify OTP. Please try again.');
    }
  };

  const handleDisableTwoFactor = async () => {
    const status = await handleSetTwoFactorEnabled(false);
    if (status.success) {
      setStep('setup');
    }
  };

  if (!setupData || !user)
    return (
      <Card className="w-full max-w-md">
        <CardContent>
          <Spinner />
        </CardContent>
      </Card>
    );
  if (user.twoFactorEnabled || step === 'enabled') {
    return (
      <Card className="w-full max-w-md shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Two-Factor Authentication</CardTitle>
            <Badge
              variant="secondary"
              className="ml-auto text-green-600 dark:text-green-400"
            >
              ENABLED
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="font-semibold">
            Two-Factor Authentication is enabled for your account.
          </CardDescription>
          <CardDescription>
            Store these backup codes in a safe place in case you loose access to
            your authenticator app.
          </CardDescription>
          {error && (
            <Alert>
              <TbAlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Collapsible className="rounded bg-muted p-4">
            <CollapsibleTrigger className="flex items-center gap-2">
              <TbEye className="h-5 w-5" /> View Backup Codes
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4">
                {user.backupCodes.split(',').map((code, index) => (
                  <code key={index}>{code}</code>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" onClick={handleDisableTwoFactor}>
            <TbAlertCircle />
            Disable 2-Factor Authentication
          </Button>
        </CardFooter>
      </Card>
    );
  } else if (step === 'setup' && setupData) {
    return (
      <Card className="w-full max-w-md shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Two-Factor Authentication</CardTitle>
            <Badge variant="secondary">AVAILABLE</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Scan the QR code below using Google Authenticator, Authy, or your
            preferred 2FA application.
          </CardDescription>

          {error && (
            <Alert>
              <TbAlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex w-full justify-center rounded-lg bg-white p-4 shadow-inner">
            <QRCodeSVG
              value={setupData.uri}
              size={200}
              bgColor="#ffffff"
              fgColor={'#000000'}
              level={'M'}
            />
          </div>

          <div className="w-full space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              Manually Entry Secret
            </label>
            <div className="flex items-start justify-between rounded-md border border-border bg-muted px-3 py-2">
              <code className="scrollbar-none overflow-x-auto font-mono text-sm tracking-widest">
                {setupData.secret}
              </code>
              <Button variant="ghost" size="icon-xs">
                <TbCopy />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setStep('confirm')}>
            Confirm Code <TbArrowRight />
          </Button>
        </CardFooter>
      </Card>
    );
  } else if (step === 'confirm') {
    return (
      <form onSubmit={handleVerifyCode}>
        <Card className="w-full max-w-md shadow">
          <CardHeader>
            <CardTitle>Confirm Setup</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert>
                <TbAlertCircle />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Field>
              <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="otp">One-Time Password (OTP)</FieldLabel>
                <Button
                  size="xs"
                  variant="link"
                  onClick={() => setStep('setup')}
                >
                  Start Over
                </Button>
              </div>
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
          </CardContent>
          <CardFooter>
            <Button type="submit">
              <TbCheck />
              Verify Code & Enable
            </Button>
          </CardFooter>
        </Card>
      </form>
    );
  }
}
