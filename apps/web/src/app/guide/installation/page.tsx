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
  pageMetadata(routes.installation(), {
    title: 'Installation',
    description: 'Kitchen assembly and installation by the Alderline crew.',
  });

/** Installation page per the final prototype; "Basic installation" and "Extras" are sections of a "Page" entry */
export default async function InstallationPage() {
  const page = await getPage(routes.installation());

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Buyer\'s guide', href: routes.buyers() }, { label: 'Installation' }]}
        title="Kitchen installation by the Alderline crew"
        lead={
          page?.lead ??
          'After delivery, our installers assemble the cabinetry, fit every element of the kitchen and check the result before handing it over.'
        }
        chips={['Installed to the design', 'Door alignment', 'Final inspection']}
        media="Photo: kitchen installation"
        image={staticPhoto('kitchen-17.jpg', 'Installed island kitchen')}
        actions={
          <ModalButton
            size="lg"
            modal={{
              type: 'lead',
              title: 'Learn about installation',
              text: 'Leave your contact details and an Alderline specialist will explain how your kitchen will be installed.',
              form: { formId: 'installation', submitLabel: 'Learn more' },
            }}
          >
            Learn more about installation
          </ModalButton>
        }
      />

      <SectionTiles
        title="What does basic installation include?"
        subtitle="Every Alderline kitchen is built to a custom design, so the scope of installation work can vary. We split installation into basic assembly and extra work so you know up front what is included and what may cost extra."
        sections={page?.sections ?? []}
        cols={2}
      />

      <StepsSection group="installation" title="How installation works" />

      <CtaForm
        title="Questions about preparing your space?"
        text="Send a request and our specialist will answer all your questions in detail."
        form={{ formId: 'installation', layout: 'inline', submitLabel: 'Get a consultation' }}
      />

      <CatalogRailSection title="See finished Alderline projects" subtitle="" />

      <FaqSection group="installation" />

      <OtherServices current={routes.installation()} />
    </>
  );
}
