// import animatedWave from '@/assets/lottie-wave.json';
import animatedGlass from '@/assets/lottie-magnifying-glass.json';
import CodeSamples from '@/components/codeSamples';
import ProjectCard from '@/components/projectCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/lib/util/utils';
import { Lottie } from 'lottie-react';
import Link from 'next/link';
import {
  TbBriefcase,
  TbBrowser,
  TbFileText,
  TbMessages,
  TbServer,
  TbTools,
} from 'react-icons/tb';

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

export default function Page() {
  return (
    <section className="flex flex-col items-start gap-10 px-4 py-12 md:gap-16 lg:gap-20">
      <div className="flex flex-col gap-4 text-sm leading-loose md:gap-6">
        <div className="flex items-center justify-between">
          <Heading className="mb-4 max-w-2xl">
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
        <div className="mt-2 flex gap-4">
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
      </div>

      <div className="flex w-full min-w-0 flex-col items-start gap-4 md:gap-6">
        <Heading size="sub">Featured Projects</Heading>
        <p className="text-base leading-relaxed text-foreground">
          Below you will find a selection of my favorite projects that highlight
          my expertise in full-stack development.
        </p>

        <div className="flex w-full flex-col gap-4 md:gap-6">
          <ProjectCard
            project={{
              title: 'Passman',
              description:
                'A full-stack credential vault engineered with a Zero-Knowledge Architecture to ensure user data remains confidential even from the server. Implements client-side AES-256-GCM encryption, flexible item schemas, and a real-time Security Center that audits credential health, password strength, and systemic vulnerability risks.',
              images: [
                {
                  url: '/screens/passman/landing.png',
                  altText: 'Passman landing page',
                },
                {
                  url: '/screens/passman/locker.png',
                  altText: 'Passman locker page',
                },
                {
                  url: '/screens/passman/item-form.png',
                  altText: 'Passman item form page',
                },
                {
                  url: '/screens/passman/security-center.png',
                  altText: 'Passman security center page',
                },
              ],
              tags: 'Next.js, TypeScript, React, Tailwind CSS, AES-256-GCM, Shadcn UI, Cloudflare',
              link: 'https://liveurl.com',
              repository: 'https://github.com/myrepo',
              visible: true,
            }}
          />
          <ProjectCard
            reverse
            project={{
              title: 'Blueprint AI',
              description:
                'An AI-powered resume generation platform built on a decoupled Backend-for-Frontend (BFF) architecture. Next.js handles the responsive UI, OAuth 2.0 authentication, and secure state management via Server Actions, while a dedicated Python FastAPI microservice orchestrates complex prompt engineering and OpenAI API integrations for dynamic document construction',
              tags: 'Next.js,FastAPI,Python,TypeScript,OpenAI API,OAuth 2.0,Tailwind CSS',
              link: 'https://blueprint-ai.example.com',
              repository: 'https://github.com/yourusername/blueprint-ai',
              images: [
                {
                  url: '/screens/blueprint/landing.png',
                  altText:
                    'Blueprint AI landing page with a hero section and call-to-action button',
                },
                {
                  url: '/screens/blueprint/job-search.png',
                  altText:
                    'Blueprint AI job search page with search results and filters',
                },
                {
                  url: '/screens/blueprint/resume-form.png',
                  altText:
                    'Blueprint AI resume form page with input fields and options for customization',
                },
                {
                  url: '/ screens/blueprint/resume-editor.png',
                  altText:
                    'Blueprint AI resume editor page with a live preview of the generated resume',
                },
              ],
              visible: true,
            }}
          />
        </div>
        <div className="flex w-full items-center justify-center">
          <Link
            href="/projects"
            className={cn(
              buttonVariants({
                className: 'px-6! shadow',
                size: 'lg',
                variant: 'outline',
              })
            )}
          >
            View All Projects
          </Link>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col items-start gap-6">
        <Heading size="sub">Code Samples</Heading>
        <p className="text-base leading-relaxed text-foreground">
          Explore various code snippets demonstrating architectural patterns and
          secure data handling from my recent projects
        </p>

        <CodeSamples />
      </div>

      <div className="mb-8 flex flex-col gap-6">
        <Heading size="sub">Skills Overview</Heading>
        <p className="text-base leading-relaxed text-foreground">
          I am proficient in a wide range of programming languages, frameworks,
          and tools that enable me to build robust and scalable applications. My
          expertise spans front-end and back-end development, database
          management, and cloud infrastructure, allowing me to deliver
          end-to-end solutions that meet the needs of modern businesses.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="shadow-sm">
            <CardContent>
              <CardTitle className="font-lg flex items-center gap-2 font-semibold">
                <TbBrowser className="size-5" /> Front-End
              </CardTitle>

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
            <CardContent>
              <CardTitle className="font-lg flex items-center gap-2 font-semibold">
                <TbServer className="size-5" /> Back-End
              </CardTitle>

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
            <CardContent>
              <CardTitle className="font-lg flex items-center gap-2 font-semibold">
                <TbTools className="size-5" /> Infrastructure
              </CardTitle>

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
            <CardContent>
              <CardTitle className="font-lg flex items-center gap-2 font-semibold">
                <TbBriefcase className="size-5" /> Soft Skills
              </CardTitle>
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
      </div>
    </section>
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
