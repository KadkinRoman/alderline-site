import { ModalButton } from '@/components/modals/ModalButton';
import { CostEstimator } from '@/components/sections/CostEstimator';
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
  pageMetadata(routes.payment(), {
    title: 'Payment & financing',
    description: 'Pay for your kitchen in full, in stages or with financing. Terms are fixed in the contract.',
  });

export default async function PaymentPage() {
  const page = await getPage(routes.payment());
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Buyer\'s guide', href: routes.buyers() }, { label: 'Payment & financing' }]}
        title="Choose the way to pay that suits you"
        lead="You can pay in full, in stages, or arrange financing. Our team will explain the terms in advance and record your chosen option in the contract."
        chips={['Several payment options', 'Pay in stages', 'Financing available']}
        media="Photo: consultation with our team"
        image={staticPhoto('kitchen-09.jpg', 'Kitchen with an island')}
        actions={
          <ModalButton
            size="lg"
            modal={{ type: 'lead', title: 'Explore payment options', form: { formId: 'payment', submitLabel: 'Explore options' } }}
          >
            Explore payment options
          </ModalButton>
        }
      />

      <PageSections lead={page?.lead} sections={page?.sections ?? []} />

      <Section>
        <SectionHeading title="Pick the payment option that fits" />
        <TileGrid cols={5} className="mt-8">
          <Tile icon title="Pay in stages" text="Payments tied to the stages of building your kitchen." />
          <Tile icon title="Pay in full" text="The whole order cost in a single payment." />
          <Tile
            icon
            title="Financing"
            text="Several payments under an available program."
            footer={
              <ModalButton modal={{ type: 'installment' }} unstyled className="mt-3 text-left text-sm underline underline-offset-2">
                Financing terms
              </ModalButton>
            }
          />
          <Tile icon title="Card or bank transfer" text="By bank card or by transfer using our bank details." />
          <Tile icon title="Cash or check" text="At the showroom or by another agreed method." />
        </TileGrid>
      </Section>

      <StepsSection group="payment" title="How payment works" />

      <div className="bg-surface/60">
        <CostEstimator />
      </div>

      <CtaForm
        title="Not sure which option to choose?"
        text="Tell our team about your project and how you'd like to pay. We'll help you understand the available options."
        form={{ formId: 'payment', layout: 'inline', submitLabel: 'Get a consultation' }}
      />

      <CatalogRailSection title="Kitchens for every budget" subtitle="" />

      <FaqSection group="payment" />

      <OtherServices current={routes.payment()} />
    </>
  );
}
