import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { getJobs } from '@/lib/job/jobDAL';
import { cn } from '@/lib/util/utils';
import Link from 'next/link';
import { TbCertificate, TbDownload, TbFileDownload } from 'react-icons/tb';

function duration(startDate: Date, endDate?: Date): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();

  if (months < 0 || (months === 0 && end.getDate() < start.getDate())) {
    return `${years - 1} years, ${12 + months} months`;
  } else {
    return `${years} years, ${months} months`;
  }
}

function formatDate(date: Date): string {
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

const hoverClasses =
  'transition-transform shadow hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg';

export default async function AboutPage() {
  const jobs = await getJobs();
  const sortedJobs = jobs.sort(
    (a, b) => b.startDate.getTime() - a.startDate.getTime()
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <section className="flex flex-col items-start gap-10 px-4 py-8 md:gap-16 lg:gap-20">
      <div className="flex flex-col gap-6 md:gap-8">
        <Heading>About Me</Heading>

        <div className="flex flex-col gap-4 text-sm leading-relaxed">
          <p className="text-base leading-relaxed text-muted-foreground">
            I&apos;m a software engineer with a passion for building scalable
            and efficient applications. With over 5 years of experience in the
            industry, I have a strong background in full-stack development,
            cloud computing, and AI integration.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            I thrive in collaborative environments and enjoy working on projects
            that challenge me to learn new technologies and improve my skills. I
            am always eager to take on new challenges and contribute to
            innovative projects that make a positive impact.
          </p>
        </div>
      </div>

      {/* Education */}
      <div className="flex flex-col gap-6 md:gap-8">
        <Heading size="sub">Education</Heading>

        <Card className={hoverClasses}>
          <CardHeader className="relative flex flex-col">
            <div className="flex items-start gap-2">
              <Avatar className="size-12 border-2 border-muted">
                <AvatarImage
                  src="/ksu.svg"
                  alt="Kennesaw State University Logo"
                  className="object-contain object-center"
                />
                <AvatarFallback>KSU</AvatarFallback>
              </Avatar>

              <div className="flex flex-1 flex-col">
                <CardTitle className="text-lg font-semibold tracking-tight">
                  Bachelor of Science in Software Engineering
                </CardTitle>
                <CardDescription className="text-base text-foreground">
                  College of Computing and Software Engineering,{' '}
                  <em>Kennesaw State University</em>,{' '}
                </CardDescription>
              </div>
            </div>
            <div>
              <Badge variant="outline">In Progress</Badge>
              <Badge variant="outline" className="ml-2">
                3.8 GPA
              </Badge>
            </div>
            <span className="text-base text-muted-foreground">
              Estimated Graduation: May 2027
            </span>
          </CardHeader>

          <CardContent className="flex flex-col">
            <p className="text-base leading-relaxed text-foreground">
              I am currently pursuing a Bachelor of Science in Software
              Engineering at Kennesaw State University. My coursework has
              provided me with a strong foundation in software development
              principles, data structures, algorithms, and software design
              patterns. I have also gained practical experience through various
              projects and internships, allowing me to apply my knowledge in
              real-world scenarios.
            </p>

            <h5 className="mt-4 text-base font-semibold">
              Relevant Coursework
            </h5>
            <ul className="list-disc pl-4">
              <div className="my-2 grid grid-cols-1 gap-1 md:grid-cols-2">
                <li>Data Structures and Algorithms</li>
                <li>Software Design Patterns</li>
                <li>Database Systems</li>
                <li>Cloud Computing</li>
                <li>Artificial Intelligence</li>
                <li>Web Development</li>
                <li>User-Centered Design</li>
                <li>Software Testing and Quality Assurance</li>
                <li>Computer Architecture</li>
                <li>Operating Systems</li>
              </div>
            </ul>
            <h6 className="mt-4 text-base font-semibold">
              Additional Coursework
            </h6>
            <ul className="list-disc pl-4">
              <div className="my-2 grid grid-cols-1 gap-1 md:grid-cols-2">
                <li>Calculus I & II</li>
                <li>Physics I & II</li>
                <li>Linear Algebra</li>
                <li>Discrete Mathematics</li>
                <li>Probability and Statistics</li>
                <li>Ethics in Technology</li>
                <li>Technical Communication</li>
              </div>
            </ul>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-4">
            <Link
              href="https://www.kennesaw.edu/degrees-programs/bachelor-degrees/software-engineering.php?major=Bachelor+of+Science+in+Software+Engineering+&url=https%3A%2F%2Fwww.kennesaw.edu%2Fdegrees-programs%2Fbachelor-degrees%2Fsoftware-engineering.php"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              <TbCertificate /> View Program Details
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled="true"
              className={cn(
                buttonVariants({ variant: 'link' }),
                'pointer-events-none opacity-50'
              )}
            >
              <TbDownload />
              View Transcript
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Employment */}
      <div className="flex flex-col gap-6 md:gap-8">
        <Heading size="sub">Employment</Heading>

        {sortedJobs.map((job, index) => (
          <Card key={index} className={hoverClasses}>
            <CardHeader className="relative flex flex-col">
              <div className="flex items-start gap-2">
                <Avatar className="size-12 border-2 border-muted">
                  <AvatarImage src={job.imageUrl!} alt={job.imageAlt!} />
                  <AvatarFallback>
                    {job.company
                      .split(' ')
                      .map((word) => word[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col">
                  <CardTitle className="text-lg font-semibold tracking-tight">
                    {job.title}
                  </CardTitle>
                  <p className="text-base text-muted-foreground">
                    {job.company}, <em className="text-sm">{job.location}</em>
                  </p>
                </div>
              </div>
              <CardDescription>
                <div className="flex flex-row">
                  <p className="text-sm text-muted-foreground">
                    {formatDate(job.startDate)} -{' '}
                    {job.endDate ? formatDate(job.endDate) : 'Present'}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    ({duration(job.startDate, job.endDate || undefined)})
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{job.description}</p>
              <h6 className="mt-4 mb-2 font-semibold">Key Skills</h6>
              <div className="flex flex-wrap items-center gap-2">
                {job.skills.split(',').map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="outline">
                    {skill.trim()}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certifications */}
      <div className="flex flex-col gap-6 md:gap-8">
        <Heading size="sub">Certifications</Heading>

        <Card className={hoverClasses}>
          <CardHeader className="relative flex flex-col">
            <div className="flex items-start gap-2">
              <Avatar className="size-12 border-2 border-muted">
                <AvatarImage src="/wz.png" alt="Woz U Logo" />
                <AvatarFallback>WZ</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <CardTitle className="text-lg font-semibold tracking-tight">
                  Non-Confrontational Interview Techniques
                </CardTitle>
                <p className="text-base text-muted-foreground">
                  Wicklander-Zulawski & Associates
                </p>
              </div>
            </div>
            <CardDescription>
              <div className="flex flex-row">
                <p className="text-sm text-muted-foreground">
                  Completed August - September, 2023
                </p>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <p className="text-sm leading-relaxed text-foreground">
              Completed intensive training in advanced interview and
              interrogation techniques, focusing on non-confrontational methods
              to elicit accurate and reliable information from subjects.
              Developed expertise in behavioral analysis, rapport-building, and
              ethical interviewing practices, enhancing investigative outcomes
              and ensuring compliance with legal standards. Applied learned
              techniques in real-world scenarios, contributing to successful
              investigations and improved security outcomes.
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-4">
            <Link
              href="https://www.w-z.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              <TbCertificate /> Course Details
            </Link>
            <Link
              href="/certifications/wx-non-confrontational-interview-and-interrogation-techniques.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              <TbDownload />
              View Certification
            </Link>
          </CardFooter>
        </Card>

        <Card className={hoverClasses}>
          <CardHeader className="relative flex flex-col">
            <div className="flex items-start gap-2">
              <Avatar className="size-12 border-2 border-muted">
                <AvatarImage src="/avade.png" alt="Avade Logo" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <CardTitle className="text-lg font-semibold tracking-tight">
                  AVADE® Retail Loss Prevention™
                </CardTitle>
                <p className="text-base text-muted-foreground">Avade®</p>
              </div>
            </div>
            <CardDescription>
              <div className="flex flex-row">
                <p className="text-sm text-muted-foreground">
                  Completed July 2025
                </p>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <p className="text-sm leading-relaxed text-foreground">
              Mastered advanced verbal de-escalation strategies to identify,
              prevent, and mitigate workplace aggression and violence. Trained
              in the use of reasonable and appropriate force, including physical
              restraints, blocking, and disengaging techniques to ensure
              personal and customer safety. Proficient in legal and safe
              handcuffing procedures and suspect apprehension according to
              established retail security standards.
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-4">
            <Link
              href="https://avadetraining.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              <TbCertificate /> Course Details
            </Link>
            <Link
              href="/certifications/avade-retail-loss-prevention.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              <TbDownload />
              View Certification
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Summary */}
      <div className="flex flex-col gap-6 md:gap-8">
        <Heading size="sub">Summary</Heading>
        <p className="text-base leading-relaxed text-foreground">
          I am a dedicated and results-driven software engineer with a strong
          foundation in full-stack development, cloud computing, and AI
          integration. My passion for technology and continuous learning drives
          me to stay updated with the latest industry trends and best practices.
          I am committed to delivering high-quality solutions that meet the
          needs of modern businesses and contribute to their success. With a
          collaborative mindset and a focus on innovation, I strive to make a
          positive impact in every project I undertake, ensuring that my work
          not only meets but exceeds expectations.
        </p>

        <div className="w-full rounded-xl bg-muted p-4 text-center">
          <Link
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'lg',
                className: 'w-full max-w-xs! justify-center md:max-w-none',
              })
            )}
          >
            <TbFileDownload />
            View My Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
