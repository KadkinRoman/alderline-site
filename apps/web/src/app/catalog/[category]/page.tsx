import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogView } from '@/components/catalog/CatalogView';
import { getKitchenCategories, getKitchenCategory } from '@/lib/content';
import { atLeastOne } from '@/lib/static-params';

// The page depends entirely on the slug, and 404 and 308 must be sent as HTTP statuses (SEO), so the params
// check is not hidden inside <Suspense>: navigating here may wait for the server. Known slugs are prerendered.
export const instant = false;

type Props = PageProps<'/catalog/[category]'>;

export async function generateStaticParams() {
  return atLeastOne((await getKitchenCategories()).map((c) => ({ category: c.slug })), ['category']);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getKitchenCategory((await params).category);
  if (!category) return {};
  return {
    title: category.seo?.title ?? `Custom ${category.name.toLowerCase()}`,
    description: category.seo?.description ?? `Custom ${category.name.toLowerCase()} from Alderline, designed, built and installed in Portland, OR.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = await getKitchenCategory((await params).category);
  if (!category) notFound();
  return <CatalogView category={category} searchParams={searchParams} />;
}
