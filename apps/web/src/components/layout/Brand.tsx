import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { SocialLink } from '@/lib/content/types';

export function Logo({ tagline, className }: { tagline?: string; className?: string }) {
  return (
    <Link href="/" className={cn('flex shrink-0 items-center gap-3', className)} aria-label="Alderline — home">
      <span className="grid size-9 grid-cols-2 gap-0.5" aria-hidden>
        <i className="rounded-sm bg-fg" />
        <i className="rounded-sm bg-fg/60" />
        <i className="rounded-sm bg-fg/60" />
        <i className="rounded-sm bg-fg" />
      </span>
      <span className="leading-tight">
        <b className="block text-lg tracking-[0.12em]">ALDERLINE</b>
        {tagline && <small className="hidden text-xs text-fg-muted sm:block">{tagline}</small>}
      </span>
    </Link>
  );
}

const SOCIAL_SHORT: Record<SocialLink['type'], string> = {
  instagram: 'IG',
  pinterest: 'PIN',
  facebook: 'FB',
  whatsapp: 'WA',
  telegram: 'TG',
  youtube: 'YT',
};

/** Messenger / social buttons. Icons will come from Figma — text labels for now. */
export function Socials({ items, dark, className }: { items: SocialLink[]; dark?: boolean; className?: string }) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {items.map((s) => (
        <li key={s.type}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            aria-label={s.label}
            className={cn(
              'flex size-9 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors',
              dark ? 'border-on-inverse/30 hover:bg-on-inverse/10' : 'border-line hover:border-fg',
            )}
          >
            {SOCIAL_SHORT[s.type]}
          </a>
        </li>
      ))}
    </ul>
  );
}
