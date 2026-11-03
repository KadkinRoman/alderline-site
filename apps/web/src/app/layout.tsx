import type { Metadata, Viewport } from 'next';
import { FormsProvider } from '@/components/forms/FormsProvider';
import { ContactDock } from '@/components/layout/ContactDock';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ModalProvider } from '@/components/modals/ModalProvider';
import { getForms, getNavigation, getQuiz, getSettings, getTopline, toFormDefs } from '@/lib/content';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Custom kitchens in Portland, OR — Alderline',
    template: '%s — Alderline',
  },
  description:
    'We design kitchens for your space, build them in our own workshop and install them start to finish.',
  openGraph: { type: 'website', locale: 'en_US', siteName: 'Alderline' },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, mainNav, footerNav, legalNav, topline, quiz, forms] = await Promise.all([
    getSettings(),
    getNavigation('main'),
    getNavigation('footer'),
    getNavigation('legal'),
    getTopline(),
    getQuiz(),
    getForms(),
  ]);

  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col">
        <FormsProvider forms={toFormDefs(forms)} texts={settings.forms}>
          <ModalProvider quiz={quiz}>
            <Header settings={settings} navigation={mainNav} topline={topline} />
            <main className="flex-1">{children}</main>
            <Footer settings={settings} columns={footerNav} legal={legalNav} />
            <ContactDock phone={settings.phone} phoneHref={settings.phoneHref} socials={settings.socials} />
          </ModalProvider>
        </FormsProvider>
      </body>
    </html>
  );
}
