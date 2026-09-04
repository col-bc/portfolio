'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { verifyOtp } from '@/lib/auth/sessionActions';
import { getTotpSetupData } from '@/lib/auth/twoFactor';
import { handleSetTwoFactorEnabled } from '@/lib/user/userActions';
import { User } from '@/prisma/generated/client';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import { TbAlertCircle, TbCopy } from 'react-icons/tb';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CardDescription, CardTitle } from '../ui/card';
import { Field, FieldContent, FieldLabel } from '../ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

export default function TwoFactorSetup({ user }: { user: User }) {
  const [setupData, setSetupData] = React.useState<{
    uri: string;
    secret: string;
  } | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [step, setStep] = React.useState<
    'loading' | 'setup' | 'confirm' | 'enabled'
  >('loading');
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

  React.useEffect(() => {
    const checkTwoFactorStatus = async () => {
      if (user.twoFactorEnabled) {
        setStep('enabled');
      }
    };
    checkTwoFactorStatus();
  }, [user]);

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

  if (!setupData) return <Spinner />;
  if (step === 'setup' && setupData) {
    return (
      <>
        <CardTitle>Two-Factor Authentication Setup</CardTitle>
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
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'M'}
          />
        </div>

        <div className="w-full space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase">
            Manual Entry Secret
          </label>
          <div className="flex items-center justify-between rounded-md border border-border bg-muted px-3 py-2">
            <code className="overflow-x-auto pb-2 text-sm tracking-widest">
              {setupData.secret}
            </code>
            <Button variant="ghost" size="icon-sm" className="h-6 w-6">
              <TbCopy className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        <Button size="sm" onClick={() => setStep('confirm')}>
          Confirm Setup
        </Button>
      </>
    );
  } else if (step === 'confirm') {
    return (
      <>
        <CardTitle>Confirm Setup</CardTitle>
        <CardDescription>
          Enter the code from your authenticator app to confirm the setup.
        </CardDescription>
        <form
          onSubmit={handleVerifyCode}
          className="flex w-full flex-col gap-4"
        >
          {error && (
            <Alert>
              <TbAlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Field>
            <FieldLabel htmlFor="otp">One-Time Password (OTP)</FieldLabel>
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

          <Button type="submit">Verify</Button>
        </form>
      </>
    );
  } else if (step === 'enabled') {
    return (
      <>
        <CardTitle>Two-Factor Authentication Enabled</CardTitle>
        <CardDescription>
          Two-Factor Authentication has been successfully enabled for your
          account.
        </CardDescription>
        {error && (
          <Alert>
            <TbAlertCircle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-2 gap-4 rounded bg-muted p-4">
          {user.backupCodes.split(',').map((code, index) => (
            <code key={index}>{code}</code>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Button variant="outline">Download Codes</Button>
          <Button variant="destructive" onClick={handleDisableTwoFactor}>
            Disable 2FA
          </Button>
        </div>
      </>
    );
  }
}
