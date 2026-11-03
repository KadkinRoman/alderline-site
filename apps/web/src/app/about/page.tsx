import { ModalButton } from '@/components/modals/ModalButton';
import { Ticker } from '@/components/sections/Blocks';
import { CtaForm, FinalCta } from '@/components/sections/Cta';
import { PageHero } from '@/components/sections/Hero';
import { Rail } from '@/components/sections/Rail';
import {
  CatalogRailSection,
  GuaranteesSection,
  ReviewsSection,
  StepsSection,
} from '@/components/sections/Shared';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading } from '@/components/ui/layout';
import { Avatar, Photo, staticPhoto } from '@/components/ui/Photo';
import { Tile, TileGrid } from '@/components/ui/Tile';
import { getMaterials, getSettings, getTeam } from '@/lib/content';
import { routes } from '@/lib/routes';
import { pageMetadata } from '@/lib/page-meta';

export const generateMetadata = () =>
  pageMetadata(routes.about(), {
    title: 'About us',
    description: 'Alderline builds custom kitchens and built-in storage in Portland, OR. Our own workshop, a 5-year warranty.',
  });

export default async function AboutPage() {
  const [settings, materials, team] = await Promise.all([getSettings(), getMaterials(), getTeam()]);

  return (
    <>
      {/* 1 · Hero */}
      <PageHero
        crumbs={[{ label: 'About' }]}
        title="Alderline: custom kitchens and storage in Portland, OR"
        lead="We design, build and install kitchens to fit your space, your family's habits and your budget."
        media="Workshop"
        image={staticPhoto('workshop-1.jpg', 'Hand plane and wood shavings on the workbench')}
        actions={
          <>
            <Button href={routes.catalog()} size="lg">
              Browse the catalog
            </Button>
            <ModalButton size="lg" variant="secondary" modal={{ type: 'lead', title: 'Get an estimate' }}>
              Get an estimate
            </ModalButton>
          </>
        }
      >
        <TileGrid cols={4} className="mt-8">
          {['Our own workshop', '5-year warranty', 'Free 3D design', 'Built in 5 weeks or less'].map(
            (t) => (
              <Tile key={t} title={t} />
            ),
          )}
        </TileGrid>
      </PageHero>

      {/* 2 · Why choose us */}
      <Section>
        <SectionHeading title="Why choose Alderline" />
        <TileGrid cols={3} className="mt-8">
          <Tile icon title="Our own workshop" text="We control the process from preparing parts to the finished piece." />
          <Tile icon title="Designed for your exact space" text="Unusual dimensions, alcoves, bulkheads and tricky layouts." />
          <Tile icon title="A wide choice of materials" text="Cabinet fronts, countertops, hardware and fittings to suit your style and budget." />
          <Tile icon title="Checked at every stage" text="We verify measurements, the design, the specification and quality before delivery." />
          <Tile icon title="5-year warranty" text="We stand behind your cabinetry after installation." />
          <Tile icon title="No middlemen" text="Design, production and installation all happen under one roof." />
        </TileGrid>
      </Section>

      {/* 3 · Numbers */}
      <Section spacing="sm" bleed>
        <Ticker
          items={[
            ['5 years', 'warranty'],
            ['from 5 weeks', 'to build'],
            ['700+', 'finish options'],
            ['300+', 'door profile options'],
            ['1,000+', 'kitchens built'],
            ['15–20 years', 'service life'],
            ['10+ years', 'of experience'],
          ]}
        />
      </Section>

      {/* 4 · Workshop */}
      <Section id="workshop">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="We build everything ourselves" />
            <p className="mt-4 text-lg">
              The Alderline workshop is in Portland&apos;s Central Eastside. That lets us control lead times, materials and
              build quality without handing orders to outside contractors.
            </p>
            <div className="mt-6">
              <Button href={routes.materials()} variant="secondary">
                Materials
              </Button>
            </div>
          </div>
          <Photo media={staticPhoto('workshop-2.jpg', 'Solid wood boards in the workshop')} label="Workshop" ratio="16/10" sizes="(min-width: 1024px) 600px, 100vw" />
        </div>
        <TileGrid cols={4} className="mt-8">
          {(
            [
              ['Modern equipment', 'workshop-3.jpg'],
              ['Quality control', 'workshop-4.jpg'],
              ['Materials storage', 'materials.jpg'],
              ['In-house team', 'workshop-1.jpg'],
            ] as const
          ).map(([t, img]) => (
            <Tile key={t} title={t} media={<Photo media={staticPhoto(img, t)} label={t} sizes="300px" className="mb-4 min-h-36" />} />
          ))}
        </TileGrid>
      </Section>

      {/* 5 · Team */}
      <Section id="team">
        <Rail
          title="The people behind your kitchen"
          subtitle="Every project has a dedicated team, from the first layout discussion to the final installation."
          variant="team"
        >
          {['kitchen-23.jpg', 'kitchen-17.jpg', 'kitchen-30.jpg', 'kitchen-03.jpg', 'kitchen-34.jpg'].map((img, n) => (
            <Photo key={img} media={staticPhoto(img, `Alderline project ${n + 1}`)} label={`Project photo ${n + 1}`} sizes="(min-width: 1024px) 520px, 85vw" className="min-h-72 md:min-h-96" />
          ))}
        </Rail>
        {/* Staff cards from Strapi ("Employee", isTeam) → the "Employee" modal */}
        <TileGrid cols={4} className="mt-8">
          {team.map((e) => (
            <ModalButton key={e.id} unstyled modal={{ type: 'employee', employee: e }} className="h-full text-left">
              <Tile title={e.name} text={e.role} media={<Avatar name={e.name} media={e.photo} className="mb-4 size-20 text-2xl" />} more="Learn more →" />
            </ModalButton>
          ))}
        </TileGrid>
      </Section>

      {/* 6 · Lead form: measurement */}
      <CtaForm
        title="Request a free measurement"
        text="Our designer will visit with material samples and help you find a solution that suits your interior."
        actions={
          <Button href={routes.zamer()} variant="inverse">
            About the service
          </Button>
        }
        form={{ formId: 'zamer', layout: 'inline', submitLabel: 'Get an estimate with a discount' }}
      />

      {/* 7 · How we work */}
      <StepsSection group="about" title="From idea to finished kitchen">
        <Button href={routes.zamer()} variant="secondary">
          Learn more about measurement
        </Button>
      </StepsSection>

      {/* 8 · What is included */}
      <Section>
        <SectionHeading title="What Alderline includes" />
        <TileGrid cols={3} className="mt-8">
          <Tile title="A custom design" text="Cabinetry built to your room's dimensions, not an off-the-shelf modular set." />
          <Tile title="Material selection" text="Cabinet fronts, hardware, countertop and internal fittings." />
          <Tile title="3D visualization" text="See how your kitchen will look before it goes into production." />
          <Tile title="Agreed specification" text="The scope of the project is fixed before you sign the contract." />
          <Tile title="Delivery and installation" text="We deliver, assemble and adjust your kitchen on site." />
          <Tile title="5-year warranty" text="We stand behind the cabinetry we build and install." />
        </TileGrid>
      </Section>

      {/* 9 · Catalog */}
      <CatalogRailSection />

      {/* 10 · Reviews */}
      {/* "See more reviews" → the Reviews page */}
      <ReviewsSection />

      {/* 11 · Materials */}
      <Section>
        <SectionHeading
          title="Materials and components"
          subtitle="Your designer helps you choose a combination based not only on looks, but also on cost, durability and how the kitchen will be used."
        />
        <TileGrid cols={5} className="mt-8">
          {materials.slice(0, 5).map((m) => (
            <Tile key={m.slug} title={m.title} media={<Photo media={m.image} label={m.title} sizes="240px" className="mb-4 min-h-28" />} />
          ))}
        </TileGrid>
        <div className="mt-6">
          <Button href={routes.materials()} variant="secondary">
            Learn more about materials
          </Button>
        </div>
      </Section>

      {/* 12 · Guarantees */}
      <GuaranteesSection
        title="Alderline stands behind the result"
        withLink={false}
        items={[
          '5-year warranty',
          'Price and specification are fixed in the contract',
          'The design is approved before production',
          'Built in our own workshop',
          'Quality control before delivery',
        ]}
      />

      {/* 13 · Final call to action */}
      <FinalCta
        title="Let's talk about your future kitchen"
        text="Tell us what you're after. A designer will help with the layout, materials and a preliminary estimate."
        socials={settings.socials}
      />
    </>
  );
}
