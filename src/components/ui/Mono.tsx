import type { ReactNode } from 'react';

export function Mono({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[0.6875rem] uppercase tracking-micro text-mute ${className}`}>
      {children}
    </span>
  );
}
