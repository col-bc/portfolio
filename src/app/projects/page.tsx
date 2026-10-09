import ProjectCard from '@/components/projectCard';
import { Heading } from '@/components/ui/heading';
import { getProjects } from '@/lib/project/projectDAL';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="flex flex-col gap-16 px-4 py-12 md:gap-20 lg:gap-24">
      <div className="flex flex-col gap-6 md:gap-8">
        <Heading>Projects</Heading>
        <p className="text-base leading-relaxed text-muted-foreground">
          A collection of my personal and professional projects, showcasing my
          skills and experience in software development. Each project includes a
          brief description, the technologies used, and links to the live demo
          or source code.
        </p>
      </div>

      {projects.map(
        (project, index) =>
          project.visible && (
            <ProjectCard
              key={project.id}
              project={project}
              reverse={index % 2 === 1}
            />
          )
      )}
    </section>
  );
}
