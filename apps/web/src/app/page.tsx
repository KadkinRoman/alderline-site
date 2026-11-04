import { LeadForm } from '@/components/forms/LeadForm';
import { ModalButton } from '@/components/modals/ModalButton';
import { ProjectCase } from '@/components/sections/Cards';
import { CostEstimator } from '@/components/sections/CostEstimator';
import { CtaBox, FinalCta, QuizCta } from '@/components/sections/Cta';
import { HeroVideo } from '@/components/sections/Hero';
import { HeroPromos } from '@/components/sections/HeroPromos';
import { KitchenRail } from '@/components/sections/KitchenRail';
import { ProofStrip } from '@/components/sections/ProofStrip';
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
import { getHitKitchens, getProjects, getSettings } from '@/lib/content';
import { formatPrice } from '@/lib/format';
import { routes } from '@/lib/routes';
import { PRICE_FROM, REVIEW_SUMMARY } from '@/lib/trust';

/** Timeline of the home "order stages" (6 steps in the CMS) */
const STEP_LABELS = ['Day 1', 'Day 2–3', 'Week 1', 'Week 1', 'Weeks 2–4', 'Week 5'];

export default async function HomePage() {
  const [settings, projects, hits] = await Promise.all([getSettings(), getProjects(2), getHitKitchens(10)]);

  return (
    <>
      {/* 1 · Hero: specific value claim, price anchor, two clear actions, proof next to them */}
      <HeroVideo
        eyebrow="Custom kitchens · Portland, Oregon"
        title={
          <>
            Kitchens made to measure, <em className="text-on-inverse/80">built in our own workshop</em>
          </>
        }
        lead={`Designed around your room, built in Portland and installed in about five weeks. Complete kitchens from ${formatPrice(PRICE_FROM)}, with a 5-year warranty.`}
        aside={<HeroPromos />}
        actions={
          <>
            <Button href={`${routes.home()}#estimate`} variant="contrast" size="lg">
              Estimate my kitchen
            </Button>
            <Button href={routes.catalog()} variant="inverse" size="lg">
              Browse 30 designs
            </Button>
          </>
        }
        proof={
          <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>
              <span className="text-star" aria-hidden>
                ★★★★★{' '}
              </span>
              {REVIEW_SUMMARY.rating} from {REVIEW_SUMMARY.count} reviews
            </span>
            <span aria-hidden className="hidden h-4 w-px bg-on-inverse/25 sm:block" />
            <span>Free measurement &amp; 3D design</span>
            <span aria-hidden className="hidden h-4 w-px bg-on-inverse/25 sm:block" />
            <span>No-obligation quote in 48 hours</span>
          </span>
        }
      />

      {/* 2 · Proof points */}
      <ProofStrip />

      {/* 3 · Catalog */}
      <CatalogRailSection />

      {/* 4 · Cost estimator: the price question answered before the visitor has to ask */}
      <div className="bg-surface/60">
        <CostEstimator />
      </div>

      {/* 5 · Reviews */}
      <ReviewsSection />

      {/* 6 · Benefits (bento) */}
      <Section>
        <SectionHeading
          eyebrow="Why Alderline"
          title="One studio, from the first sketch to the last hinge"
          subtitle="No middlemen between your designer, the people who build your cabinets and the crew that installs them."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-6 md:gap-5">
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
            href={`${routes.about()}#team`}
            title="One team, start to finish"
            text="Designers, production engineers, a workshop crew and an installation team."
            more="Meet the team →"
            className="md:col-span-2"
          />
          <Tile
            icon
            href={routes.warranty()}
            title="5-year warranty"
            text="We stand behind every cabinet we build — and come back if something needs adjusting."
            more="About the warranty →"
            className="md:col-span-2"
          />
          <Tile
            icon
            href={routes.payment()}
            title="0% financing available"
            text="Spread the cost over 14 months, so you don't have to pay the full amount up front."
            more="Payment & financing →"
            className="md:col-span-2"
          />
        </div>
      </Section>

      {/* 7 · Process with a timeline */}
      <StepsSection
        group="home"
        eyebrow="How it works"
        title="Your kitchen in about five weeks"
        subtitle="A fixed price and a fixed installation date in your contract — no surprises halfway through."
        labels={STEP_LABELS}
      >
        <ModalButton
          size="lg"
          modal={{
            type: 'lead',
            title: 'Book a free design consultation',
            text: 'A designer will call you back, answer your questions and set up a free measurement and 3D design.',
            form: { formId: 'zamer', submitLabel: 'Book my consultation' },
          }}
        >
          Start with a free consultation
        </ModalButton>
      </StepsSection>

      {/* 8 · Our projects */}
      <Section>
        <SectionHeading
          eyebrow="Recent work"
          title="Kitchens we built this year"
          subtitle="Real layouts, real budgets: what the brief was, what we suggested and what it cost."
        />
        <div className="mt-4">
          {projects.map((p) => (
            <ProjectCase key={p.slug} project={p} />
          ))}
        </div>
        <Button href={routes.projects()} variant="secondary">
          View all projects
        </Button>
      </Section>

      {/* 9 · Lead form: compare quotes */}
      <CtaBox
        eyebrow="Price match"
        title="Already have a quote from another company? We'll beat it by up to 20%"
        text="Send us the sketch or the quote. We'll review the specification and come back with a like-for-like alternative and a cost estimate."
        aside={
          <ModalButton
            variant="contrast"
            size="lg"
            className="w-full"
            modal={{
              type: 'lead',
              title: "We'll beat your quote by up to 20%",
              text: 'Attach a sketch or a quote from another company. The Alderline team will suggest alternative specifications and a cost estimate.',
              form: { formId: 'compare', submitLabel: 'Send my quote' },
            }}
          >
            Send us your quote
          </ModalButton>
        }
      />

      {/* 10 · Offers */}
      <PromosRailSection />

      {/* 11 · Quiz */}
      <QuizCta />

      {/* 12 · Workshop */}
      <Section id="workshop">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading eyebrow="Made in Portland" title="The Alderline workshop" />
            <p className="mt-5 text-lg text-fg-muted">
              We build our kitchens ourselves. That lets us control every stage of production, from preparing parts to
              inspecting finished cabinets before they ship to your home.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={`${routes.about()}#workshop`}>Inside the workshop</Button>
              <Button href={routes.materials()} variant="secondary">
                Materials
              </Button>
            </div>
          </div>
          <Photo
            media={staticPhoto('workshop-1.jpg', 'Hand plane and wood shavings on the workbench')}
            label="Workshop"
            ratio="16/11"
            sizes="(min-width: 1024px) 620px, 100vw"
          />
        </div>
        <TileGrid cols={4} className="mt-10">
          <Tile title="Precision machining" text="CNC-cut panels with tolerances under a millimetre." />
          <Tile title="Quality control" text="Every cabinet is assembled and checked before delivery." />
          <Tile title="Experienced makers" text="We handle standard and highly custom projects alike." />
          <Tile title="Made to order" text="Your project defines the dimensions, materials and construction." />
        </TileGrid>
      </Section>

      {/* 13 · Measurement */}
      <CtaBox
        dark={false}
        eyebrow="Free, no obligation"
        title="Free measurement and 3D design"
        text="A designer measures your room and prepares a detailed 3D design on the spot. Within two hours you get several priced options to compare."
        actions={
          <Button href={routes.zamer()} variant="secondary">
            How the visit works
          </Button>
        }
        aside={
          <div className="rounded-card bg-paper p-5 shadow-card md:p-6">
            <h3 className="text-lg font-semibold">Book a designer visit</h3>
            <p className="mt-2 text-sm text-fg-muted">
              We bring material samples, measure your space and help you choose a layout.
            </p>
            <LeadForm formId="zamer" layout="inline" submitLabel="Book a measurement" className="mt-4" />
          </div>
        }
      />

      {/* 14 · Bestsellers */}
      <Section>
        <KitchenRail title="Most-ordered designs" subtitle="Kitchens our customers keep coming back to." kitchens={hits} />
      </Section>

      {/* 15 · Blog */}
      <BlogTeaserSection />

      {/* 16 · FAQ */}
      <FaqSection group="home" />

      {/* 17 · Final call to action */}
      <FinalCta
        title="Let's price your kitchen"
        text="Tell us about your space and what you have in mind. A designer will prepare a free preliminary estimate within 48 hours."
        socials={settings.socials}
      />
    </>
  );
}
