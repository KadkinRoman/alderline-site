import type { Metadata } from 'next';
import { CatalogView } from '@/components/catalog/CatalogView';

export const metadata: Metadata = {
  title: 'Kitchen catalog',
  description: 'The Alderline catalog: one-wall, L-shaped, U-shaped and island kitchens and built-in cabinets, made to order.',
};

export default function CatalogPage({ searchParams }: PageProps<'/catalog'>) {
  return <CatalogView searchParams={searchParams} />;
}
