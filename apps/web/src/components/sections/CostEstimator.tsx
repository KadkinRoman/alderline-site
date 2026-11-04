'use client';

import { useId, useState } from 'react';
import { ModalButton } from '@/components/modals/ModalButton';
import { cn } from '@/lib/cn';
import { formatPrice, installmentFrom } from '@/lib/format';
import { REVIEW_SUMMARY } from '@/lib/trust';

/*
 * Ballpark price of a kitchen: layout × run length × finish tier + options.
 * Demo pricing of the fictional studio; the range is ±8–12% around the computed figure.
 */
const SETUP = 4800; // design, measurement, delivery and installation crew — per project

const LAYOUTS = [
  { id: 'one-wall', label: 'One-wall', factor: 1 },
  { id: 'l-shaped', label: 'L-shaped', factor: 1.08 },
  { id: 'u-shaped', label: 'U-shaped', factor: 1.15 },
  { id: 'galley', label: 'Galley', factor: 1.1 },
] as const;

const FINISHES = [
  { id: 'essential', label: 'Essential', perMeter: 2300, note: 'Laminate fronts, soft-close hardware' },
  { id: 'signature', label: 'Signature', perMeter: 3300, note: 'Painted MDF, full-extension drawers' },
  { id: 'atelier', label: 'Atelier', perMeter: 4600, note: 'Oak veneer or solid wood, premium inserts' },
] as const;

const EXTRAS = [
  { id: 'island', label: 'Kitchen island', price: 3800 },
  { id: 'pantry', label: 'Tall pantry unit', price: 1600 },
  { id: 'lighting', label: 'Under-cabinet LED lighting', price: 450 },
] as const;

const round100 = (n: number) => Math.round(n / 100) * 100;
const toFeet = (m: number) => Math.round(m * 3.281);

