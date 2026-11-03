import type { ReactNode } from 'react';
import { ChipList } from '@/components/ui/Badge';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/layout';
import { Photo, staticPhoto } from '@/components/ui/Photo';
import { cn } from '@/lib/cn';
import type { Media } from '@/lib/content/types';

/** Home hero: background photo with a dark overlay + offers panel. */
export function HeroVideo({
  title,
  lead,
  actions,
  aside,
}: {
  title: ReactNode;
  lead: ReactNode;
  actions: ReactNode;
  /** Right side: offers panel */
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-inverse text-on-inverse">
      <Photo
        media={staticPhoto('hero.jpg', 'Light custom kitchen with a wooden countertop')}
        label="Alderline kitchen"
        priority
        className="absolute inset-0 -z-20 rounded-none"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-inverse/85 via-inverse/70 to-inverse/40" aria-hidden />
      <Container className="flex min-h-[520px] items-center py-16 md:min-h-[640px]">
        <div className={cn('grid w-full items-end gap-8', !!aside && 'lg:grid-cols-[1fr_minmax(0,360px)]')}>
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold md:text-6xl">{title}</h1>
            <p className="mt-5 text-lg text-on-inverse-muted md:text-xl">{lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}

type PageHeroProps = {
  crumbs?: Crumb[];
  title: ReactNode;
  lead?: ReactNode;
  sub?: ReactNode;
  chips?: string[];
  actions?: ReactNode;
  /** Media placeholder caption on the right; null — no media */
  media?: string | null;
  /** Photo on the right (Strapi media or a static file); without it — a placeholder with the caption */
  image?: Media;
  children?: ReactNode;
  className?: string;
};

/** Hero of inner pages: breadcrumbs, H1, lead, chips, buttons, media on the right. */
export function PageHero({ crumbs, title, lead, sub, chips, actions, media, image, children, className }: PageHeroProps) {
  return (
    <section className={cn('pt-6 pb-10 md:pb-14', className)}>
      <Container>
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={cn('mt-6 grid items-center gap-8', media !== null && 'lg:grid-cols-2')}>
          <div>
            <h1 className="text-3xl font-semibold md:text-5xl">{title}</h1>
            {lead && <p className="mt-4 text-lg md:text-xl">{lead}</p>}
            {sub && <p className="mt-3 text-fg-muted">{sub}</p>}
            {chips && <ChipList items={chips} className="mt-5" />}
            {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {media !== null && (
            <Photo media={image} label={media ?? 'Photo'} priority sizes="(min-width: 1024px) 600px, 100vw" className="min-h-64 lg:min-h-96" />
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}
