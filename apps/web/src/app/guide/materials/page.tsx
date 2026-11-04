import { MaterialMixer } from '@/components/catalog/MaterialMixer';
import { ModalButton } from '@/components/modals/ModalButton';
import { CtaForm } from '@/components/sections/Cta';
import { PageHero } from '@/components/sections/Hero';
import { CatalogRailSection, FaqSection, StepsSection } from '@/components/sections/Shared';
import { Section, SectionHeading } from '@/components/ui/layout';
import { Photo, staticPhoto } from '@/components/ui/Photo';
import { Tile, TileGrid } from '@/components/ui/Tile';
import { getMaterials, getPage } from '@/lib/content';
import { routes } from '@/lib/routes';
import { pageMetadata } from '@/lib/page-meta';
import { PageSections } from '@/components/sections/PageSections';
import { OtherServices } from '@/components/sections/OtherServices';

export const generateMetadata = () =>
  pageMetadata(routes.materials(), {
    title: 'Kitchen materials',
    description: 'Cabinet fronts, carcasses, countertops, hardware and internal fittings to suit your style and budget.',
  });

export default async function MaterialsPage() {
  const [materials, page] = await Promise.all([getMaterials(), getPage(routes.materials())]);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Buyer\'s guide', href: routes.buyers() }, { label: 'Materials' }]}
        title="Kitchen materials for your style and budget"
        lead="We select cabinet fronts, carcasses, countertops, hardware and internal fittings with looks, practicality and cost in mind."
        chips={['A wide choice of finishes', 'Options at every price point', 'Mix and match materials']}
        media="Photo of material samples"
        image={staticPhoto('materials-kitchen.jpg', 'Sage green shaker kitchen with brass pendant lights')}
        actions={
          <ModalButton
            size="lg"
            modal={{ type: 'lead', title: 'Choose materials', form: { formId: 'materials', submitLabel: 'Choose materials' } }}
          >
            Choose materials
          </ModalButton>
        }
      />

      <PageSections lead={page?.lead} sections={page?.sections ?? []} />

      <Section>
        <SectionHeading title="Materials and components" subtitle="What you can choose for your kitchen." />
        <TileGrid cols={3} className="mt-8">
          {materials.map((m) => (
            <Tile
              key={m.slug}
              title={m.title}
              media={<Photo media={m.image} label={`Sample photos: ${m.title.toLowerCase()}`} sizes="(min-width: 1024px) 400px, 100vw" className="mb-4 min-h-44" />}
            />
          ))}
        </TileGrid>
      </Section>

      <StepsSection group="materials" title="How does material selection work?" />

      <Section>
        <SectionHeading
          title="Build your own kitchen"
          subtitle="Choose cabinet fronts, door profile and the type of wall cabinets, and the kitchen image will update."
        />
        <MaterialMixer />
      </Section>

      <CtaForm
        title="Not sure which materials to choose?"
        text="Show us your interior or a kitchen you like and we'll put together a similar combination for you."
        form={{ formId: 'materials', layout: 'inline', submitLabel: 'Get a consultation' }}
      />

      <CatalogRailSection title="See the kitchens our designers create at measurement visits" subtitle="" />

      <FaqSection group="materials" />

      <OtherServices current={routes.materials()} />
    </>
  );
}
