import Image from 'next/image';
import { cn } from '@/lib/cn';
import type { Media } from '@/lib/content/types';
import { Placeholder } from './Placeholder';

type Props = {
  /** Media from Strapi or a static file from /public (`{ url: '/images/hero.jpg' }`); none — grey placeholder */
  media?: Media | null;
  /** Placeholder caption and fallback alt text */
  label: string;
  /** CSS aspect-ratio, e.g. '4/3'; without it the box takes the height from className (min-h-…) */
  ratio?: string;
  /** `sizes` for next/image — the rendered width of the box */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Photo box: next/image (object-cover) when there is a file, otherwise a placeholder of the same shape. */
export function Photo({ media, label, ratio, sizes = '100vw', priority, className }: Props) {
  if (!media?.url) return <Placeholder label={label} ratio={ratio} className={className} />;
  return (
    <div
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={cn('relative overflow-hidden rounded-media bg-surface', className)}
    >
      <Image src={media.url} alt={media.alt ?? label} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

/** Static photo from /public/images */
export const staticPhoto = (file: string, alt: string): Media => ({ url: `/images/${file}`, alt });

/** Round avatar with initials — team members and article authors have no photos in the demo. */
export function Avatar({ name, media, className }: { name: string; media?: Media; className?: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
  return (
    <div
      aria-hidden
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-strong font-semibold text-fg-muted',
        className,
      )}
    >
      {media?.url ? <Image src={media.url} alt="" fill sizes="160px" className="object-cover" /> : initials}
    </div>
  );
}
