import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/auth/sessionActions';
import Link from 'next/link';
import { unauthorized } from 'next/navigation';
import { TbBriefcase, TbFileCv, TbFlag, TbFolderCode } from 'react-icons/tb';

export default async function ManagePage() {
  const user = await getCurrentUser();

  if (!user) {
    unauthorized();
  }

  return (
    <section className="flex flex-col items-start gap-8 px-4 py-8 md:gap-12">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Welcome, {user.username}!
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ModuleCard
          title="Jobs"
          description="View and manage your employment history."
          icon={TbBriefcase}
        />
        <ModuleCard
          title="Resume"
          description="Manage your resume versions."
          icon={TbFileCv}
        />
        <ModuleCard
          title="Projects"
          description="View and update your projects."
          icon={TbFolderCode}
        />
        <ModuleCard
          title="Leads"
          description="View and manage your leads."
          icon={TbFlag}
        />
      </div>
    </section>
  );
}

function ModuleCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <Link href={`/auth/manage/${title.toLowerCase()}`} className="group">
      <Card className="h-full transition-transform group-hover:-translate-y-1 group-hover:bg-muted/25 group-hover:shadow-sm">
        <CardContent className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="mb-1 text-lg font-semibold tracking-tight">
              {title}
            </CardTitle>
            <p className="mt-auto text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
