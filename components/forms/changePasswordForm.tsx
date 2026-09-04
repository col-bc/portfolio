'use client';

import { handleChangePassword } from '@/lib/user/userActions';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import React from 'react';
import { TbAlertCircleFilled, TbDeviceFloppy } from 'react-icons/tb';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../ui/field';
import PasswordInput from '../ui/passwordInput';
import { toast } from '../ui/toast';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [tsToken, setTsToken] = React.useState('');

  const tsRef = React.useRef<TurnstileInstance | null>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!allowSubmit) {
      setError('Please ensure all fields are correctly filled out.');
      return;
    }
    const result = await handleChangePassword(
      currentPassword,
      newPassword,
      tsToken
    );
    if (!result.success) {
      setError(result.error || 'Failed to change password.');
    } else {
      toast.add({
        title: 'Password Changed',
        description:
          'Your password has been successfully changed. Use your new password when logging in next time.',
        type: 'success',
      });
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }

  const testRequirements = (password: string) => {
    const minLength = 12;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return (
      password.length >= minLength && hasUppercase && hasLowercase && hasNumber
    );
  };

  const allowSubmit =
    tsToken && testRequirements(newPassword) && newPassword === confirmPassword;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <Alert>
          <TbAlertCircleFilled className="size-4" />
          <AlertTitle>Failed to Change Password</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Field>
        <FieldLabel>
          Current Password <span className="text-xs text-destructive">*</span>
        </FieldLabel>
        <PasswordInput
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          placeholder="Enter your current password"
          autoComplete="current-password"
        />
      </Field>
      <Field
        aria-invalid={newPassword.length > 0 && !testRequirements(newPassword)}
      >
        <FieldLabel>
          New Password <span className="text-xs text-destructive">*</span>
        </FieldLabel>
        <FieldContent>
          <PasswordInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Choose a new password"
            autoComplete="new-password"
          />
          <FieldDescription>
            Password must be at least 12 characters long, contain at least one
            uppercase letter, one lowercase letter, and one number.
          </FieldDescription>
          {newPassword.length > 0 && !testRequirements(newPassword) && (
            <FieldError>
              Password does not meet the required criteria.
            </FieldError>
          )}
        </FieldContent>
      </Field>
      <Field aria-invalid={newPassword !== confirmPassword}>
        <FieldLabel>
          Confirm Password <span className="text-xs text-destructive">*</span>
        </FieldLabel>
        <PasswordInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
          required
          autoComplete="new-password"
        />
        {newPassword !== confirmPassword && (
          <FieldError>Passwords do not match</FieldError>
        )}
      </Field>
      <Turnstile
        ref={tsRef}
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

      <Button type="submit" disabled={!allowSubmit}>
        <TbDeviceFloppy />
        Change Password
      </Button>
    </form>
  );
}
