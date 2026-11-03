/**
 * Human-readable labels for Strapi enumeration keys (apps/cms/src/api/kitchen/content-types/kitchen/schema.json).
 * Added a value to the schema? Add its label here.
 */
import type { FilterOption } from './types';

export const STYLE_LABELS: Record<string, string> = {
  modern: 'modern',
  minimalist: 'minimalist',
  neoclassical: 'neoclassical',
  loft: 'loft',
  classic: 'classic',
  scandinavian: 'Scandinavian',
};

export const FACADE_LABELS: Record<string, string> = {
  mdf: 'MDF',
  laminate: 'laminate',
  painted: 'painted',
  hpl: 'HPL',
  acrylic: 'acrylic',
  'solid-wood': 'solid wood',
};

export const COLOR_LABELS: Record<string, string> = {
  light: 'light',
  dark: 'dark',
  wood: 'wood',
  colored: 'colored',
};

export const PRICE_RANGES: Record<string, { label: string; min: number; max?: number }> = {
  'under-12k': { label: 'Under $12,000', min: 0, max: 12_000 },
  '12k-20k': { label: '$12,000–20,000', min: 12_000, max: 20_000 },
  'over-20k': { label: 'Over $20,000', min: 20_000 },
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const toOptions = (labels: Record<string, string>): FilterOption[] =>
  Object.entries(labels).map(([value, label]) => ({ value, label: capitalize(label) }));
