/**
 * Demo content for the Alderline showcase site: pages, catalog, projects, blog, offers, reviews, FAQ,
 * forms, settings and menus. Everything here is fictional. Photos are CC-licensed (see seed-assets/credits.json
 * and the /credits page on the site); an image is referenced by its file name in seed-assets/.
 */
import { h, p, ul, type Block } from './blocks';

const GROUPS = ['home', 'kitchen', 'about', 'offers', 'materials', 'warranty', 'payment', 'measurement', 'delivery', 'installation', 'contact', 'reviews'] as const;
export type Group = (typeof GROUPS)[number];

/* ---------- Pages (static routes of the front end) ---------- */

export const pages = [
  { slug: 'home', title: 'Home', path: '/', seo: { title: 'Custom kitchens in Portland, OR — Alderline', description: 'We design kitchens around your space, build them in our own workshop and install them turnkey. Free on-site measurement and 3D design.' } },
  { slug: 'catalog', title: 'Catalog', path: '/catalog', seo: { title: 'Kitchen catalog', description: 'Alderline kitchens: one-wall, L-shaped, U-shaped, island and breakfast-bar layouts, plus built-in cabinets — all made to measure.' } },
  { slug: 'offers', title: 'Special offers', path: '/offers', seo: { title: 'Special offers', description: 'Discounts, gifts and seasonal deals on Alderline kitchens.' } },
  { slug: 'about', title: 'About us', path: '/about', seo: { title: 'About Alderline', description: 'Alderline is a Portland kitchen studio with its own workshop. Design, manufacturing and installation under one roof, 5-year warranty.' } },
  { slug: 'blog', title: 'Blog', path: '/blog', seo: { title: 'Blog', description: 'Practical guides on choosing a kitchen: layout, materials, storage, appliances and renovation.' } },
  { slug: 'projects', title: 'Projects', path: '/projects', seo: { title: 'Our projects', description: 'Completed Alderline kitchens: style, layout, dimensions and price.' } },
  { slug: 'contact', title: 'Contact', path: '/contact', seo: { title: 'Contact', description: 'Phone, showroom address and messengers — Alderline custom kitchens, Portland, OR.' } },
  { slug: 'reviews', title: 'Reviews', path: '/reviews', lead: 'Video reviews from our clients and written reviews collected on Google and Houzz.', seo: { title: 'Alderline reviews', description: 'What our clients say: written and video reviews of Alderline kitchens.' } },
  { slug: 'guide', title: "Buyer's guide", path: '/guide', seo: { title: "Buyer's guide", description: 'Measurement, materials, delivery, installation, warranty, payment and financing — everything about ordering an Alderline kitchen.' } },
  { slug: 'measurement-and-design', title: 'Measurement & design', path: '/guide/measurement-and-design', seo: { title: 'Measurement & 3D design', description: 'Free on-site measurement and a 3D design project in the Portland metro area. Our designer brings material samples with them.' } },
  { slug: 'materials', title: 'Materials', path: '/guide/materials', seo: { title: 'Kitchen materials', description: 'Door fronts, carcasses, countertops, hardware and storage inserts to match your style and budget.' } },
  {
    slug: 'delivery',
    title: 'Delivery',
    path: '/guide/delivery',
    lead: 'Once your kitchen leaves the workshop we agree on a date and deliver it to your door.',
    // "How delivery works" tiles
    sections: [
      ['Order preparation', 'When production is finished we check that the kitchen is ready to ship. Every element is prepared for transport and packed to reduce the risk of damage on the way.'],
      ['Completeness check', 'Before shipping we verify that all cabinets, door fronts, hardware and other items in the order are present. This way the set is ready for installation as soon as it arrives.'],
      ['Transport', 'We deliver to the agreed address. Pieces are loaded with their size and materials in mind. Delivery within the Portland metro area is free.'],
      ['Carrying in', 'We bring every element into your home. If the pieces fit the elevator, carrying is free; oversized items that have to be carried by hand are charged separately.'],
      ['Handover', 'On delivery the kitchen is handed over to you or a person you trust. You can count the packages and check their condition on the spot.'],
    ].map(([title, text]) => ({ title, body: [p(text)] })),
    seo: { title: 'Delivery', description: 'Alderline kitchen delivery in Portland and the Willamette Valley.' },
  },
  {
    slug: 'installation',
    title: 'Installation',
    path: '/guide/installation',
    lead: 'After delivery our installers assemble the cabinets, fit every element and check the result before handing the kitchen over.',
    // "Standard installation" checklist and "Extras"
    sections: [
      { title: 'Standard installation', body: [ul(['Cabinet assembly', 'Fitting door fronts', 'Countertop installation', 'Adjusting doors and drawers', 'Fitting the hardware in the order', 'Final check'])] },
      { title: 'Which jobs are charged separately?', body: [p('Some kitchens need non-standard work: trimming elements to fit the room, adding extra lighting or working around plumbing and electrics. We agree on such jobs and their price in advance.')] },
    ],
    seo: { title: 'Installation', description: 'Kitchen assembly and installation by Alderline specialists.' },
  },
  { slug: 'warranty', title: 'Warranty', path: '/guide/warranty', seo: { title: '5-year warranty', description: 'Alderline cabinetry comes with a 5-year warranty. What it covers and how to make a claim.' } },
  { slug: 'payment-and-financing', title: 'Payment & financing', path: '/guide/payment-and-financing', seo: { title: 'Payment & financing', description: 'Pay in full, in stages or with a monthly plan. The terms are fixed in your contract.' } },
  { slug: 'privacy-policy', title: 'Privacy Policy', path: '/privacy-policy', seo: { title: 'Privacy Policy', noIndex: true } },
];

/* ---------- Catalog ---------- */

