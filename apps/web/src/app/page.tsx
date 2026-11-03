import { LeadForm } from '@/components/forms/LeadForm';
import { ModalButton } from '@/components/modals/ModalButton';
import { ProjectCase } from '@/components/sections/Cards';
import { CtaBox, FinalCta, QuizCta } from '@/components/sections/Cta';
import { HeroVideo } from '@/components/sections/Hero';
import { HeroPromos } from '@/components/sections/HeroPromos';
import { KitchenRail } from '@/components/sections/KitchenRail';
import {
  BlogTeaserSection,
  CatalogRailSection,
  FaqSection,
  PromosRailSection,
  ReviewsSection,
  StepsSection,
} from '@/components/sections/Shared';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading } from '@/components/ui/layout';
import { Photo, staticPhoto } from '@/components/ui/Photo';
import { Tile, TileGrid } from '@/components/ui/Tile';
import { getHitKitchens, getMainPromo, getProjects, getSettings } from '@/lib/content';
import { promoTerm } from '@/lib/format';
import { routes } from '@/lib/routes';

export default async function HomePage() {
  const [settings, mainPromo, projects, hits] = await Promise.all([
    getSettings(),
    getMainPromo(),
    getProjects(2),
    getHitKitchens(10),
  ]);

  return (
    <>
      {/* 1 · Hero */}
      <HeroVideo
        title="Custom kitchens in Portland, OR"
        lead="We design your kitchen around your space, build it in our own workshop and install it start to finish."
        aside={<HeroPromos />}
        actions={
          <>
            <Button href={routes.catalog()} variant="contrast" size="lg">
              Find your kitchen
            </Button>
            {mainPromo && (
              <ModalButton
                variant="inverse"
                size="lg"
                modal={{
                  type: 'promo',
                  title: mainPromo.title,
                  text: mainPromo.text,
                  term: promoTerm(mainPromo.endsAt, settings.promoPeriod),
                }}
              >
                Claim your {mainPromo.title.toLowerCase()}
              </ModalButton>
            )}
          </>
        }
      />

      {/* 2 · Catalog */}
      <CatalogRailSection />

      {/* 3 · Reviews */}
      <ReviewsSection />

      {/* 4 · Benefits (bento) */}
      <Section>
        <SectionHeading title="Why choose Alderline" subtitle="Everything your kitchen needs, in one place." />
        <div className="mt-8 grid gap-4 md:grid-cols-6 md:gap-5">
          <Tile
            dark
            icon
            href={routes.zamer()}
            title="Free measurement and 3D design"
            text="A designer visits with samples, measures your space and prepares a design tailored to it."
            more="About measurement →"
            className="md:col-span-3"
          />
          <Tile
            icon
            href={`${routes.about()}#workshop`}
            title="Our own workshop"
            text="We build the cabinetry ourselves and control quality at every stage."
            more="About the workshop →"
            className="md:col-span-3"
          />
          <Tile
            icon
            href="/about#team"
            title="Experienced specialists"
            text="Designers, production engineers, a workshop crew and an installation team."
            more="Meet the team →"
            className="md:col-span-2"
          />
          <Tile
            icon
            href={routes.warranty()}
            title="5-year warranty"
            text="We stand behind every cabinet we build."
            more="About the warranty →"
            className="md:col-span-2"
          />
          <Tile
            icon
            href={routes.payment()}
            title="Financing"
            text="Flexible payment options, so you don't have to pay the full amount up front."
            more="Payment & financing →"
            className="md:col-span-2"
          />
        </div>
      </Section>

      {/* 5 · Lead form: compare quotes */}
      <CtaBox
        title="Already have a quote from another company? We'll offer a version up to 20% less"
        text="If you already have a sketch or a quote for your kitchen, send it to us. The Alderline team will review it and suggest alternative specifications and a cost estimate."
        aside={
          <ModalButton
            variant="contrast"
            size="lg"
            className="w-full"
            modal={{
              type: 'lead',
              title: 'We\'ll offer a version up to 20% less',
              text: 'Attach a sketch or a quote from another company. The Alderline team will suggest alternative specifications and a cost estimate.',
              form: { formId: 'compare', submitLabel: 'Claim this offer' },
            }}
          >
            Claim this offer
          </ModalButton>
        }
      />

      {/* 6 · Offers */}
      <PromosRailSection />

      {/* 7 · Estimate (quiz) */}
      <QuizCta />

      {/* 8 · Workshop */}
      <Section id="workshop">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="The Alderline workshop in Portland" />
            <p className="mt-4 text-lg">
              We build our kitchens ourselves. That lets us control every stage of production, from preparing parts
              to inspecting finished cabinets before they ship to the customer.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`${routes.about()}#workshop`}>Learn more about the workshop</Button>
              <Button href={routes.materials()} variant="secondary">
                Materials
              </Button>
            </div>
          </div>
          <Photo media={staticPhoto('workshop-1.jpg', 'Hand plane and wood shavings on the workbench')} label="Workshop" ratio="16/10" sizes="(min-width: 1024px) 600px, 100vw" />
        </div>
        <TileGrid cols={4} className="mt-8">
          <Tile title="Modern equipment" text="Precise machining and consistent quality." />
          <Tile title="Quality control" text="We inspect every part of your kitchen before delivery and installation." />
          <Tile title="Experienced specialists" text="We handle standard and highly custom projects alike." />
          <Tile title="Made to order" text="Your project defines the dimensions, materials and construction." />
        </TileGrid>
      </Section>

      {/* 9 · Our projects */}
      <Section>
        <SectionHeading title="Our projects" subtitle="Over 1,000 Alderline kitchens built: style, layout, dimensions and cost." />
        <div className="mt-4">
          {projects.map((p) => (
            <ProjectCase key={p.slug} project={p} />
          ))}
        </div>
        <Button href={routes.projects()} variant="secondary">
          View all projects
        </Button>
      </Section>

      {/* 10 · Order stages */}
      <StepsSection group="home" title="From idea to finished kitchen" />

      {/* 11 · Measurement */}
      <CtaBox
        dark={false}
        title="Free measurement and 3D design"
        text="We measure for free and prepare a detailed 3D design for you on the spot. Within two hours your designer will price several options and help you choose materials, hardware and colors."
        actions={
          <Button href={routes.zamer()} variant="secondary">
            Learn about the service
          </Button>
        }
        aside={
          <div className="rounded-card bg-bg p-5 md:p-6">
            <h3 className="text-lg font-semibold">Not sure where to start? Invite a designer for a free measurement</h3>
            <p className="mt-2 text-sm text-fg-muted">
              A specialist will bring material samples, measure your space and help you choose a layout.
            </p>
            <LeadForm formId="zamer" layout="inline" submitLabel="Book a measurement" className="mt-4" />
          </div>
        }
      />

      {/* 12 · Bestsellers */}
      <Section>
        <KitchenRail title="Our bestsellers" subtitle="Designs our customers have put to the test." kitchens={hits} />
      </Section>

      {/* 13 · Lead form: quiz */}
      <CtaBox
        title="Not sure which kitchen is right for you?"
        text="Take the quiz and we'll match you with the right kitchen. It takes under a minute, and you'll get our full kitchen catalog and a 3D design of your kitchen."
        aside={
          <ModalButton variant="contrast" size="lg" className="w-full" modal={{ type: 'quiz' }}>
            Get an estimate
          </ModalButton>
        }
      />

      {/* 14 · Blog */}
      <BlogTeaserSection />

      {/* 15 · FAQ */}
      <FaqSection group="home" />

      {/* 16 · Final call to action */}
      <FinalCta
        title="Let's price your kitchen"
        text="Tell us about your space and what you have in mind. A designer will prepare a free preliminary estimate and suggest the best specification options."
        socials={settings.socials}
      />
    </>
  );
}
