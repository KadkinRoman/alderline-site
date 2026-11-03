import { ModalButton } from '@/components/modals/ModalButton';
import { CtaForm } from '@/components/sections/Cta';
import { PageHero } from '@/components/sections/Hero';
import { staticPhoto } from '@/components/ui/Photo';
import { OtherServices } from '@/components/sections/OtherServices';
import { SectionTiles } from '@/components/sections/SectionTiles';
import { CatalogRailSection, FaqSection, StepsSection } from '@/components/sections/Shared';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/page-meta';
import { routes } from '@/lib/routes';

export const generateMetadata = () =>
  pageMetadata(routes.delivery(), {
    title: 'Delivery',
    description: 'Alderline kitchen delivery across the Portland metro area and the Willamette Valley.',
  });

/** Delivery page per the final prototype; the "How delivery works" tiles are sections of a "Page" entry */
export default async function DeliveryPage() {
  const page = await getPage(routes.delivery());

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Buyer\'s guide', href: routes.buyers() }, { label: 'Delivery' }]}
        title="We deliver your finished kitchen to your door"
        lead={page?.lead ?? 'Once production is complete, we agree a date and deliver your kitchen to the address you give us.'}
        chips={['Date agreed in advance', 'Careful transport', 'Free delivery within Portland metro']}
        media="Photo: kitchen delivery"
        image={staticPhoto('kitchen-30.jpg', 'Finished kitchen after delivery')}
        actions={
          <ModalButton
            size="lg"
            modal={{
              type: 'lead',
              title: 'Ask about delivery terms',
              text: 'Leave your contact details and the project address. The Alderline team will explain the delivery terms.',
              form: { formId: 'delivery', submitLabel: 'Ask about terms' },
            }}
          >
            Ask about delivery terms
          </ModalButton>
        }
      />

      <SectionTiles
        title="How kitchen delivery works"
        subtitle="We agree a convenient delivery date and time in advance so you can prepare your space for our crew. Every step is organized around the specifics of your order."
        sections={page?.sections ?? []}
        cols={5}
        numbered
      />

      <StepsSection group="delivery" title="How delivery works" />

      <CtaForm
        title="Want terms specific to your address?"
        text="Send a request and our specialist will answer all your questions in detail."
        form={{ formId: 'delivery', layout: 'inline', submitLabel: 'Ask about pricing' }}
      />

      <CatalogRailSection title="See finished Alderline projects" subtitle="" />

      <FaqSection group="delivery" />

      <OtherServices current={routes.delivery()} />
    </>
  );
}