export const categories = [
  { slug: 'one-wall-kitchens', name: 'One-wall kitchens', shortName: 'One-wall', order: 1 },
  { slug: 'kitchens-with-breakfast-bar', name: 'Kitchens with a breakfast bar', shortName: 'Breakfast bar', order: 2 },
  { slug: 'island-kitchens', name: 'Island kitchens', shortName: 'Island', order: 3 },
  { slug: 'l-shaped-kitchens', name: 'L-shaped kitchens', shortName: 'L-shaped', order: 4 },
  { slug: 'u-shaped-kitchens', name: 'U-shaped kitchens', shortName: 'U-shaped', order: 5 },
  { slug: 'cabinets', name: 'Built-in cabinets', shortName: 'Cabinets', order: 6 },
];

const TYPE_LABEL: Record<string, string> = {
  'one-wall-kitchens': 'one-wall',
  'kitchens-with-breakfast-bar': 'with a breakfast bar',
  'island-kitchens': 'island',
  'l-shaped-kitchens': 'L-shaped',
  'u-shaped-kitchens': 'U-shaped',
  cabinets: 'cabinet',
};

const TYPE_TITLE: Record<string, string> = {
  'one-wall-kitchens': 'One-wall kitchen',
  'kitchens-with-breakfast-bar': 'Kitchen with a breakfast bar',
  'island-kitchens': 'Island kitchen',
  'l-shaped-kitchens': 'L-shaped kitchen',
  'u-shaped-kitchens': 'U-shaped kitchen',
  cabinets: 'Built-in cabinet',
};

// [enum key, label]
const STYLES: [string, string][] = [['modern', 'modern'], ['minimalist', 'minimalist'], ['neoclassical', 'neoclassical'], ['loft', 'loft'], ['scandinavian', 'Scandinavian']];
const FACADES: [string, string][] = [['mdf', 'MDF'], ['laminate', 'laminate'], ['painted', 'painted'], ['hpl', 'HPL']];
const COLORS: [string, string][] = [['light', 'light'], ['dark', 'dark'], ['wood', 'wood']];

/** [slug, name, category, gallery images in seed-assets/] */
const KITCHEN_SEED: [slug: string, name: string, category: string, gallery: string[]][] = [
  ['harbor', 'Harbor', 'l-shaped-kitchens', ['kitchen-01.jpg', 'kitchen-02.jpg']],
  ['contour', 'Contour', 'u-shaped-kitchens', ['kitchen-03.jpg', 'kitchen-04.jpg']],
  ['maple', 'Maple', 'one-wall-kitchens', ['kitchen-05.jpg']],
  ['verona', 'Verona', 'l-shaped-kitchens', ['kitchen-06.jpg', 'kitchen-07.jpg']],
  ['serene', 'Serene', 'one-wall-kitchens', ['kitchen-08.jpg']],
  ['slate', 'Slate', 'island-kitchens', ['kitchen-09.jpg', 'kitchen-10.jpg']],
  ['ember', 'Ember', 'kitchens-with-breakfast-bar', ['kitchen-11.jpg']],
  ['nord', 'Nord', 'l-shaped-kitchens', ['kitchen-12.jpg', 'kitchen-13.jpg']],
  ['nord-wood', 'Nord Wood', 'one-wall-kitchens', ['kitchen-14.jpg']],
  ['brixton', 'Brixton', 'u-shaped-kitchens', ['kitchen-15.jpg', 'kitchen-16.jpg']],
  ['terra', 'Terra', 'island-kitchens', ['kitchen-17.jpg', 'kitchen-18.jpg']],
  ['sandalwood', 'Sandalwood', 'kitchens-with-breakfast-bar', ['kitchen-19.jpg']],
  ['rowan', 'Rowan', 'l-shaped-kitchens', ['kitchen-20.jpg', 'kitchen-21.jpg']],
  ['eucalyptus', 'Eucalyptus', 'one-wall-kitchens', ['kitchen-22.jpg']],
  ['linden', 'Linden', 'l-shaped-kitchens', ['kitchen-23.jpg', 'kitchen-24.jpg']],
  ['aspen', 'Aspen', 'one-wall-kitchens', ['kitchen-25.jpg']],
  ['fleur', 'Fleur', 'kitchens-with-breakfast-bar', ['kitchen-26.jpg']],
  ['orbit', 'Orbit', 'island-kitchens', ['kitchen-27.jpg', 'kitchen-28.jpg']],
  ['madeleine', 'Madeleine', 'u-shaped-kitchens', ['kitchen-29.jpg']],
  ['olive', 'Olive', 'l-shaped-kitchens', ['kitchen-30.jpg', 'kitchen-31.jpg']],
  ['graphite', 'Graphite', 'one-wall-kitchens', ['kitchen-32.jpg']],
  ['mocha', 'Mocha', 'kitchens-with-breakfast-bar', ['kitchen-33.jpg']],
  ['loft-stone', 'Loft Stone', 'island-kitchens', ['kitchen-34.jpg', 'kitchen-01.jpg']],
  ['alba', 'Alba', 'u-shaped-kitchens', ['kitchen-35.jpg']],
  ['vanilla', 'Vanilla', 'one-wall-kitchens', ['kitchen-36.jpg']],
  ['cashmere', 'Cashmere', 'l-shaped-kitchens', ['kitchen-37.jpg', 'kitchen-38.jpg']],
  ['vitrine', 'Vitrine', 'cabinets', ['cabinet-01.jpg']],
  ['linen', 'Linen', 'cabinets', ['cabinet-02.jpg']],
  ['nordic', 'Nordic', 'cabinets', ['cabinet-03.jpg']],
  ['alba-wardrobe', 'Alba wardrobe', 'cabinets', ['cabinet-04.jpg']],
];

const BASE_PRICES = [12400, 18900, 10500, 14200, 9600, 26500, 16800, 13100, 11200, 21500];
const DISCOUNTS = [16, 12, 20, 10, 15];

/** Catalog collections (kitchen-tag): editors mark a kitchen as part of a collection */
export const kitchenTags = [
  { slug: 'small-kitchens', name: 'For small kitchens', order: 1 },
  { slug: 'maximum-storage', name: 'Maximum storage', order: 2 },
];

