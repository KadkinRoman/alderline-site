import Link from 'next/link';
import { Container } from '@/components/ui/layout';
import type { NavItem, SiteSettings, Topline as ToplineData } from '@/lib/content/types';
import { Logo, Socials } from './Brand';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

type Props = {
  settings: SiteSettings;
  navigation: NavItem[];
  topline: ToplineData;
};

export function Header({ settings, navigation, topline }: Props) {
  return (
    <>
      {topline.enabled && (
        <div className="bg-inverse text-sm text-on-inverse">
          <Container className="flex min-h-9 items-center justify-center gap-3 py-1.5 text-center">
            <span>{topline.text}</span>
            {topline.link && (
              <Link href={topline.link.href} className="underline underline-offset-2">
                {topline.link.label}
              </Link>
            )}
          </Container>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-line bg-bg">
        <Container className="flex h-16 items-center gap-6 xl:h-20">
          <Logo tagline={settings.tagline} />

          <DesktopNav items={navigation} className="hidden flex-1 justify-center xl:flex" />

          <div className="ml-auto flex shrink-0 items-center gap-4 xl:ml-0">
            <a href={settings.phoneHref} className="hidden text-right leading-tight md:block">
              <b className="block whitespace-nowrap">{settings.phone}</b>
              <small className="text-xs text-fg-muted">{settings.workHours}</small>
            </a>
            <a
              href={settings.phoneHref}
              aria-label={`Call: ${settings.phone}`}
              className="flex size-10 items-center justify-center rounded-full border border-line md:hidden"
            >
              <span aria-hidden>☎</span>
            </a>
            <Socials items={settings.socials} className="hidden 2xl:flex" />
            <MobileNav items={navigation} settings={settings} className="xl:hidden" />
          </div>
        </Container>
      </header>
    </>
  );
}
