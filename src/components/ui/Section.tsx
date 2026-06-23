import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  label?: string;
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({ id, label, title, action, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      {(label || title || action) && (
        <header className="mb-6 flex items-end justify-between gap-4">
          <div>
            {label && <div className="label mb-2">{label}</div>}
            {title && (
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
