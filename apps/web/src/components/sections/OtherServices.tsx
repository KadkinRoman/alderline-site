import { LinksRow } from '@/components/sections/Blocks';
import { Section, SectionHeading } from '@/components/ui/layout';
import { routes } from '@/lib/routes';

/** All pages of the Buyer's guide section */
const SERVICES = [
  { href: routes.zamer(), label: 'Measurement & design' },
  { href: routes.materials(), label: 'Materials' },
  { href: routes.delivery(), label: 'Delivery' },
  { href: routes.installation(), label: 'Installation' },
  { href: routes.warranty(), label: 'Warranty' },
  { href: routes.payment(), label: 'Payment & financing' },
];

/** "Other services": six pages of the section excluding the current one */
export function OtherServices({ current }: { current: string }) {
  return (
    <Section>
      <SectionHeading title="Other services" />
      <LinksRow links={SERVICES.filter((s) => s.href !== current)} />
    </Section>
  );
}
