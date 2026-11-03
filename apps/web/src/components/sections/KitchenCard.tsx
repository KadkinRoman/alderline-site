import Link from 'next/link';
import { ModalButton } from '@/components/modals/ModalButton';
import { Badge } from '@/components/ui/Badge';
import { buttonClass } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import type { Kitchen } from '@/lib/content/types';
import { discountPercent, formatPrice, installmentFrom } from '@/lib/format';
import { routes } from '@/lib/routes';

/** Kitchen card: photo, badges, discounted price, financing, buttons. */
export function KitchenCard({ kitchen }: { kitchen: Kitchen }) {
  const href = routes.kitchen(kitchen.category.slug, kitchen.slug);
  const discount = discountPercent(kitchen.price, kitchen.oldPrice);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-bg">
      <Link href={href} className="relative block" tabIndex={-1} aria-hidden>
        <Photo media={kitchen.gallery[0]} label="Kitchen photo" ratio="4/3" sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 85vw" className="rounded-none" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {discount > 0 && <Badge>−{discount}%</Badge>}
          {kitchen.badge && <Badge tone="light">{kitchen.badge}</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <span className="text-sm text-fg-muted">{kitchen.shortDesc}</span>
        <h3 className="mt-1 text-lg font-semibold">
          <Link href={href} className="hover:underline">
            {kitchen.name}
          </Link>
        </h3>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
          <b className="text-xl">from {formatPrice(kitchen.price)}</b>
          {kitchen.oldPrice && <s className="text-sm text-fg-muted">{formatPrice(kitchen.oldPrice)}</s>}
        </div>

        <div className="mt-1 text-sm text-fg-muted">
          Financing from {formatPrice(installmentFrom(kitchen.price))}/mo{' '}
          <ModalButton modal={{ type: 'installment' }} unstyled className="underline underline-offset-2 hover:text-fg">
            terms
          </ModalButton>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <ModalButton
            size="sm"
            className="flex-1 whitespace-nowrap"
            modal={{
              type: 'lead',
              title: 'I want a kitchen like this',
              text: `Leave your contact details. A designer will price the ${kitchen.name.toLowerCase()} for your space.`,
              extra: { kitchen: kitchen.name },
            }}
          >
            I want this kitchen
          </ModalButton>
          <Link href={href} className={buttonClass('secondary', 'sm', 'flex-1 whitespace-nowrap')}>
            Learn more
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Promo card inserted into the catalog grid between kitchens. */
export function CatalogPromoCard({ variant }: { variant: 'promo' | 'quiz' }) {
  const isQuiz = variant === 'quiz';
  return (
    <article className="flex h-full flex-col justify-between gap-6 rounded-card bg-inverse p-6 text-on-inverse">
      <div>
        <Badge tone="light">{isQuiz ? 'Quiz · 1 minute' : 'Offer'}</Badge>
        <h3 className="mt-4 text-2xl font-semibold">
          {isQuiz ? 'We will match a kitchen to your wishes' : 'Free countertop or extractor hood'}
        </h3>
        <p className="mt-2 text-on-inverse-muted">
          {isQuiz
            ? 'Take the quiz: we will estimate the cost, lock in your $1,500 design credit and send a selection of projects.'
            : 'With a kitchen order, per the offer terms.'}
        </p>
      </div>
      <ModalButton
        variant="contrast"
        modal={
          isQuiz
            ? { type: 'quiz' }
            : {
                type: 'promo',
                title: 'Free countertop or extractor hood',
                text: 'Order an Alderline kitchen and get a free countertop or extractor hood per the offer terms.',
              }
        }
      >
        {isQuiz ? 'Take the quiz' : 'About this offer'}
      </ModalButton>
    </article>
  );
}