const HIGHLIGHTS = [
  { title: 'Plenty of worktop.', text: 'Several countertop zones let you cook and serve at the same time.' },
  { title: 'Cabinets almost to the ceiling.', text: 'The upper row is used for storage to the maximum.' },
  { title: 'Integrated extractor hood.', text: 'Hidden inside a wall cabinet, it hardly stands out.' },
  { title: 'Wide pull-out drawers.', text: 'Everything inside is visible at a glance.' },
];

export const kitchens = KITCHEN_SEED.map(([slug, name, categorySlug, gallery], i) => {
  const price = BASE_PRICES[i % BASE_PRICES.length] + (i % 4) * 650;
  const discount = DISCOUNTS[i % DISCOUNTS.length];
  const [style, styleLabel] = STYLES[i % STYLES.length];
  const [facade, facadeLabel] = FACADES[i % FACADES.length];
  const [color, colorLabel] = COLORS[i % COLORS.length];
  const isCabinet = categorySlug === 'cabinets';
  const dims = isCabinet ? '2.0 × 0.6 m' : `${(2.4 + (i % 5) * 0.4).toFixed(1)} × 2.1 m`;
  return {
    slug,
    name,
    categorySlug,
    gallery,
    price,
    oldPrice: Math.round(price / (1 - discount / 100) / 10) * 10,
    dimensions: dims,
    height: '2.4 m',
    shortDesc: `${TYPE_TITLE[categorySlug]} · ${styleLabel} style · ${facadeLabel} fronts`,
    description: [
      p(`${name} combines matte ${colorLabel === 'wood' ? 'wood-grain' : colorLabel} fronts, a warm timber texture and black details. The palette keeps the ${isCabinet ? 'cabinet' : 'kitchen'} calm and contemporary.`),
      p(`Every ${isCabinet ? 'cabinet' : 'kitchen'} is built to the measurements of your room: we adjust the module widths, the height of the wall cabinets and the layout of the storage inserts to the way you use the space.`),
    ],
    highlights: isCabinet ? HIGHLIGHTS.slice(1, 3) : HIGHLIGHTS,
    style,
    facade,
    color,
    badge: i % 7 === 0 ? 'Popular' : i % 9 === 4 ? 'New' : undefined,
    isHit: i % 3 === 0,
    specs: [
      { label: 'Type', value: TYPE_LABEL[categorySlug] },
      { label: 'Style', value: styleLabel },
      { label: 'Door fronts', value: facadeLabel },
      { label: 'Color', value: colorLabel },
      ...(isCabinet ? [] : [{ label: 'Countertop', value: 'quartz / laminate / compact laminate' }]),
      { label: 'Hardware', value: 'soft-close hinges and runners' },
      { label: 'Dimensions', value: dims },
      { label: 'Height', value: '2.4 m' },
      { label: 'Modules', value: String((isCabinet ? 3 : 10) + (i % 6)) },
      { label: 'Features', value: isCabinet ? 'LED lighting, pull-out inserts' : 'integrated appliances, tall units, lighting' },
    ],
    included: ['On-site measurement', '3D design project', 'Manufacturing', 'Materials'].map((text) => ({ text })),
    excluded: ['Appliances and plumbing fixtures', 'Countertop and backsplash'].map((text) => ({ text })),
    tagSlugs: [...(i % 4 === 1 ? ['small-kitchens'] : []), ...(i % 3 === 2 ? ['maximum-storage'] : [])],
    legacyPath: `/catalog/product/${slug}/`,
  };
});

/* ---------- Projects ---------- */

export const projects = [
  { slug: 'linden-pearl-district', title: 'Linden kitchen, Pearl District', chips: ['L-shaped', 'Modern', 'MDF'], excerpt: 'Light matte fronts, a warm timber texture and black details for a loft apartment with tall ceilings.', specs: [{ label: 'Dimensions', value: '3.2 × 2.1 m' }, { label: 'Height', value: '2.4 m' }], priceFrom: 12400, gallery: ['kitchen-23.jpg', 'kitchen-24.jpg'], description: [p('The owners wanted a kitchen that would disappear into the living space. We kept the fronts handleless, hid the extractor hood inside a wall cabinet and matched the countertop to the oak floor.'), p('Storage is concentrated in a run of tall units next to the fridge; the corner is solved with a pull-out carousel.')] },
  { slug: 'eucalyptus-sellwood', title: 'Eucalyptus kitchen, Sellwood', chips: ['U-shaped', 'Minimalist', 'Painted'], excerpt: 'A U-shaped layout with painted fronts in a soft sage tone and a breakfast peninsula.', specs: [{ label: 'Dimensions', value: '3.6 × 2.8 m' }, { label: 'Height', value: '2.5 m' }], priceFrom: 18900, gallery: ['kitchen-22.jpg', 'kitchen-08.jpg'], description: [p('A family of four cooks every day, so the brief was a generous worktop and separate zones for prep and washing up. The peninsula doubles as a breakfast bar for the kids.')] },
  { slug: 'terra-lake-oswego', title: 'Terra kitchen, Lake Oswego', chips: ['Island', 'Neoclassical', 'MDF'], excerpt: 'An island with a breakfast zone and storage up to the ceiling.', specs: [{ label: 'Dimensions', value: '4.1 × 3.0 m' }, { label: 'Height', value: '2.7 m' }], priceFrom: 26500, gallery: ['kitchen-17.jpg', 'kitchen-18.jpg'], description: [p('The island hosts the hob and a seating side for three; the back wall is a floor-to-ceiling pantry with internal drawers. Framed fronts and brass hardware give the room a classic feel.')] },
  { slug: 'orbit-studio-alberta', title: 'Orbit kitchen, Alberta Arts', chips: ['One-wall', 'Loft', 'Laminate'], excerpt: 'A compact one-wall kitchen for a studio apartment.', specs: [{ label: 'Length', value: '2.8 m' }, { label: 'Height', value: '2.4 m' }], priceFrom: 10500, gallery: ['kitchen-27.jpg'], description: [p('Three metres of wall, every centimetre used: a slim dishwasher, a built-in oven at eye level and a pull-out pantry next to the fridge.')] },
  { slug: 'media-wall-haven', title: 'Haven media wall', chips: ['Built-in furniture', 'Modern'], excerpt: 'A wall-hung media unit with open shelves and LED lighting.', specs: [{ label: 'Width', value: '3.0 m' }], gallery: ['cabinet-03.jpg'], description: [p('Built with the same carcasses and fronts as the kitchen in the next room, so the whole apartment reads as one piece of furniture.')] },
].map((pr) => ({
  ...pr,
  chips: pr.chips.map((text) => ({ text })),
  legacyPath: `/projects/${pr.slug}/`,
}));

