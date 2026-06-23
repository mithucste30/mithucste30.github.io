import type { ReactNode } from 'react';

export function Badge({ children, tone = 'muted' }: { children: ReactNode; tone?: 'muted' | 'accent' | 'positive' }) {
  const tones = {
    muted: 'border-edge text-mute',
    accent: 'border-accent/40 text-accent bg-accent-soft',
    positive: 'border-positive/40 text-positive',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-micro ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

const SOURCE_COLORS: Record<string, string> = {
  source: '#8b93a1',
  oneleet: '#7ee787',
  exnaton: '#79c0ff',
  optimizely: '#ffb454',
  zipdev: '#d2a8ff',
};

/** Subtle source provenance dots — shows which CVs a highlight came from. */
export function SourceBadge({ sources }: { sources?: string[] }) {
  if (!sources || sources.length === 0) return null;
  return (
    <span className="inline-flex items-center gap-1" title={`Sourced from: ${sources.join(', ')}`}>
      {sources.map((s) => (
        <span
          key={s}
          className="block h-1.5 w-1.5 rounded-full ring-1 ring-current/10"
          style={{ backgroundColor: SOURCE_COLORS[s] ?? '#8b93a1' }}
        />
      ))}
    </span>
  );
}
