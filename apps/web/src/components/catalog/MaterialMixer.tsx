'use client';

import { useState } from 'react';
import { ModalButton } from '@/components/modals/ModalButton';
import { Photo, staticPhoto } from '@/components/ui/Photo';
import { cn } from '@/lib/cn';

type Option = { value: string; label: string; tone: number; photo?: string };

const GROUPS: { id: string; title: string; options: Option[] }[] = [
  {
    id: 'facade',
    title: 'Cabinet fronts',
    options: [
      { value: 'matte MDF', label: 'Matte MDF', tone: 0, photo: 'mix-matte.jpg' },
      { value: 'glossy MDF', label: 'Glossy MDF', tone: 14, photo: 'mix-gloss.jpg' },
      { value: 'painted', label: 'Painted', tone: 22, photo: 'mix-painted.jpg' },
      { value: 'laminate', label: 'Laminate', tone: -16, photo: 'mix-laminate.jpg' },
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
 * The photo follows the front material; profile and upper cabinets are shown in the caption over it.
 */
export function MaterialMixer() {
  const [state, setState] = useState<Record<string, Option>>(
    Object.fromEntries(GROUPS.map((g) => [g.id, g.options[0]])),
  );
  const caption = `Kitchen: fronts ${state.facade.value} · ${state.relief.value} · ${state.top.value}`;

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="relative" aria-live="polite">
        <Photo
          media={staticPhoto(state.facade.photo ?? 'mix-matte.jpg', caption)}
          label={caption}
          ratio="16/10"
          sizes="(min-width: 1024px) 700px, 100vw"
        />
        <p className="absolute inset-x-3 bottom-3 rounded-media bg-inverse/75 px-4 py-2.5 text-sm text-on-inverse backdrop-blur-sm">
          {caption}
        </p>
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