/* ---------- Blog ---------- */

export const articleTags = [
  { slug: 'layout', name: 'Layout' },
  { slug: 'materials', name: 'Materials' },
  { slug: 'design', name: 'Design' },
  { slug: 'appliances-and-renovation', name: 'Appliances & renovation' },
  { slug: 'tips', name: 'Tips' },
  { slug: 'projects', name: 'Real projects' },
].map((t, i) => ({ ...t, order: i + 1 }));

/** Team members: shown on "About" (isTeam) and as article authors and reviewers */
export const authors = [
  { key: 'designer', name: 'Maya Lindqvist', role: 'Lead designer', isTeam: true, order: 1, text: 'Turns your wishes into a project: layout, appliances, storage, colors, materials and hardware. On the measurement visit she takes corners, ledges and utilities into account.' },
  { key: 'technolog', name: 'Daniel Reyes', role: 'Production engineer', isTeam: true, order: 2, text: 'Checks every project before it goes to the workshop: feasibility, dimensions, joints, cabinet construction and hardware.' },
  { key: 'master', name: 'Thomas Okafor', role: 'Workshop lead', isTeam: true, order: 3, text: 'Responsible for making carcasses and door fronts exactly to the approved dimensions and specification.' },
  { key: 'installer', name: 'Ethan Brooks', role: 'Head of installation', isTeam: true, order: 4, text: 'Assembles and installs the kitchen on site, adjusts the fronts and signs off the finished result.' },
];

type DzComponent = { __component: string } & Record<string, unknown>;
const text = (body: Block[]): DzComponent => ({ __component: 'article.text', body });

const frontsContent: DzComponent[] = [
  text([
    p('Door fronts are the most visible part of a kitchen. You see them every day, you touch them more than anything else, and they largely decide how the kitchen will look a few years from now.'),
    h(2, 'Which materials are used'),
    p('Most kitchen fronts are made from a handful of materials. Each has its own look, maintenance needs and price.'),
    ul([
      ['Laminate', 'particleboard with a decorative surface; a simple and practical option.'],
      ['Foil-wrapped MDF', 'an MDF board wrapped in PVC foil; allows routed profiles.'],
      ['Painted MDF', 'a board painted in several coats; even color and a deep tone.'],
      ['HPL', 'a board faced with high-pressure laminate; available in gloss and matte.'],
    ]),
  ]),
  { __component: 'article.image', caption: 'Fronts in different materials: laminate, foil-wrapped MDF, painted MDF, HPL.', image: 'article-01.jpg' },
  text([
    h(2, 'Laminate vs MDF'),
    p('Both are engineered wood boards, but they are made differently, and that decides what shape a front can take.'),
    h(3, 'Laminate'),
    p('Suited to flat fronts without routing.'),
    h(3, 'MDF'),
    p('Denser and more uniform, so it can be routed and shaped.'),
    h(2, 'Which fronts are easiest to look after'),
    p('Maintenance depends less on the board and more on the surface and texture. Matte surfaces show fewer fingerprints.'),
  ]),
  { __component: 'article.tip', title: "Designer's tip", text: 'If the kitchen faces the sun, check how well the finish resists fading.' },
  text([
    h(2, 'What to choose for a small kitchen'),
    ul([
      'Light shades make the room feel larger.',
      'Handleless fronts look calmer.',
      'Gloss reflects light and can make the kitchen feel airier.',
    ]),
  ]),
  { __component: 'article.quote', text: 'A good front is one that fits your way of living, not just the interior.' },
  { __component: 'article.cta', title: 'Like this approach?', text: 'Send us a reference or a photo of your kitchen. We will pick the materials and estimate a similar project.', buttonLabel: 'Get a quote' },
  text([h(2, 'How the material affects the price')]),
  {
    __component: 'article.table',
    rows: [
      ['', 'Laminate', 'Foil-wrapped MDF', 'Painted MDF', 'HPL'],
      ['Look', 'Clean and simple', 'Routed profiles possible', 'Even color', 'Gloss or matte'],
      ['Care', 'Easy', 'Easy', 'Needs some care', 'Easy'],
      ['Price', 'Lower', 'Medium', 'Higher', 'Medium'],
    ],
  },
  text([p('The final price depends not only on the material but also on the size of the kitchen, the hardware and other details of the project.')]),
];

const article = (excerpt: string, paragraphs: string[]): DzComponent[] => [text([p(excerpt), ...paragraphs.map((t) => p(t))])];

const A = (slug: string, title: string, tagSlug: string, date: string, excerpt: string, cover: string, body: string[] = []) => ({
  slug,
  title,
  tagSlug,
  date,
  excerpt,
  cover,
  readingMinutes: 5,
  content: article(excerpt, body),
  authorKey: undefined as string | undefined,
  expertKey: undefined as string | undefined,
  lead: undefined as string | undefined,
});

