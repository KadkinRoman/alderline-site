import Link from 'next/link';
import { Suspense } from 'react';
import { LeadForm } from '@/components/forms/LeadForm';
import { ModalButton } from '@/components/modals/ModalButton';
import { PromoCard } from '@/components/sections/Cards';
import { CtaBox, FinalCta } from '@/components/sections/Cta';
import { Rail } from '@/components/sections/Rail';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Container, Section, SectionHeading } from '@/components/ui/layout';
import { Photo, staticPhoto } from '@/components/ui/Photo';
import { Tile, TileGrid } from '@/components/ui/Tile';
import {
  getKitchenCategories,
  getKitchenFilterOptions,
  getPromos,
  getSettings,
} from '@/lib/content';
import type { KitchenCategory } from '@/lib/content/types';
import { cn } from '@/lib/cn';
import { routes } from '@/lib/routes';
import { CatalogFilters } from './CatalogFilters';
import { CatalogResults, CatalogResultsSkeleton, type CatalogSearchParams } from './CatalogResults';

export type { CatalogSearchParams };

export async function CatalogView({
  category,
  searchParams,
}: {
  category?: KitchenCategory;
  searchParams: Promise<CatalogSearchParams>;
}) {
  const [categories, options, promos, settings] = await Promise.all([
    getKitchenCategories(),
    getKitchenFilterOptions(),
    getPromos(),
    getSettings(),
  ]);

  const crumbs: Crumb[] = category
    ? [{ label: 'Catalog', href: routes.catalog() }, { label: category.name }]
    : [{ label: 'Catalog' }];

  return (
    <>
      {/* 1 · Heading, categories and filters */}
      <section className="pt-6 pb-8">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 text-3xl font-semibold md:text-5xl">
            {category ? category.name : 'Alderline kitchen catalog'}
          </h1>
          <p className="mt-3 max-w-3xl text-fg-muted md:text-lg">
            Completed projects you can adapt to your space, materials, appliances and budget.
          </p>

          <nav aria-label="Catalog categories" className="mt-6">
            <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
              {[{ slug: '', name: 'All' }, ...categories].map((c) => {
                const active = (category?.slug ?? '') === c.slug;
                return (
                  <li key={c.slug || 'all'} className="shrink-0">
                    <Link
                      href={c.slug ? routes.category(c.slug) : routes.catalog()}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'inline-flex min-h-10 items-center rounded-control border px-4 text-sm transition-colors',
                        active ? 'border-fg bg-fg text-bg' : 'border-line hover:border-fg',
                      )}
                    >
                      {c.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-6">
            <Suspense>
              <CatalogFilters options={options} />
            </Suspense>
          </div>
        </Container>
      </section>

      {/* 2 · Offers in the catalog — a rail of compact cards (final prototype) */}
      <Section spacing="sm">
        <Rail title="Choose a special offer for your new kitchen" variant="wide" ariaLabel="Offers">
          {promos.map((p) => (
            <PromoCard key={p.slug} promo={p} showTerm period={settings.promoPeriod} />
          ))}
        </Rail>
      </Section>

      {/* 3 · Kitchen cards (depend on URL filters — streamed) */}
      <Section spacing="sm">
        <Suspense fallback={<CatalogResultsSkeleton />}>
          <CatalogResults category={category?.slug} searchParams={searchParams} />
        </Suspense>
      </Section>

      {/* 4 · Send a photo of a kitchen */}
      <CtaBox
        dark={false}
        title="Send us a photo of a kitchen you like"
        text="From our catalog or from anywhere else. We will price a similar project for your dimensions and budget."
        aside={<LeadForm formId="catalog-photo" layout="inline" submitLabel="Get a quote" />}
      />

      {/* 5 · Quote comparison: photo of the estimate, three steps, button (final prototype) */}
      <CtaBox
        title="Already have a quote from another company? We can offer an option up to 20% cheaper"
        text="Send us the estimate or design. We will compare materials and specification and propose our own option."
        actions={
          <ModalButton
            variant="contrast"
            size="lg"
            modal={{
              type: 'lead',
              title: 'We can offer an option up to 20% cheaper',
              text: 'Attach your estimate or design. We will compare materials and specification and propose our own option.',
              form: { formId: 'compare', submitLabel: 'Get an offer' },
            }}
          >
            Get an offer
          </ModalButton>
        }
        aside={
          <div className="grid gap-4">
            <Photo media={staticPhoto('kitchen-36.jpg', 'Kitchen estimate example')} label="Photo of the estimate" ratio="16/10" sizes="(min-width: 1024px) 480px, 100vw" />
            <ol className="grid gap-2 text-sm sm:grid-cols-3">
              {['Send your estimate or design', 'We compare materials and specification', 'We propose our own option'].map((step, i) => (
                <li key={step} className="rounded-card bg-on-inverse/10 p-3">
                  <b className="text-on-inverse-muted">0{i + 1}</b>
                  <div className="mt-1">{step}</div>
                </li>
              ))}
            </ol>
          </div>
        }
      />

      {/* 6 · Lock in the terms */}
      <Section>
        <TileGrid cols={2}>
          <Tile
            title="Lock in current terms"
            text="Material prices and offer terms can change. Send a request to get a quote based on the current specification."
            footer={
              <div className="mt-5">
                <ModalButton
                  modal={{
                    type: 'lead',
                    title: 'Lock in my price',
                    text: 'Leave your contact details and we will prepare a quote based on the current specification and offer terms.',
                    form: { submitLabel: 'Lock in my price' },
                  }}
                >
                  Lock in my price
                </ModalButton>
              </div>
            }
          />
          <Tile
            title="Can't find the right kitchen?"
            text="We will create a project from scratch for your space, style and budget."
            footer={
              <div className="mt-5">
                <ModalButton
                  variant="secondary"
                  modal={{
                    type: 'lead',
                    title: 'Custom kitchen design',
                    text: 'Tell us about your space and wishes. A designer will create a project from scratch.',
                    form: { submitLabel: 'Order a custom design' },
                  }}
                >
                  Order a custom design
                </ModalButton>
              </div>
            }
          />
        </TileGrid>
      </Section>

      {/* 7 · Final call to action */}
      <FinalCta
        title="We will price a kitchen for your space"
        text="Answer a few questions or send us your dimensions. We will prepare a price and specification options."
        socials={settings.socials}
        aside={
          <ModalButton variant="contrast" size="lg" className="w-full" modal={{ type: 'quiz' }}>
            Get a quote
          </ModalButton>
        }
      />

      {category?.description && (
        <Section>
          <SectionHeading title={category.name} />
          <p className="mt-4 max-w-3xl text-fg-muted">{category.description}</p>
        </Section>
      )}
    </>
  );
}
