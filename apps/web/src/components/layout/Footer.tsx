import Link from 'next/link';
import { Container } from '@/components/ui/layout';
import type { NavItem, SiteSettings } from '@/lib/content/types';
import { Logo, Socials } from './Brand';
import { navHref } from './nav-utils';

type Props = {
  settings: SiteSettings;
  columns: NavItem[];
  legal: NavItem[];
};

export function Footer({ settings, columns, legal }: Props) {
  return (
    <footer className="mt-10 bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div className="space-y-4">
          <Logo />
          <p className="text-fg-muted">Custom kitchens and built-in storage in Portland, Oregon</p>
          <Socials items={settings.socials} />
        </div>

        {columns.map((col) => (
          <nav key={col.id} aria-label={col.title}>
            <h4 className="mb-3 font-semibold">{col.title}</h4>
            <ul className="space-y-2">
              {col.items?.map((item) => (
                <li key={item.id}>
                  <Link href={navHref(item)} className="text-fg-muted hover:text-fg">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h4 className="mb-3 font-semibold">Contact</h4>
          <ul className="space-y-2 text-fg-muted">
            <li>
              <a href={settings.phoneHref} className="hover:text-fg">
                {settings.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="hover:text-fg">
                {settings.email}
              </a>
            </li>
            <li>{settings.address}</li>
            <li>
              <Link href="/contacts" className="text-fg underline underline-offset-2">
                All contact details
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-wrap items-center gap-x-6 gap-y-2 py-5 text-sm text-fg-muted">
          <span>© {settings.siteName}</span>
          {legal.map((l) => (
            <Link key={l.id} href={navHref(l)} className="hover:text-fg">
              {l.title}
            </Link>
          ))}
        </Container>
      </div>
    </footer>
  );
}
