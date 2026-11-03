'use client';

import { useState } from 'react';
import { ModalButton } from '@/components/modals/ModalButton';
import { cn } from '@/lib/cn';

type Option = { value: string; label: string; tone: number };

const GROUPS: { id: string; title: string; options: Option[] }[] = [
  {
    id: 'facade',
    title: 'Cabinet fronts',
    options: [
      { value: 'matte MDF', label: 'Matte MDF', tone: 0 },
      { value: 'glossy MDF', label: 'Glossy MDF', tone: 14 },
      { value: 'painted', label: 'Painted', tone: 22 },
      { value: 'laminate', label: 'Laminate', tone: -16 },
    ],
  },
  {
    id: 'relief',
    title: 'Profile',
    options: [
      { value: 'flat fronts', label: 'Flat', tone: 0 },
      { value: 'routed profile', label: 'Routed', tone: -10 },
      { value: 'slatted', label: 'Slatted', tone: -20 },
    ],
  },
  {
    id: 'top',
    title: 'Upper cabinets',
    options: [
      { value: 'solid doors', label: 'Solid', tone: 0 },
      { value: 'glass doors', label: 'Glass', tone: 10 },
    ],
  },
];

/**
 * "Build your kitchen": choosing fronts / profile / cabinets changes the visual.
 * For now the visual is a grey placeholder with a caption; with Figma / renders — a set of images per combination.
 */
export function MaterialMixer() {
  const [state, setState] = useState<Record<string, Option>>(
    Object.fromEntries(GROUPS.map((g) => [g.id, g.options[0]])),
  );
  const caption = `Kitchen: fronts ${state.facade.value} · ${state.relief.value} · ${state.top.value}`;
  const lightness = Math.max(200, Math.min(252, Math.round(236 + (state.facade.tone + state.relief.tone + state.top.tone) / 2)));

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div
        role="img"
        aria-label={caption}
        aria-live="polite"
        className="flex min-h-72 items-center justify-center rounded-card border border-line p-6 text-center text-fg-muted transition-colors lg:min-h-96"
        style={{ background: `rgb(${lightness} ${lightness} ${lightness})` }}
      >
        {caption}
      </div>
      <div className="space-y-6">
        {GROUPS.map((g) => (
          <fieldset key={g.id}>
            <legend className="mb-2 font-semibold">{g.title}</legend>
            <div className="flex flex-wrap gap-2">
              {g.options.map((o) => {
                const active = state[g.id].value === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setState((s) => ({ ...s, [g.id]: o }))}
                    className={cn(
                      'min-h-10 rounded-control border px-4 text-sm transition-colors',
                      active ? 'border-fg bg-fg text-bg' : 'border-line hover:border-fg',
                    )}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
        <ModalButton
          modal={{
            type: 'lead',
            title: 'Choose materials',
            form: { formId: 'materials', submitLabel: 'Choose materials' },
            extra: { selection: caption },
          }}
        >
          Choose these materials
        </ModalButton>
      </div>
    </div>
  );
}