export const articles = [
  {
    ...A('which-kitchen-fronts-to-choose', 'Which kitchen fronts to choose: comparing the materials', 'materials', '2026-10-12', 'We compare the main front materials and explain how they differ in everyday use.', 'article-01.jpg'),
    lead: 'Fronts shape both the look of a kitchen and its price. We go through the main options and explain how they behave day to day.',
    readingMinutes: 7,
    authorKey: 'designer',
    expertKey: 'technolog',
    content: frontsContent,
  },
  A('how-to-plan-a-kitchen', 'How to plan a kitchen and forget nothing', 'layout', '2026-10-10', 'What to decide before the measurement visit: outlets, appliances, storage, lighting and work zones.', 'article-02.jpg', [
    'Start with the appliances: the fridge, the hob, the oven and the dishwasher set the fixed points of the plan. Everything else — drawers, tall units, the sink — is arranged around them.',
    'Count the outlets twice: one for every built-in appliance, two or three along the worktop, and one hidden inside a cabinet for a mixer or a charging drawer.',
  ]),
  A('which-kitchen-layout-is-most-convenient', 'Which kitchen layout is the most convenient', 'layout', '2026-10-08', 'One-wall, L-shaped, U-shaped or island: how each layout works in a real room.', 'article-03.jpg', [
    'The classic work triangle — sink, hob, fridge — still works. In an L-shaped kitchen it forms naturally; in a one-wall layout keep the sink between the fridge and the hob.',
    'An island needs at least a metre of clearance on every side, so it only makes sense in a room wider than about four metres.',
  ]),
  A('how-to-match-kitchen-colors', 'How to match the kitchen color to your interior', 'design', '2026-10-05', 'What to base the choice of front and countertop shades on.', 'article-04.jpg', [
    'Pick the floor first, then the fronts, then the countertop. The three surfaces should differ in tone, otherwise the kitchen flattens into one block.',
    'Bring samples into the room and look at them in daylight and in the evening — the same grey can read as warm or cold depending on the light.',
  ]),
  A('how-to-choose-a-countertop', 'How to choose a countertop', 'materials', '2026-10-01', 'How the popular materials differ and what to consider when choosing.', 'article-05.jpg', [
    'Laminate is the budget option and surprisingly resilient; quartz is heavier and more expensive but shrugs off heat and stains; compact laminate sits in between and allows a thin, modern edge.',
  ]),
  A('storage-in-corner-cabinets', 'How to organise storage in corner cabinets', 'layout', '2026-09-28', 'Which systems make full use of the corner.', 'article-06.jpg', [
    'A blind corner can hold a carousel, a pull-out "magic corner" or simply a deep shelf with a wide door. The carousel is the cheapest; the pull-out gives access to every item without crouching.',
  ]),
  A('what-to-prepare-before-measurement', 'What to prepare before the measurement visit', 'appliances-and-renovation', '2026-09-24', 'Outlets, water connections, ventilation and other renovation details.', 'article-07.jpg', [
    'The walls do not have to be finished, but the floor level and the final position of the water and gas connections should be known, otherwise the plan will need a second visit.',
  ]),
  A('built-in-or-freestanding-appliances', 'Built-in or freestanding appliances', 'appliances-and-renovation', '2026-09-20', 'How the two options differ and how the choice affects the project.', 'article-08.jpg', [
    'Built-in appliances disappear behind the fronts and keep the lines clean; freestanding ones are cheaper and easier to replace. Decide before the design stage: the cabinet widths depend on it.',
  ]),
  A('caring-for-kitchen-fronts', 'How to care for different types of fronts', 'tips', '2026-09-16', 'Simple rules that keep the kitchen looking new.', 'article-09.jpg', [
    'Use a soft cloth and a mild detergent; avoid abrasive sponges on painted and gloss surfaces. Wipe up water around the sink the same day — the edges of laminate fronts are the first to suffer.',
  ]),
  A('kitchen-lighting', 'How to plan kitchen lighting', 'tips', '2026-09-12', 'General light, worktop lighting and accent lamps.', 'article-10.jpg', [
    'Plan three layers: a ceiling light for the room, LED strips under the wall cabinets for the worktop, and a pendant or two over the island or table for atmosphere.',
  ]),
  A('island-kitchen-from-measurement-to-installation', 'An island kitchen: from measurement to installation', 'projects', '2026-09-08', 'A look behind the scenes of one of our projects.', 'article-11.jpg', [
    'The clients came with a photo from a magazine and a room that was a metre narrower than the one in the picture. We kept the island but made it 70 cm deep, moved the hob to the wall and found room for seating on the long side.',
  ]),
];

/* ---------- Marketing ---------- */

export const promos = [
  { slug: 'design-credit', title: '$1,500 design credit', shortText: 'We reserve the credit for you and apply it to your kitchen estimate.', text: 'Leave a request and we will reserve a $1,500 Alderline design credit in your name. A consultant will explain the terms and apply the credit to your estimate.', kind: 'sale', isMain: true, image: 'kitchen-02.jpg' },
  { slug: 'free-oven', title: 'Built-in oven as a gift', shortText: 'Order an Alderline kitchen and get a built-in oven for free.', text: 'Cook your favourite dishes with pleasure. Order an Alderline kitchen and receive a built-in oven as a gift under the terms of the offer.', kind: 'gift', image: 'kitchen-09.jpg' },
  { slug: 'free-soft-close', title: 'Soft-close hinges for free', shortText: 'Smooth and silent closing on every door at no extra cost.', text: 'Order an Alderline kitchen and get soft-close hinges and runners for free under the terms of the offer.', kind: 'gift', image: 'kitchen-20.jpg' },
  { slug: 'free-countertop', title: 'Countertop as a gift', shortText: 'More room for a beautiful interior without extra spending.', text: 'Order an Alderline kitchen and receive a laminate countertop as a gift under the terms of the offer.', kind: 'gift', image: 'kitchen-30.jpg' },
  { slug: 'free-delivery', title: 'Free delivery in Portland', shortText: "We'll bring your dream kitchen to your door for free.", text: 'Order a kitchen and we deliver it anywhere in the Portland metro area for free.', kind: 'gift', image: 'kitchen-12.jpg' },
  { slug: '20-percent-off-same-day-contract', title: '20% off when you sign on the day of your consultation', shortText: 'Sign the contract on the day of your design consultation and save 20%.', text: 'Love the project? Sign the contract on the day of your consultation with the designer and get 20% off the kitchen.', kind: 'sale', image: 'kitchen-17.jpg' },
  { slug: '20-percent-off-new-homeowners', title: '20% off for new homeowners, newlyweds and seniors', shortText: 'Set up your home with a bonus.', text: 'Get 20% off an Alderline kitchen.', kind: 'sale', image: 'kitchen-26.jpg' },
].map((pr, i) => ({ isMain: false, legacyPath: undefined as string | undefined, ...pr, order: i + 1 }));

