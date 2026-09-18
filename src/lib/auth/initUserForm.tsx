import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldLabel,
  FieldRequiredIndicator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/ui/passwordInput';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/components/ui/toast';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AlertFeedback } from '@/types';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { useRouter } from 'next/navigation';
import React from 'react';
import { TbCircleXFilled, TbRotate, TbUserPlus } from 'react-icons/tb';
import { createSuperuser } from './session';

export default function InitUserForm() {
  const router = useRouter();
  const turnstileRef = React.useRef<TurnstileInstance | null>(null);

  const [alert, setAlert] = React.useState<AlertFeedback | null>(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [tsToken, setTsToken] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);

    if (!email) {
      setAlert({
        type: 'ERROR',
        title: 'Failed to Create User',
        message: 'Email is required to create user. Please try again.',
      });
      return;
    }
    if (password !== confirm) {
      setAlert({
        type: 'ERROR',
        title: 'Failed to Create User',
        message: 'Passwords do not match. Please try again.',
      });
      return;
    }
    const token = tsToken || turnstileRef.current?.getResponse() || '';
    if (!token) {
      setAlert({
        type: 'ERROR',
        title: 'Failed to Create User',
        message:
          'Session verification failed. Please refresh the page and try again.',
      });
      return;
    }

    const status = await createSuperuser(email, password, token);
    if (!status.success) {
      setAlert({
        type: 'ERROR',
        title: 'Failed to Create User',
        message:
          'An error occurred while creating the superuser. Please try again.',
      });
      return;
    } else {
      toast.add({
        title: 'Superuser Created',
        description: 'The superuser has been successfully created.',
      });
      router.push('/auth/login');
    }
  };

  const reset = () => {
    setEmail('');
    setPassword('');
    setConfirm('');
    setAlert(null);
    turnstileRef.current?.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow">
        <CardHeader>
          <CardTitle className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Create a Superuser
          </CardTitle>
          <CardDescription>
            Use this page to create a user for the first time.{' '}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {alert && (
            <Alert>
              <TbCircleXFilled className="size-4 shrink-0 text-destructive!" />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
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
            <FieldLabel>
              Username <FieldRequiredIndicator />
            </FieldLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </Field>
          <Field>
            <FieldLabel>
              Password
              <FieldRequiredIndicator />
            </FieldLabel>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </Field>
          <Field>
            <FieldLabel>
              Confirm Password
              <FieldRequiredIndicator />
            </FieldLabel>
            <PasswordInput
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </Field>
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
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!tsToken}>
            {!tsToken ? (
              <>
                <Spinner />
                Verifying Session
              </>
            ) : (
              <>
                <TbUserPlus className="h-5 w-5" />
                Create User
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
