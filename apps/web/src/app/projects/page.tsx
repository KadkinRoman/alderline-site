import type { Metadata } from 'next';
import { ProjectCase } from '@/components/sections/Cards';
import { QuizCta } from '@/components/sections/Cta';
import { PageHero } from '@/components/sections/Hero';
import { Section } from '@/components/ui/layout';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Our projects',
  description: 'Completed Alderline kitchens: style, layout, dimensions and cost.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Projects' }]}
        title="Our projects"
        lead="Completed Alderline kitchens: style, layout, dimensions and cost."
        media={null}
      />
      <Section spacing="none">
        {projects.map((p) => (
          <ProjectCase key={p.slug} project={p} />
        ))}
      </Section>
      <QuizCta />
    </>
  );
}