export const materials = [
  ['door-fronts', 'Door fronts', 'material-01.jpg'],
  ['carcasses', 'Carcasses', 'material-02.jpg'],
  ['countertops', 'Countertops', 'material-03.jpg'],
  ['hardware', 'Hardware', 'material-04.jpg'],
  ['handles-and-profiles', 'Handles and profiles', 'material-05.jpg'],
  ['storage-inserts', 'Storage inserts', 'material-06.jpg'],
].map(([slug, title, image], i) => ({ slug, title, image, order: i + 1 }));

const REVIEW_TEXTS = [
  'The kitchen was made exactly to the design and delivered on time. Special thanks to the designer for the corner cabinet layout.',
  'I liked that every step was clear: measurement, design, contract, installation. The matte fronts show no fingerprints at all.',
  'We ordered a kitchen with a breakfast bar. The installers were neat and cleaned up after themselves.',
];
const REVIEW_PLACES = ['Pearl District', 'Sellwood', 'Alberta Arts District', 'St. Johns', 'Lake Oswego'];

/** Reviews: written, with a source; every third one is linked to a kitchen from the catalog (no video testimonials in the demo) */
export const reviews = [
  'Alex',
  'Marina',
  'Olivia',
  'Daniel',
  'Anna',
  'Sean',
  'Helen',
  'Ivan',
  'Natalie',
  'Paul',
].map((name, i) => {
  const source = (i % 2 ? 'google' : 'houzz') as 'google' | 'houzz';
  return {
    name,
    caption: `A kitchen for ${name}`,
    text: REVIEW_TEXTS[i % REVIEW_TEXTS.length],
    rating: 5,
    source,
    place: REVIEW_PLACES[i % REVIEW_PLACES.length],
    date: `2026-${String(10 - (i % 6)).padStart(2, '0')}-${String(3 + i * 2).padStart(2, '0')}`,
    kitchenSlug: i % 3 === 0 ? KITCHEN_SEED[i % KITCHEN_SEED.length][0] : undefined,
    photo: undefined as string | undefined,
    showOnHome: i < 6,
    order: i + 1,
  };
});

const faq = (question: string, answer: string, groups: Group[]) => ({ question, answer, groups });

/** A question needed on several pages is stored as a separate record per group. */
export const faqs = [
  faq('How much does a custom kitchen cost?', 'The final price depends on the size, materials, hardware and storage inserts. Our designer prepares a preliminary estimate for free.', ['home']),
  faq('Do I need to know the dimensions of my kitchen in advance?', 'No. Our specialist takes all the measurements. You only need to give us access to the room.', ['home', 'measurement']),
  faq("Can I book a measurement if the renovation isn't finished?", 'Yes, as long as the layout of the room is final. If wall dimensions or utilities change after the visit, a second measurement may be needed.', ['home', 'measurement']),
  faq('Can I pay for the kitchen in instalments?', 'Yes. Staged payment and a monthly plan are available. The terms are fixed in the contract.', ['home', 'payment']),
  faq('What warranty comes with the kitchen?', 'Alderline cabinetry comes with a 5-year warranty.', ['home']),
  faq('How do I get the $1,500 design credit?', 'Leave a request on the site or call us. We will explain the terms and estimate your project with the credit applied.', ['offers']),
  faq('Can I combine several offers?', 'As a rule, offers cannot be combined. A consultant will help you compare the terms and pick the best one.', ['offers']),
  faq('Is there a minimum order to qualify for an offer?', 'Some offers have a minimum kitchen price. A consultant will tell you about all the conditions.', ['offers']),
  faq('When should I mention the offer I want to use?', 'Before signing the contract, so the discount or gift is included in the estimate.', ['offers']),
  faq('Can I see material samples in person?', 'Yes, in our showroom or during the free designer visit to your home.', ['materials']),
  faq('Can I mix fronts of different colors and materials?', 'Of course. For example, the wall cabinets can be light and the base cabinets wood-grain.', ['materials']),
  faq('Which materials are the most practical?', 'It depends on your habits. We will help you pick materials that match your budget and the way you use the kitchen.', ['materials']),
  faq('How long is the warranty?', 'Alderline cabinetry is covered by a 5-year warranty. The terms are set out in the contract.', ['warranty']),
  faq('What if a door front needs adjusting?', 'Contact us and send a photo or a short video. Our specialists will assess the situation and suggest a solution.', ['warranty']),
  faq('Does the warranty cover appliances?', "Appliances are covered by the manufacturer's own warranty.", ['warranty']),
  faq('How can I pay for the kitchen?', 'Full payment, staged payment or a monthly plan. A consultant confirms the terms before the contract.', ['payment']),
  faq('What deposit is required?', 'The standard scheme is 50% on signing the contract and 50% before delivery.', ['payment']),
  faq('Can I finance the kitchen?', 'Yes. Plans, terms and the down payment are agreed individually.', ['payment']),
  faq('What exactly does the specialist check during the measurement?', 'Walls, ceiling height, corners and ledges, the position of outlets, pipes, ventilation and windows.', ['measurement']),
  faq('How long does the measurement take?', 'It depends on the size and layout of the room — usually under an hour.', ['measurement']),
  faq('Is delivery really free?', 'Yes. When you order an Alderline kitchen, delivery within the Portland metro area is free. We bring the finished set to the agreed address.', ['delivery']),
  faq('Is carrying in included?', 'Yes. If the elements fit the elevator, carrying them to your apartment is free. If some pieces, such as countertops, have to be carried up the stairs by hand, there is an extra charge agreed in advance.', ['delivery']),
  faq("What if the furniture doesn't fit the elevator?", 'If oversized elements do not fit the elevator, we look at carrying them up the stairs. We take into account the size of the pieces, the width of the stairwell and other features of the building. If manual carrying is needed, we calculate the cost in advance and agree it with you.', ['delivery']),
  faq('Can I reschedule the delivery?', 'Yes. If your plans change, contact us as early as possible and we will find another convenient date. If the order has already been prepared for shipping or handed to the carrier, rescheduling is discussed individually.', ['delivery']),
  faq('Do I need to be present at delivery?', 'Ideally you or your representative should be at home at the time of delivery to give access, accept the order and check the condition of the packages. If you cannot be there in person, let us know in advance who will receive the kitchen.', ['delivery']),
  faq('How long does installation take?', 'It depends on the size of the kitchen, the number of cabinets, the complexity of the design and the room. A small kitchen can be assembled in a day; larger projects can take several days. We agree the exact timing in advance.', ['installation']),
  faq('Do I need to be at home during installation?', 'Ideally at the start and at the end. At the start you give access to the room and confirm any details; at the end you inspect the kitchen, check the result and ask the installer any questions. Being home for the whole installation is not necessary if access is arranged in advance.', ['installation']),
  faq('Do you connect appliances?', 'Installation and connection of appliances depend on their type and the project. Fitting built-in appliances and connecting them to electricity, water or drainage may be charged separately. We confirm the required work and its price before installation.', ['installation']),
  faq('Who installs the sink and the faucet?', 'Sink and faucet installation can be done as additional work. Note the difference between fitting the sink into the countertop and connecting the plumbing to the water supply and drainage. The need for such work and its cost are discussed in advance, as every room is different.', ['installation']),
  faq('What happens if a problem is found during installation?', 'If the installers discover features of the room that were not accounted for in the design, or run into technical difficulties, they will tell you and suggest options — for example, additional trimming of elements or a different way of fixing them.', ['installation']),
].flatMap((f) => f.groups.map((group) => ({ question: f.question, answer: f.answer, group })))
  .map((f, i) => ({ ...f, order: i + 1 }));

