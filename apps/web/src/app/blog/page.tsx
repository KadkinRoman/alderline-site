import Link from 'next/link';
import { Suspense } from 'react';
import { ArticleList, ArticleListSkeleton } from '@/components/blog/ArticleList';
import { CtaForm } from '@/components/sections/Cta';
import { PageHero } from '@/components/sections/Hero';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading } from '@/components/ui/layout';
import { Photo, staticPhoto } from '@/components/ui/Photo';
import { getArticles } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { routes } from '@/lib/routes';
import { pageMetadata } from '@/lib/page-meta';

export const generateMetadata = () =>
  pageMetadata(routes.blog(), {
    title: 'Blog',
    description: 'Practical guides on choosing a kitchen: layouts, materials, storage, appliances and renovation.',
  });

export default async function BlogPage({ searchParams }: PageProps<'/blog'>) {
  const latest = await getArticles({ pageSize: 1 });
  const top = latest.items[0];

  return (
    <>
      {/* 1 · Hero */}
      <PageHero
        crumbs={[{ label: 'Blog' }]}
        title="The Alderline blog"
        lead="Practical guides on choosing a kitchen: layouts, materials, storage, appliances and renovation."
        sub="We answer the questions that come up before you order a kitchen and during the renovation."
        media="Alderline kitchen photo"
        image={staticPhoto('kitchen-03.jpg', 'Light modern kitchen')}
      />

      {/* 2 · Latest article */}
      {top && (
        <Section spacing="sm">
          <article className="grid items-center gap-8 lg:grid-cols-2">
            <Link href={routes.article(top.slug)} tabIndex={-1} aria-hidden>
              <Photo media={top.cover} label="Article cover" ratio="16/10" sizes="(min-width: 1024px) 600px, 100vw" />
            </Link>
            <div>
              <div className="text-sm text-fg-muted">
                {top.tag.name} · <time dateTime={top.publishedAt}>{formatDate(top.publishedAt)}</time>
              </div>
              <h2 className="mt-2 text-2xl font-semibold md:text-4xl">{top.title}</h2>
              <p className="mt-4 text-fg-muted">{top.excerpt}</p>
              <div className="mt-6">
                <Button href={routes.article(top.slug)}>Read the article</Button>
              </div>
            </div>
          </article>
        </Section>
      )}

      {/* 3 · Topics and articles (depend on ?tag=, so they stream) */}
      <Section id="articles">
        <SectionHeading title="Articles by topic" subtitle="Pick the topic that matters most to you right now." />
        <Suspense fallback={<ArticleListSkeleton />}>
          <ArticleList searchParams={searchParams} />
        </Suspense>
      </Section>

      {/* 4 · Quote request */}
      <CtaForm
        title="Planning a kitchen?"
        text="Send us your room dimensions or a reference image you like. A designer will help you work out which solution suits you best."
        form={{ formId: 'blog', submitLabel: 'Get a preliminary estimate' }}
      />

      {/* 5 · Checklist (final prototype) */}
      <CtaForm
        dark={false}
        title="Not sure where to start your kitchen renovation? Get the checklist"
        text="Leave your contact details and we'll send you a checklist for preparing your space for measurement and installation."
        form={{ formId: 'checklist', layout: 'inline', submitLabel: 'Get the checklist' }}
      />
    </>
  );
}
