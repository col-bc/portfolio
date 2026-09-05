// import animatedWave from '@/assets/lottie-wave.json';
import animatedGlass from '@/assets/lottie-magnifying-glass.json';
import CodeSamples from '@/components/codeSamples';
import ProjectCard from '@/components/projectCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { handleGetProjects } from '@/lib/project/projectActions';
import { cn } from '@/lib/util/utils';
import { Lottie } from 'lottie-react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  TbBriefcase,
  TbBrowser,
  TbFileText,
  TbMessages,
  TbServer,
  TbTools,
} from 'react-icons/tb';

export const metadata: Metadata = {
  title: 'Home',
};

type Skill = {
  label: string;
  icon: string;
  url?: string;
  category: 'front' | 'back' | 'soft' | 'tools';
};

const skills: Skill[] = [
  {
    label: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    category: 'front',
  },
  {
    label: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    url: 'https://www.typescriptlang.org/',
    category: 'front',
  },
  {
    label: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    url: 'https://www.python.org/',
    category: 'back',
  },
  {
    label: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    url: 'https://www.java.com/',
    category: 'back',
  },
  {
    label: 'C#',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    url: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
    category: 'back',
  },
  {
    label: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    url: 'https://reactjs.org/',
    category: 'front',
  },
  {
    label: 'Vue.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    url: 'https://vuejs.org/',
    category: 'front',
  },
  {
    label: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    url: 'https://nextjs.org/',
    category: 'front',
  },
  {
    label: 'Tailwind CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    url: 'https://tailwindcss.com/',
    category: 'front',
  },
  {
    label: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    url: 'https://nodejs.org/',
    category: 'back',
  },
  {
    label: 'Express',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    url: 'https://expressjs.com/',
    category: 'back',
  },
  {
    label: 'Django',
    icon: 'https://devicons.io/devicons/icons/django-icon.svg',
    url: 'https://www.djangoproject.com/',
    category: 'back',
  },
  {
    label: 'FastAPI',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    url: 'https://fastapi.tiangolo.com/',
    category: 'back',
  },
  {
    label: 'SQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    url: 'https://www.mysql.com/',
    category: 'tools',
  },
  {
    label: 'OpenAI',
    icon: 'https://devicons.io/devicons/icons/openai-icon.svg',
    url: 'https://openai.com/',
    category: 'tools',
  },
  {
    label: 'NoSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    url: 'https://www.mongodb.com/',
    category: 'tools',
  },
  {
    label: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    url: 'https://git-scm.com/',
    category: 'tools',
  },
  {
    label: 'GCP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
    url: 'https://cloud.google.com/',
    category: 'tools',
  },
  {
    label: 'Cloudflare',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg',
    url: 'https://www.cloudflare.com/',
    category: 'tools',
  },
  {
    label: 'Vercel',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
    url: 'https://vercel.com/',
    category: 'tools',
  },
  {
    label: 'Risk Mitigation',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/risk/risk-original.svg',
    category: 'soft',
  },
  {
    label: 'Root Cause Analysis',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/root-cause-analysis/root-cause-analysis-original.svg',
    category: 'soft',
  },
  {
    label: 'Cross-Functional Leadership',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cross-functional-leadership/cross-functional-leadership-original.svg',
    category: 'soft',
  },
  {
    label: 'Systemic Triage',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/systemic-triage/systemic-triage-original.svg',
    category: 'soft',
  },
];

