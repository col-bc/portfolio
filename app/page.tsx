import CodeSamples from '@/components/codeSamples';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/util/utils';
import Link from 'next/link';
import { TbBook, TbMessages } from 'react-icons/tb';

const skills = [
  {
    label: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    label: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    url: 'https://www.typescriptlang.org/',
  },
  {
    label: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    url: 'https://www.python.org/',
  },
  {
    label: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    url: 'https://www.java.com/',
  },
  {
    label: 'C#',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    url: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
  },
  {
    label: 'SQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    url: 'https://www.mysql.com/',
  },
  {
    label: 'Bash',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
    url: 'https://www.gnu.org/software/bash/',
  },
  {
    label: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    url: 'https://reactjs.org/',
  },
  {
    label: 'Angular',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    url: 'https://angular.io/',
  },
  {
    label: 'Vue.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    url: 'https://vuejs.org/',
  },
  {
    label: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    url: 'https://nextjs.org/',
  },
  {
    label: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    url: 'https://nodejs.org/',
  },
  {
    label: 'Express',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    url: 'https://expressjs.com/',
  },
  {
    label: 'Django',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg',
    url: 'https://www.djangoproject.com/',
  },
  {
    label: 'Flask',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    url: 'https://flask.palletsprojects.com/',
  },
  {
    label: 'FastAPI',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    url: 'https://fastapi.tiangolo.com/',
  },
  {
    label: 'ASP.NET Core',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
    url: 'https://dotnet.microsoft.com/en-us/apps/aspnet',
  },
  {
    label: 'OpenAI',
    icon: 'https://devicons.io/devicons/icons/openai-icon.svg',
    url: 'https://openai.com/',
  },
  {
    label: 'Gemini',
    icon: 'https://devicons.io/devicons/icons/google-gemini.svg',
    url: 'https://ai.google.dev/',
  },
  {
    label: 'Claude',
    icon: 'https://devicons.io/devicons/icons/claude-icon.svg',
    url: 'https://www.anthropic.com/',
  },
  {
    label: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    url: 'https://www.postgresql.org/',
  },
  {
    label: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    url: 'https://www.mysql.com/',
  },
  {
    label: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    url: 'https://www.mongodb.com/',
  },
  {
    label: 'Microsoft SQL Server',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg',
    url: 'https://learn.microsoft.com/en-us/sql/sql-server/',
  },
  {
    label: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    url: 'https://git-scm.com/',
  },
  {
    label: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    url: 'https://www.docker.com/',
  },
  {
    label: 'GCP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
    url: 'https://cloud.google.com/',
  },
  {
    label: 'AWS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    url: 'https://aws.amazon.com/',
  },
  {
    label: 'Cloudflare',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg',
    url: 'https://www.cloudflare.com/',
  },
  {
    label: 'Twilio',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twilio/twilio-original.svg',
    url: 'https://www.twilio.com/',
  },
  {
    label: 'Stripe',
    icon: 'https://devicons.io/devicons/icons/stripe.svg',
    url: 'https://stripe.com/',
  },
  {
    label: 'SendGrid',
    icon: 'https://devicons.io/devicons/icons/sendgrid-icon.svg',
    url: 'https://sendgrid.com/',
  },
  {
    label: 'Linux',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    url: 'https://www.linux.org/',
  },
];

export default function Page() {
  return (
    <section className="flex flex-col items-start gap-8 px-4 py-8 md:gap-12 lg:gap-20">
      <div className="flex flex-col gap-6 text-sm leading-loose">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-4xl">
              Hi, I&apos;m Colby Cooper
            </h1>
            <h3 className="text-lg leading-snug text-foreground md:text-xl">
              I am a technical problem-solver who treats every operational
              bottleneck, data discrepancy, and software bug like an
              investigation.
            </h3>
          </div>
          <Avatar className="size-30">
            <AvatarImage src="/avatar.jpg" alt="Colby Cooper" />
            <AvatarFallback className="text-4xl font-black">CC</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-base leading-relaxed text-foreground">
          With over five years of experience managing corporate compliance and
          risk mitigation for Fortune 50 retailers, I now translate those
          analytical skills into system architecture and IT infrastructure. As a
          Software Engineering candidate proficient in full-stack development
          and database management, I excel in dynamic environments that require
          technical precision, strict ethical standards, and the ability to
          bridge the gap between physical operations and digital ecosystems.
        </p>
        <div className="flex gap-4">
          <Link
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({
                className: 'px-4',
                size: 'lg',
                variant: 'default',
              })
            )}
          >
            <TbBook size={24} />
            View My Resume
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({
                className: 'px-4',
                size: 'lg',
                variant: 'outline',
              })
            )}
          >
            <TbMessages size={24} />
            Get in Touch
          </Link>
        </div>
      </div>

      <CodeSamples />

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold tracking-tight underline decoration-primary decoration-2 md:text-3xl">
          Skills Overview
        </h2>
        <p className="text-base leading-relaxed text-foreground">
          I am proficient in a wide range of programming languages, frameworks,
          and tools that enable me to build robust and scalable applications. My
          expertise spans front-end and back-end development, database
          management, and cloud infrastructure, allowing me to deliver
          end-to-end solutions that meet the needs of modern businesses.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {skills
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((skill) => (
              <Badge
                key={skill.label}
                variant="secondary"
                className="flex cursor-pointer items-center gap-2 px-2 py-1 text-xs font-medium transition-transform hover:-translate-y-0.5 hover:scale-105 hover:shadow-md"
              >
                <Link
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Avatar className="size-4">
                    <AvatarImage src={skill.icon} alt={skill.label} />
                    <AvatarFallback>{skill.label[0]}</AvatarFallback>
                  </Avatar>
                  {skill.label}
                </Link>
              </Badge>
            ))}
        </div>
      </div>
    </section>
  );
}
