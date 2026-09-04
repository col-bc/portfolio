import LoginForm from '@/components/forms/loginForm';
import { TbShieldLock } from 'react-icons/tb';

export default async function AuthPage() {
  return (
    <section className="flex min-h-[75vh] flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <TbShieldLock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Secure Access
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access the management portal.
          </p>
        </div>

        <div className="w-full">
          <LoginForm />
        </div>

        <p className="max-w-sm text-center text-[10px] tracking-wider text-muted-foreground/60 uppercase">
          Access is restricted to authorized personnel only. Unauthorized access
          is strictly prohibited and will be prosecuted to the fullest extent of
          the law.
        </p>
      </div>
    </section>
  );
}