export default async function Page() {
  const projects = await handleGetProjects();
  const projectData = projects.success ? projects.data : [];
  return (
    <div className="flex flex-col gap-16 px-4 py-12 md:gap-24 lg:gap-32">
      {/* --- HERO --- */}
      <section className="flex flex-col gap-6 text-sm leading-loose">
        <div className="flex items-center justify-between">
          <Heading className="max-w-2xl">
            Investigator Turned Software Engineer
          </Heading>
          <div className="hidden max-w-xl! items-center justify-end md:flex">
            <Lottie
              src={animatedGlass}
              autoplay
              loop
              style={{ width: '8rem', height: '8rem' }}
            />
          </div>
        </div>
        <h3 className="font-heading text-lg leading-relaxed font-semibold text-foreground md:text-xl">
          I am a technical problem-solver who treats every operational
          bottleneck, data discrepancy, and software bug like an investigation.
        </h3>
        <p className="text-base leading-relaxed text-foreground">
          With over five years of experience managing and investigating
          systematic loss, corporate compliance and risk mitigation for Fortune
          50 retailers, I now translate those analytical skills into system
          architecture and IT infrastructure. As a Software Engineering
          professional proficient in full-stack development and database
          management, I excel in dynamic environments that require technical
          precision, strict ethical standards, and the ability to bridge the gap
          between physical operations and digital ecosystems.
        </p>
        <div className="mt-4 flex gap-4">
          <Link
            href="/resume"
            className={cn(
              buttonVariants({
                className: 'px-4 shadow',
                size: 'lg',
                variant: 'default',
              })
            )}
          >
            <TbFileText size={24} />
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
      </section>

      {/* --- FEATURED PROJECTS --- */}
      <section className="flex w-full min-w-0 flex-col items-start gap-6">
        <div className="flex flex-col gap-2">
          <Heading size="sub">Featured Projects</Heading>
          <p className="text-base leading-relaxed text-muted-foreground">
            Below you will find a selection of my favorite projects that
            highlight my expertise in full-stack development.
          </p>
        </div>

        <div className="mt-4 flex w-full flex-col gap-8">
          {projectData.map(
            (project) =>
              project.visible &&
              project.featured && (
                <ProjectCard key={project.id} project={project} />
              )
          )}
        </div>
      </section>

      {/* --- CODE SAMPLES --- */}
      <section className="flex w-full min-w-0 flex-col items-start gap-6">
        <div className="flex flex-col gap-2">
          <Heading size="sub">Code Samples</Heading>
          <p className="text-base leading-relaxed text-muted-foreground">
            Explore various code snippets demonstrating architectural patterns
            and secure data handling from my recent projects.
          </p>
        </div>

        <div className="mt-4 w-full">
          <CodeSamples />
        </div>
      </section>

      {/* --- SKILLS OVERVIEW SECTION --- */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Heading size="sub">Skills Overview</Heading>
          <p className="text-base leading-relaxed text-muted-foreground">
            I am proficient in a wide range of programming languages,
            frameworks, and tools that enable me to build robust and scalable
            applications. My expertise spans front-end and back-end development,
            database management, and cloud infrastructure, allowing me to
            deliver end-to-end solutions that meet the needs of modern
            businesses.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <TbBrowser className="size-5" /> Front-End
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2">
                {skills
                  .filter((skill) => skill.category === 'front')
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((skill) => (
                    <SkillBadge key={skill.label} skill={skill} />
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <TbServer className="size-5" /> Back-End
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2">
                {skills
                  .filter((skill) => skill.category === 'back')
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((skill) => (
                    <SkillBadge key={skill.label} skill={skill} />
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <TbTools className="size-5" /> Infrastructure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2">
                {skills
                  .filter((skill) => skill.category === 'tools')
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((skill) => (
                    <SkillBadge key={skill.label} skill={skill} />
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <TbBriefcase className="size-5" /> Soft Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2">
                {skills
                  .filter((skill) => skill.category === 'soft')
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((skill) => (
                    <SkillBadge key={skill.label} skill={skill} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function SkillBadge({ skill }: { skill: Skill }) {
  const content = (
    <Badge
      key={skill.label}
      variant="secondary"
      className="flex cursor-pointer items-center gap-2 px-3! py-1! text-sm! transition-transform hover:-translate-y-0.5 hover:scale-105 hover:shadow-sm"
    >
      <Avatar className="size-4">
        <AvatarImage src={skill.icon} alt={skill.label} />
        <AvatarFallback>{skill.label[0]}</AvatarFallback>
      </Avatar>
      {skill.label}
    </Badge>
  );

  if (skill.url) {
    return (
      <Link
        href={skill.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        {content}
      </Link>
    );
  }
  return content;
}