const stageGroup = (group: Group, list: [string, string?][]) =>
  list.map(([title, text], i) => ({ title, text, group, order: i + 1 }));

export const orderStages = [
  ...stageGroup('home', [
    ['Request', 'Tell us what kind of kitchen you want.'],
    ['Consultation', 'The designer clarifies the budget, dimensions and wishes.'],
    ['Measurement & 3D design', 'We measure the room and design your future kitchen.'],
    ['Contract', 'We fix the specification, price and timing.'],
    ['Production', 'We build the kitchen in our own workshop.'],
    ['Delivery & installation', 'We deliver, assemble, adjust and hand over the finished kitchen.'],
  ]),
  ...stageGroup('kitchen', [['You leave a request'], ['The designer measures the room and creates a design'], ['We agree on materials and price'], ['We build and install the kitchen']]),
  ...stageGroup('about', [
    ['Consultation', 'We discuss the task, style, budget and wishes.'],
    ['Measurement', 'A specialist visits the site and takes the dimensions.'],
    ['Design project', 'We develop the layout and 3D visualisation.'],
    ['Production', 'Once the contract is signed, the kitchen goes into the workshop.'],
    ['Delivery & installation', 'We deliver and assemble the furniture on site.'],
  ]),
  ...stageGroup('materials', [['Define the style of the kitchen'], ['Pick the color and texture'], ['Compare materials by price and properties'], ['Finalise the specification']]),
  ...stageGroup('warranty', [['Contact Alderline'], ['Describe the issue'], ['Attach a photo or video'], ['Wait for the review and agree on the next steps']]),
  ...stageGroup('payment', [['We approve the design'], ['We fix the price'], ['You choose a payment option'], ['The order goes into production']]),
  ...stageGroup('delivery', [['The kitchen is ready in the workshop'], ['We agree on a date'], ['The order is delivered to the site'], ['The furniture is handed over for installation']]),
  ...stageGroup('installation', [['Delivery'], ['Completeness check'], ['Assembly'], ['Adjustment and final check']]),
];

/* ---------- Forms (formId matches LeadForm on the front end) ---------- */

