import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-site px-4 sm:px-6', className)}>{children}</div>;
}

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Vertical section padding */
  spacing?: 'none' | 'sm' | 'md';
  /** No container — for full-width blocks */
  bleed?: boolean;
};

const spacingClass = { none: '', sm: 'py-6 md:py-8', md: 'py-10 md:py-14' };

export function Section({ children, id, className, spacing = 'md', bleed = false }: SectionProps) {
  return (
    <section id={id} className={cn(spacingClass[spacing], className)}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

type HeadingProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
  /** h1 — for the first screen of the page */
  as?: 'h1' | 'h2';
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({ title, subtitle, eyebrow, as: Tag = 'h2', className, children }: HeadingProps) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow && <div className="mb-2 text-sm text-fg-muted">{eyebrow}</div>}
      <Tag className={Tag === 'h1' ? 'text-3xl font-semibold md:text-5xl' : 'text-2xl font-semibold md:text-4xl'}>
        {title}
      </Tag>
      {subtitle && <p className="mt-3 text-fg-muted md:text-lg">{subtitle}</p>}
      {children}
    </div>
  );
}

/** Row of buttons below the block */
export function Actions({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mt-6 flex flex-wrap gap-3', className)}>{children}</div>;
}
