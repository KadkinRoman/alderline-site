import type { SiteSettings } from '@/lib/content/types';
import { REVIEW_SUMMARY } from '@/lib/trust';

/**
 * schema.org card of the business for search engines (rendered once in the root layout).
 * HomeAndConstructionBusiness is the closest type for a custom-kitchen studio with its own workshop.
 */
export function businessJsonLd(settings: SiteSettings, siteUrl: string) {
  const [street, city, regionZip] = settings.address.split(',').map((s) => s.trim());
  const [region, postalCode] = (regionZip ?? '').split(' ');
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: settings.siteName,
    description: 'Custom kitchens and built-in storage, designed and made in Portland, Oregon.',
    url: siteUrl,
    image: `${siteUrl}/opengraph-image.jpg`,
    telephone: settings.phone,
    email: settings.email || undefined,
    priceRange: '$$',
    address: street
      ? { '@type': 'PostalAddress', streetAddress: street, addressLocality: city, addressRegion: region, postalCode, addressCountry: 'US' }
      : undefined,
    areaServed: ['Portland, OR', 'Willamette Valley, OR'],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: REVIEW_SUMMARY.rating,
      reviewCount: REVIEW_SUMMARY.count,
    },
  };
}
