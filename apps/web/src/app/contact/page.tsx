import { ModalButton } from '@/components/modals/ModalButton';
import { LinksRow } from '@/components/sections/Blocks';
import { CtaBox, CtaForm } from '@/components/sections/Cta';
import { PageHero } from '@/components/sections/Hero';
import { PageSections } from '@/components/sections/PageSections';
import { Button } from '@/components/ui/Button';
import { Section, SectionHeading } from '@/components/ui/layout';
import { Photo, staticPhoto } from '@/components/ui/Photo';
import { Tile, TileGrid } from '@/components/ui/Tile';
import { getPage, getSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/page-meta';
import { routes } from '@/lib/routes';

export const generateMetadata = () =>
  pageMetadata(routes.contacts(), {
    title: 'Contact',
    description: 'Phone, address and messengers for Alderline, custom kitchens in Portland, OR.',
  });

const CONSULTATION = [
  ['Discuss your layout', 'Go over your room dimensions and the options for placing the kitchen.'],
  ['Explore materials', 'Compare cabinet fronts, countertops and colors.'],
  ['Get a price', 'Receive a preliminary estimate for your project.'],
  ['Book a measurement', 'Agree on the next step.'],
] as const;

const linkClass = 'mt-4 inline-block text-sm font-medium underline-offset-2 hover:underline';

/** Contact page per the final prototype, plus a "Company details" block from the site settings */
export default async function ContactsPage() {
  const [s, page] = await Promise.all([getSettings(), getPage(routes.contacts())]);
  const c = s.company;
  const details: [string, string | undefined][] = [
    ['Legal name', c?.legalName],
    ['Registration no.', c?.registrationNumber],
    ['Tax ID', c?.taxId],
    ['Registered address', c?.legalAddress],
  ];

  return (
    <>
      {/* 1 · Contact */}
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        title="Contact Alderline"
        lead={page?.lead ?? 'Reach us whichever way suits you, or drop by to talk through your kitchen project in person.'}
        media={null}
      >
        <TileGrid cols={4} className="mt-8">
          <Tile
            title={s.phone}
            text="Phone"
            footer={
              <a href={s.phoneHref} className={linkClass}>
                Call →
              </a>
            }
          />
          <Tile
            title={s.email}
            text="Email"
            footer={
              <a href={`mailto:${s.email}`} className={linkClass}>
                Write to us →
              </a>
            }
          />
          <Tile
            title={s.address}
            text="Address"
            footer={
              s.mapUrl && (
                <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Get directions →
                </a>
              )
            }
          />
          <Tile title={s.workHours} text="Hours" />
        </TileGrid>
        <p className="mt-6 flex items-start gap-3 rounded-card bg-surface p-4 text-sm">
          <span aria-hidden className="flex size-6 shrink-0 items-center justify-center rounded-full bg-fg text-xs font-bold text-bg">
            !
          </span>
          <span>Showroom visits are by appointment. Call us or send a request and we&apos;ll agree a convenient time.</span>
        </p>
      </PageHero>

      <PageSections sections={page?.sections ?? []} />

      {/* 2 · Messengers */}
      <Section>
        <div className="rounded-block bg-surface p-6 md:p-10">
          <SectionHeading
            title="Message us"
            subtitle="Send a question, photos of your space, a sketch or a quote from another company. Our team will help you get your bearings."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {s.socials.map((m) => (
              <Button key={m.type} href={m.url} variant="secondary" external>
                {m.label}
              </Button>
            ))}
          </div>
        </div>
      </Section>

      {/* 3 · Map (a map widget needs an API key) */}
      <Section>
        <SectionHeading title="Find us" />
        <div className="relative mt-6">
          <iframe
            title="Map: Alderline showroom, Portland"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-122.7005%2C45.5205%2C-122.6655%2C45.5375&layer=mapnik&marker=45.529%2C-122.683"
            loading="lazy"
            className="block min-h-[440px] w-full rounded-media border border-line"
          />
          <div className="mt-4 rounded-card bg-bg p-5 shadow-card lg:absolute lg:top-6 lg:left-6 lg:mt-0 lg:max-w-sm">
            <b className="text-lg">Alderline</b>
            <p className="mt-2 text-fg-muted">{s.address}</p>
            <p className="text-fg-muted">{s.workHours}</p>
            <a href={s.phoneHref} className="mt-2 inline-block font-medium hover:underline">
              {s.phone}
            </a>
            {s.mapUrl && (
              <div className="mt-4">
                <Button href={s.mapUrl} external size="sm">
                  Get directions
                </Button>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* 4 · Visit to discuss your project */}
      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Visit us to discuss your project"
              subtitle="In person you can look at material samples, talk through the layout, pick colors and get advice on project cost."
            />
            <div className="mt-6">
              <ModalButton
                size="lg"
                modal={{
                  type: 'lead',
                  title: 'Book a consultation',
                  text: "Leave your contact details and we'll agree a convenient time to meet at the showroom.",
                  form: { formId: 'contacts', submitLabel: 'Book now' },
                }}
              >
                Book a consultation
              </ModalButton>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['kitchen-03.jpg', 'kitchen-09.jpg', 'kitchen-36.jpg', 'kitchen-34.jpg'].map((img, n) => (
              <Photo key={img} media={staticPhoto(img, `Showroom display ${n + 1}`)} label={`Showroom photo ${n + 1}`} ratio="4/3" sizes="(min-width: 1024px) 300px, 50vw" />
            ))}
          </div>
        </div>
      </Section>

      {/* 5 · What a consultation covers */}
      <Section>
        <SectionHeading title="In a consultation you can" />
        <TileGrid cols={4} className="mt-8">
          {CONSULTATION.map(([title, text], i) => (
            <Tile key={title} number={i + 1} title={title} text={text} />
          ))}
        </TileGrid>
      </Section>

      {/* 6 · Form */}
      <CtaForm
        dark={false}
        title="Still have questions?"
        text="Leave your contact details and an Alderline specialist will get in touch to help with your project, pricing or ordering terms."
        form={{ formId: 'contacts', layout: 'inline', submitLabel: 'Get a consultation' }}
      />

      {/* 7 · You may also be looking for */}
      <Section>
        <SectionHeading title="You may also be looking for" />
        <LinksRow
          links={[
            { href: routes.catalog(), label: 'Kitchen catalog' },
            { href: routes.zamer(), label: 'Book a measurement' },
            { href: routes.payment(), label: 'Payment & financing' },
            { href: routes.warranty(), label: 'Warranty' },
            { href: routes.delivery(), label: 'Delivery' },
          ]}
        />
      </Section>

      {/* 8 · Company details, from the site settings */}
      <Section id="company" spacing="sm">
        <SectionHeading title="Company details" />
        {c?.legalName ? (
          <dl className="mt-4 max-w-2xl divide-y divide-line border-y border-line">
            {details
              .filter((r): r is [string, string] => !!r[1])
              .map(([label, value]) => (
                <div key={label} className="grid gap-1 py-3 sm:grid-cols-[200px_1fr]">
                  <dt className="text-fg-muted">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
          </dl>
        ) : (
          <p className="mt-4 text-fg-muted">Company details are filled in under Site settings (the Company details section).</p>
        )}
      </Section>

      {/* 9 · Call to action */}
      <CtaBox
        title="Falling for a kitchen is easy. Overpaying for it is optional"
        text="Send us your room dimensions or leave your phone number. A designer will prepare a preliminary estimate."
        aside={
          <div className="flex flex-wrap gap-3">
            <ModalButton
              variant="contrast"
              size="lg"
              modal={{
                type: 'lead',
                title: 'Get a quote',
                text: 'Send us your room dimensions or leave your phone number.',
                form: { formId: 'catalog-photo', submitLabel: 'Get a quote' },
              }}
            >
              Get a quote
            </ModalButton>
            <ModalButton
              variant="inverse"
              size="lg"
              modal={{
                type: 'lead',
                title: 'Book a measurement',
                text: 'A specialist will bring material samples and measure your space.',
                form: { formId: 'zamer', submitLabel: 'Book now' },
              }}
            >
              Book a measurement
            </ModalButton>
          </div>
        }
      />
    </>
  );
}