const NAME = { name: 'name', label: 'Your name', type: 'text', placeholder: 'Your name', required: false };
const PHONE = { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (___) ___-____', required: true };
const COMMENT = { name: 'comment', label: 'Comment', type: 'textarea', placeholder: 'Comment (optional)', required: false };
const FILE = { name: 'file', label: 'File or photo', type: 'file', required: false };
const WAY = { name: 'contactWay', label: 'Preferred way to reach you', type: 'radio', options: 'Phone call\nWhatsApp\nTelegram', required: false };

/** CRM lead sources (crm.status.list, ENTITY_ID=SOURCE): CALLBACK — website form, REPEAT_SALE — website quiz */
const form = (
  formId: string,
  title: string,
  submitLabel: string,
  extra: Record<string, unknown>[] = [],
  crmSourceId = 'CALLBACK',
) => ({
  formId,
  title,
  submitLabel,
  crmTitle: `Website: ${title}`,
  crmSourceId,
  willSendToCrm: true,
  inputs: [NAME, PHONE, ...extra],
});

export const forms = [
  form('lead', 'Request (general)', 'Send request', [COMMENT, FILE, WAY]),
  form('promo', 'Join the offer', 'Join the offer'),
  form('quiz', 'Kitchen finder quiz', 'Get my selection', [WAY], 'REPEAT_SALE'),
  form('zamer', 'Book a measurement', 'Book a measurement'),
  form('compare', "Compare another company's quote", 'Use this offer', [FILE, WAY]),
  form('catalog-photo', 'Quote from a kitchen photo', 'Get a quote', [FILE]),
  form('cheaper', 'Find a cheaper option', 'Get a better estimate'),
  form('warranty', 'Warranty question', 'Ask a question', [COMMENT, FILE]),
  form('payment', 'Payment consultation', 'Get a consultation'),
  form('materials', 'Material selection', 'Pick materials', [COMMENT]),
  form('blog', 'Request from the blog', 'Get a preliminary estimate'),
  form('checklist', 'Kitchen renovation checklist', 'Get the checklist'),
  form('article', 'Request from an article', 'Get a quote', [FILE]),
  form('contacts', 'Call back (contact page)', 'Call me back'),
  form('final', 'Final call to action', 'Get a quote'),
  form('promo-main', 'Main offer', 'Claim the credit'),
  form('promo-final', 'Estimate with offers applied', 'Estimate my kitchen'),
  form('delivery', 'Delivery question', 'Call me back', [{ name: 'address', label: 'Site address', type: 'text', placeholder: 'Site address (optional)', required: false }]),
  form('installation', 'Installation question', 'Call me back'),
];

/* ---------- Single types ---------- */

export const setting = {
  siteName: 'Alderline',
  phone: '+1 (555) 010-4820',
  email: 'hello@alderline.studio',
  address: '48 Granary Row, Portland, OR 97209',
  socials: [
    { type: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
    { type: 'pinterest', label: 'Pinterest', url: 'https://www.pinterest.com/' },
    { type: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/15550104820' },
    { type: 'telegram', label: 'Telegram', url: 'https://telegram.org/' },
  ],
  reviewLinks: [],
  header: { tagline: 'Custom kitchens, made to measure', workHours: 'Mon–Sat, 9:00 am – 7:00 pm' },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=48+Granary+Row+Portland+OR+97209',
  // shared validity period of the offers: editors update it once a month
  promoPeriod: { startsAt: '2026-11-01', endsAt: '2026-11-30' },
  company: { legalName: 'Alderline Kitchens LLC', registrationNumber: 'OR 2201-4482', taxId: '93-0000000', legalAddress: '48 Granary Row, Portland, OR 97209' },
  footer: { about: 'Custom kitchens and built-in storage, designed and made in Portland, Oregon', copyright: '© Alderline' },
  forms: {
    consentText: 'I agree to the processing of my personal data in accordance with the Privacy Policy',
    successTitle: 'Thank you! Your request has been sent.',
    successText: 'An Alderline consultant will get back to you shortly.',
    errorText: "We couldn't send your request. Please call us or try again.",
  },
};

export const topline = {
  enabled: true,
  text: '$1,500 design credit on every kitchen ordered this month',
  linkLabel: 'Learn more',
  linkUrl: '/offers',
};

export const quiz = {
  title: 'Answer a few questions and get a selection of kitchens',
  steps: [
    ['shape', 'Which layout do you need?', ['One-wall', 'L-shaped', 'U-shaped', 'With an island', 'With a breakfast bar', 'Not sure yet']],
    ['room', 'What is your room like?', ['Large', 'Small', 'Open-plan kitchen & living room', 'Square', 'Rectangular', 'Has niches and ledges']],
    ['people', 'How many people will use the kitchen?', ['One', 'Two', 'Three or more']],
    ['cooking', 'How often do you cook?', ['Every day', 'A few times a week', 'Rarely']],
    ['style', 'Which style is closest to you?', ['Modern', 'Minimalist', 'Neoclassical', 'Loft', 'Help me choose']],
    ['budget', 'What budget do you have in mind?', ['Under $12,000', '$12,000–20,000', '$20,000–35,000', 'Over $35,000', 'Not sure yet']],
    ['when', 'When do you plan to install the kitchen?', ['Within a month', 'In 1–3 months', 'Later, the renovation is in progress']],
  ].map(([key, question, options]) => ({ key, question, options: (options as string[]).join('\n') })),
  finalTitle: 'Where should we send your selection and estimate?',
  finalText: 'We will reserve the $1,500 design credit for you, prepare a selection of projects and a preliminary estimate.',
  submitLabel: 'Get my selection',
};

/* ---------- Menus (strapi-plugin-navigation) ---------- */

/** Link to a record: [type, slug] — the seed resolves the documentId */
export type NavRef = ['page' | 'kitchen-category', string];

export type NavSeedItem = {
  title: string;
  /** INTERNAL — link to a record */
  ref?: NavRef;
  /** EXTERNAL — a path or URL (anchors, external sites) */
  href?: string;
  /** WRAPPER — group heading without a link */
  wrapper?: boolean;
  items?: NavSeedItem[];
};

const catalogItems: NavSeedItem[] = categories.map((c) => ({ title: c.name, ref: ['kitchen-category', c.slug] }));

const buyerItems: NavSeedItem[] = [
  { title: 'Measurement & design', ref: ['page', 'measurement-and-design'] },
  { title: 'Materials', ref: ['page', 'materials'] },
  { title: 'Delivery', ref: ['page', 'delivery'] },
  { title: 'Installation', ref: ['page', 'installation'] },
  { title: 'Warranty', ref: ['page', 'warranty'] },
  { title: 'Payment & financing', ref: ['page', 'payment-and-financing'] },
];

export const navigations: { name: string; items: NavSeedItem[] }[] = [
  {
    name: 'Main',
    items: [
      { title: 'Catalog', ref: ['page', 'catalog'], items: catalogItems },
      { title: 'Offers', ref: ['page', 'offers'] },
      { title: "Buyer's guide", ref: ['page', 'guide'], items: buyerItems },
      {
        title: 'About',
        ref: ['page', 'about'],
        items: [
          { title: 'Workshop', href: '/about#workshop' },
          { title: 'Team', href: '/about#team' },
          { title: 'Projects', ref: ['page', 'projects'] },
        ],
      },
      { title: 'Reviews', ref: ['page', 'reviews'] },
      { title: 'Blog', ref: ['page', 'blog'] },
      { title: 'Contact', ref: ['page', 'contact'] },
    ],
  },
  {
    name: 'Footer',
    items: [
      { title: 'Catalog', wrapper: true, items: catalogItems },
      { title: "Buyer's guide", wrapper: true, items: [...buyerItems, { title: 'Offers', ref: ['page', 'offers'] }] },
      {
        title: 'Company',
        wrapper: true,
        items: [
          { title: 'About', ref: ['page', 'about'] },
          { title: 'Workshop', href: '/about#workshop' },
          { title: 'Projects', ref: ['page', 'projects'] },
          { title: 'Reviews', ref: ['page', 'reviews'] },
          { title: 'Blog', ref: ['page', 'blog'] },
        ],
      },
    ],
  },
  {
    name: 'Legal',
    items: [
      { title: 'Privacy Policy', ref: ['page', 'privacy-policy'] },
      { title: 'Company details', href: '/contact#company' },
      { title: 'Image credits', href: '/credits' },
    ],
  },
];
