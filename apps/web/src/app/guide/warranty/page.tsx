import { ModalButton } from '@/components/modals/ModalButton';
import { CtaForm } from '@/components/sections/Cta';
import { PageHero } from '@/components/sections/Hero';
import { staticPhoto } from '@/components/ui/Photo';
import { CatalogRailSection, FaqSection, StepsSection } from '@/components/sections/Shared';
import { Section, SectionHeading } from '@/components/ui/layout';
import { Tile, TileGrid } from '@/components/ui/Tile';
import { routes } from '@/lib/routes';
import { pageMetadata } from '@/lib/page-meta';
import { PageSections } from '@/components/sections/PageSections';
import { OtherServices } from '@/components/sections/OtherServices';
import { getPage } from '@/lib/content';

export const generateMetadata = () =>
  pageMetadata(routes.warranty(), {
    title: '5-year warranty',
    description: 'Alderline covers its cabinetry with a 5-year warranty. What is included and how to make a claim.',
  });

export default async function WarrantyPage() {
  const page = await getPage(routes.warranty());
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Buyer\'s guide', href: routes.buyers() }, { label: 'Warranty' }]}
        title="Alderline's 5-year cabinetry warranty"
        lead="If a problem related to the build or the installed cabinetry comes up during the warranty period, contact Alderline and we'll review it."
        chips={['5-year warranty', 'Contact Alderline directly', 'Support after installation']}
        media="Photo: Alderline kitchen"
        image={staticPhoto('kitchen-34.jpg', 'Alderline kitchen')}
        actions={
          <ModalButton
            size="lg"
            modal={{
              type: 'lead',
              title: 'Ask a warranty question',
              form: { formId: 'warranty', submitLabel: 'Send question' },
            }}
          >
            Ask a warranty question
          </ModalButton>
        }
      />

      <PageSections lead={page?.lead} sections={page?.sections ?? []} />

      <Section>
        <SectionHeading
          title="What the warranty covers"
          subtitle="The warranty covers defects caused by manufacturing faults or errors in building and assembling the kitchen."
        />
        <TileGrid cols={4} className="mt-8">
          <Tile icon title="Cabinet boxes" text="Manufacturing defects in the carcasses, and flaws in edge finishing and joints." />
          <Tile icon title="Cabinet fronts" text="Finish defects, geometry faults and other build flaws." />
          <Tile icon title="Cabinet hardware" text="Hinges, drawer slides and lift mechanisms with manufacturing defects." />
          <Tile icon title="Build quality" text="The cabinetry matches the agreed design and the specifications in the contract." />
        </TileGrid>
      </Section>

      <StepsSection group="warranty" title="How to make a warranty claim" />

      <CtaForm
        title="Questions about your installed cabinetry?"
        text="Send a request and our specialist will help you sort it out."
        form={{ formId: 'warranty', layout: 'inline', submitLabel: 'Ask a question' }}
      />

      <CatalogRailSection title="Kitchens that last for years" subtitle="" />

      <FaqSection group="warranty" />

      <OtherServices current={routes.warranty()} />
    </>
  );
}
