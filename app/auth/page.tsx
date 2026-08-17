import LoginIllustration from '@/assets/illustrations/shield.svg';
import LoginForm from '@/components/forms/loginForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';

export default async function AuthPage() {
  return (
    <section className="flex flex-col items-start gap-8 px-4 py-8 md:mb-12 md:gap-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex w-full flex-col gap-8">
          <Heading className="mb-4">Site Login</Heading>
          <p className="max-w-md text-xs leading-tight text-muted-foreground">
            This portion of the website is private and protected. Access is
            restricted to authorized users only. Unauthorized access is strictly
            prohibited and will be punished to the fullest extent of the law.
          </p>
          <Card className="w-full max-w-md shadow">
            <CardHeader>
              <CardTitle>Please login to Continue</CardTitle>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col items-center">
          <LoginIllustration
            width="800"
            height="600"
            viewBox="0 0 800 600"
            className="hidden size-124 w-full text-primary md:block"
          />
        </div>
      </div>
    </section>
  );
}
