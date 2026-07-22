import LoginForm from '@/components/forms/loginForm';

export default async function AuthPage() {
  return (
    <section className="flex flex-col items-start gap-8 px-4 py-8 md:gap-12">
      <div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Site Login
        </h1>
        <p className="max-w-md text-xs leading-tight text-muted-foreground">
          This portion of the website is private and protected. Access is
          restricted to authorized users only. Unauthorized access is strictly
          prohibited and will be punished to the fullest extent of the law.
        </p>
      </div>
      <LoginForm />
    </section>
  );
}
