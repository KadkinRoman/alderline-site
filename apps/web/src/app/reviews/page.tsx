import { Suspense } from 'react';
import { ReviewsGrid, ReviewsGridSkeleton } from '@/components/reviews/ReviewsGrid';
import { CtaForm, QuizCta } from '@/components/sections/Cta';
import { PageHero } from '@/components/sections/Hero';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/layout';
import { getPage, getSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/page-meta';
import { routes } from '@/lib/routes';

export const generateMetadata = () =>
  pageMetadata(routes.reviews(), {
    title: 'Reviews',
    description: 'Alderline customer reviews: written and video reviews, with links to Google and Houzz.',
  });

/** Reviews page (final prototype): links to review platforms, a reviews grid with offers, a quiz and a call to action */
export default async function ReviewsPage({ searchParams }: PageProps<'/reviews'>) {
  const [settings, page] = await Promise.all([getSettings(), getPage(routes.reviews())]);

  return (
    <>
      {/* 1 · Heading and links to review platforms */}
      <PageHero
        crumbs={[{ label: 'Reviews' }]}
        title="Alderline customer reviews"
        lead={page?.lead ?? 'Video reviews and reviews from Google and Houzz. Every written review can be opened on its original platform.'}
        media={null}
        actions={settings.reviewLinks.map((l) => (
          <Button key={l.url} href={l.url} variant="secondary" external>
            {l.label}
          </Button>
        ))}
      />

      {/* 2 · Reviews grid (depends on ?page=, so it streams) */}
      <Section spacing="sm">
        <Suspense fallback={<ReviewsGridSkeleton />}>
          <ReviewsGrid searchParams={searchParams} period={settings.promoPeriod} />
        </Suspense>
      </Section>

      {/* 3 · Quiz */}
      <QuizCta />

      {/* 4 · Call to action */}
      <CtaForm
        title="Want a kitchen like these?"
        text="Leave your contact details and a designer will prepare a preliminary estimate for your space."
        form={{ formId: 'final', layout: 'inline', submitLabel: 'Get a quote' }}
      />
    </>
  );
}
