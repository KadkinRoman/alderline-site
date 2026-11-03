import { ModalButton } from '@/components/modals/ModalButton';
import { CtaForm } from '@/components/sections/Cta';
import { PageHero } from '@/components/sections/Hero';
import { staticPhoto } from '@/components/ui/Photo';
import { CatalogRailSection, FaqSection } from '@/components/sections/Shared';
import { Section, SectionHeading } from '@/components/ui/layout';
import { Tile, TileGrid } from '@/components/ui/Tile';
import { routes } from '@/lib/routes';
import { pageMetadata } from '@/lib/page-meta';
import { PageSections } from '@/components/sections/PageSections';
import { OtherServices } from '@/components/sections/OtherServices';
import { getPage } from '@/lib/content';

export const generateMetadata = () =>
  pageMetadata(routes.zamer(), {
    title: 'Measurement & design',
    description: 'Free kitchen measurement and 3D design in Portland, OR. A specialist visits with material samples.',
  });

export default async function ZamerPage() {
  const page = await getPage(routes.zamer());
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Buyer\'s guide', href: routes.buyers() }, { label: 'Measurement & design' }]}
        title="Measurement & design"
        lead="A specialist visits with material samples, measures your space and helps you choose a layout. We base the design on real measurements."
        chips={['Free measurement', 'Accurate measurements', 'Utilities accounted for', 'Designed for your actual space']}
        media="Photo: specialist taking measurements"
        image={staticPhoto('kitchen-23.jpg', 'Kitchen designed to measure')}
        actions={
          <ModalButton
            size="lg"
            modal={{ type: 'lead', title: 'Book a measurement', form: { formId: 'zamer', submitLabel: 'Book a measurement' } }}
          >
            Book a measurement
          </ModalButton>
        }
      />

      <PageSections lead={page?.lead} sections={page?.sections ?? []} />

      <Section>
        <SectionHeading title="What do measurement and design include?" />
        <TileGrid cols={5} className="mt-8">
          <Tile number="1" title="Room measurement" text="Wall lengths, ceiling height, corners, alcoves and other features." />
          <Tile number="2" title="Utilities check" text="Outlets, water, drainage, ventilation and appliances." />
          <Tile number="3" title="Layout discussion" text="Work zones, storage and appliances." />
          <Tile number="4" title="Material selection" text="Cabinet fronts, carcass, countertop and hardware." />
          <Tile number="5" title="Design preparation" text="A kitchen design based on your room's real dimensions." />
        </TileGrid>
      </Section>

      <Section>
        <SectionHeading title="Key terms" />
        <TileGrid cols={4} className="mt-8">
          <Tile title="Specialist visit" text="By appointment." />
          <Tile title="Sketch" text="Prepared after the measurement and design discussion." />
          <Tile title="Materials" text="Can be discussed directly with the specialist." />
          <Tile title="Price estimate" text="Based on the dimensions and the specification you choose." />
        </TileGrid>
      </Section>

      <Section>
        <SectionHeading title="Why measure before the final design" />
        <TileGrid cols={4} className="mt-8">
          {['Accurate measurements', 'Utilities accounted for', 'Technical constraints checked', 'Designed for your actual space'].map(
            (t) => (
              <Tile key={t} icon title={t} />
            ),
          )}
        </TileGrid>
      </Section>

      <CtaForm
        title="Don't give up on the kitchen you want"
        text="Beautiful cabinet fronts, smart storage, quality hardware. Tell us what you're after and we'll price your project with a special discount."
        form={{ formId: 'zamer', layout: 'inline', submitLabel: 'Price my kitchen' }}
      />

      <CatalogRailSection title="See the kitchens our designers create at measurement visits" subtitle="" />

      <FaqSection group="measurement" />

      <OtherServices current={routes.zamer()} />
    </>
  );
}
