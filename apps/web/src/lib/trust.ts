/**
 * Proof points shown next to calls to action (hero, estimator, final form) and in JSON-LD.
 * Demo figures of the fictional studio — kept in one place so every block says the same thing.
 */
export const REVIEW_SUMMARY = { rating: 4.9, count: 312, source: 'Google & Houzz' } as const;

export const PROOF_POINTS: [value: string, label: string][] = [
  ['1,000+', 'kitchens built since 2012'],
  ['5 weeks', 'from signed design to installation'],
  ['5-year', 'warranty on every cabinet'],
  ['$0', 'for measurement and 3D design'],
];

/** "From" price used in the hero and meta texts (cheapest kitchen in the demo catalog) */
export const PRICE_FROM = 9600;
