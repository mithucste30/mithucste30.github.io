import type { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  title?: string;
  icon?: ReactNode;
  count?: number;
}

export function Chip({ children, onClick, active, title, icon, count }: ChipProps) {
  const cls = [
    'group inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[0.8125rem] leading-none transition-all duration-200',
    active
      ? 'border-accent/60 bg-accent-soft text-accent'
      : onClick
        ? 'border-edge text-mute hover:border-accent/50 hover:text-ink cursor-pointer'
        : 'border-edge/70 text-mute',
  ].join(' ');

  if (onClick) {
    return (
      <button type="button" onClick={onClick} title={title} className={cls}>
        {icon}
        <span>{children}</span>
        {count != null && (
          <span className="ml-0.5 font-mono text-[0.6875rem] text-faint tabular-nums">{count}</span>
        )}
      </button>
    );
  }
  return (
    <span className={cls} title={title}>
      {icon}
      <span>{children}</span>
      {count != null && (
        <span className="ml-0.5 font-mono text-[0.6875rem] text-faint tabular-nums">{count}</span>
      )}
    </span>
  );
}