function Segmented<T extends { id: string; label: string }>({
  legend,
  options,
  value,
  onChange,
  hint,
}: {
  legend: string;
  options: readonly T[];
  value: string;
  onChange: (id: string) => void;
  hint?: (o: T) => string;
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <div className={cn('mt-3 grid gap-2', options.length === 3 ? 'sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4')}>
        {options.map((o) => (
          <label key={o.id} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={value === o.id}
              onChange={() => onChange(o.id)}
              className="peer sr-only"
            />
            <span
              className={cn(
                'flex h-full flex-col rounded-media border border-line bg-paper px-4 py-3 text-[15px] transition-colors',
                'peer-checked:border-fg peer-checked:bg-fg peer-checked:text-on-primary',
                'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary',
                'hover:border-fg/60',
              )}
            >
              <span className="font-medium">{o.label}</span>
              {hint && <span className="mt-0.5 text-xs opacity-70">{hint(o)}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** "What will my kitchen cost?" — instant ballpark range; the button sends the configuration with the request. */
export function CostEstimator({ id = 'estimate' }: { id?: string }) {
  const [layout, setLayout] = useState<string>('l-shaped');
  const [finish, setFinish] = useState<string>('signature');
  const [length, setLength] = useState(3.6);
  const [extras, setExtras] = useState<string[]>([]);
  const lengthId = useId();

  const lay = LAYOUTS.find((l) => l.id === layout)!;
  const fin = FINISHES.find((f) => f.id === finish)!;
  const extrasTotal = EXTRAS.filter((e) => extras.includes(e.id)).reduce((s, e) => s + e.price, 0);
  const total = (SETUP + length * fin.perMeter) * lay.factor + extrasTotal;
  const low = round100(total * 0.93);
  const high = round100(total * 1.12);
  const summary = `${lay.label}, ${length.toFixed(1)} m (${toFeet(length)} ft), ${fin.label}${
    extras.length ? ` + ${EXTRAS.filter((e) => extras.includes(e.id)).map((e) => e.label.toLowerCase()).join(', ')}` : ''
  }`;

  const toggleExtra = (x: string) => setExtras((list) => (list.includes(x) ? list.filter((i) => i !== x) : [...list, x]));

  return (
    <section id={id} className="scroll-mt-24 py-12 md:py-20">
      <div className="mx-auto w-full max-w-site px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div>
            <p className="eyebrow">Cost estimator</p>
            <h2 className="mt-3 text-4xl md:text-6xl">What will your kitchen cost?</h2>
            <p className="mt-4 max-w-xl text-lg text-fg-muted">
              Pick a layout, the length of your cabinet run and a finish. You get an honest ballpark in seconds — no email
              required.
            </p>

            <div className="mt-8 space-y-7">
              <Segmented legend="Layout" options={LAYOUTS} value={layout} onChange={setLayout} />

              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={lengthId} className="text-sm font-medium">
                    Length of cabinet run
                  </label>
                  <output htmlFor={lengthId} className="font-display text-2xl">
                    {length.toFixed(1)} m <span className="text-base text-fg-muted">≈ {toFeet(length)} ft</span>
                  </output>
                </div>
                <input
                  id={lengthId}
                  type="range"
                  min={2.4}
                  max={8}
                  step={0.2}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="mt-3 w-full accent-[var(--color-fg)]"
                />
                <div className="mt-1 flex justify-between text-xs text-fg-muted">
                  <span>2.4 m · studio</span>
                  <span>8 m · open-plan</span>
                </div>
              </div>

              <Segmented legend="Finish" options={FINISHES} value={finish} onChange={setFinish} hint={(o) => o.note} />

              <fieldset>
                <legend className="text-sm font-medium">Options</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {EXTRAS.map((x) => (
                    <label key={x.id} className="cursor-pointer">
                      <input
                        type="checkbox"
                        checked={extras.includes(x.id)}
                        onChange={() => toggleExtra(x.id)}
                        className="peer sr-only"
                      />
                      <span className="inline-flex min-h-10 items-center gap-2 rounded-control border border-line bg-paper px-4 text-sm transition-colors peer-checked:border-fg peer-checked:bg-fg peer-checked:text-on-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary hover:border-fg/60">
                        {x.label}
                        <span className="opacity-60">+{formatPrice(x.price)}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-block bg-inverse p-7 text-on-inverse md:p-9" aria-live="polite">
              <p className="text-sm text-on-inverse-muted">Estimated price</p>
              <p className="mt-2 font-display text-5xl leading-none md:text-6xl">
                {formatPrice(low)}
                <span className="text-on-inverse-muted"> – </span>
                {formatPrice(high)}
              </p>
              <p className="mt-3 text-on-inverse-muted">or from {formatPrice(installmentFrom(low))}/mo with financing</p>

              <dl className="mt-7 space-y-3 border-t border-on-inverse/15 pt-6 text-[15px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-on-inverse-muted">Your configuration</dt>
                  <dd className="text-right">{summary}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-on-inverse-muted">Included</dt>
                  <dd className="text-right">Design, cabinets, hardware, delivery, installation</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-on-inverse-muted">Quoted separately</dt>
                  <dd className="text-right">Countertop, appliances, plumbing</dd>
                </div>
              </dl>

              <ModalButton
                variant="contrast"
                size="lg"
                className="mt-8 w-full"
                modal={{
                  type: 'lead',
                  title: 'Get an exact quote',
                  text: `Your ballpark: ${formatPrice(low)}–${formatPrice(high)}. Leave your phone number and a designer will confirm the price after a free measurement.`,
                  form: { submitLabel: 'Get my exact quote' },
                  extra: { estimate: `${formatPrice(low)}–${formatPrice(high)}`, configuration: summary },
                }}
              >
                Get an exact quote
              </ModalButton>
              <p className="mt-4 flex items-center justify-center gap-2 text-sm text-on-inverse-muted">
                <span className="text-star" aria-hidden>
                  ★★★★★
                </span>
                {REVIEW_SUMMARY.rating} from {REVIEW_SUMMARY.count} reviews · free, no obligation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
