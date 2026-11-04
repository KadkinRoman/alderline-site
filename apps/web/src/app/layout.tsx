import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { FormsProvider } from '@/components/forms/FormsProvider';
import { ContactDock } from '@/components/layout/ContactDock';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MobileCtaBar } from '@/components/layout/MobileCtaBar';
import { ModalProvider } from '@/components/modals/ModalProvider';
import { getForms, getNavigation, getQuiz, getSettings, getTopline, toFormDefs } from '@/lib/content';
import { businessJsonLd } from '@/lib/seo';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const text = Inter({ subsets: ['latin'], variable: '--font-text', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

const description =
  'Custom kitchens designed around your space, built in our own Portland workshop and installed in about five weeks. Free 3D design, 5-year warranty.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Custom kitchens in Portland, OR — Alderline',
    template: '%s — Alderline',
  },
  description,
  openGraph: { type: 'website', locale: 'en_US', siteName: 'Alderline', description },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#f6f3ee',
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
    <html lang="en" className={`${text.variable} ${serif.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <script
          type="application/ld+json"
          // JSON-LD for search engines: the business card (name, phone, address, hours, rating)
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd(settings, siteUrl)).replace(/</g, '\\u003c') }}
        />
        <FormsProvider forms={toFormDefs(forms)} texts={settings.forms}>
          <ModalProvider quiz={quiz}>
            <Header settings={settings} navigation={mainNav} topline={topline} />
            <main className="flex-1">{children}</main>
            <Footer settings={settings} columns={footerNav} legal={legalNav} />
            <ContactDock phone={settings.phone} phoneHref={settings.phoneHref} socials={settings.socials} />
            <MobileCtaBar phoneHref={settings.phoneHref} />
          </ModalProvider>
        </FormsProvider>
      </body>
    </html>
  );
}
