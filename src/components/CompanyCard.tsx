import { useState } from 'react';
import type { Experience } from '../lib/types';
import { fmtDateRange, fmtDuration, companySlug } from '../lib/data';
import { CompanyMark, TechMark } from './ui/Mark';
import { Chip } from './ui/Chip';
import { Badge, SourceBadge } from './ui/Badge';

interface Props {
  exp: Experience;
  index: number;
  onSkillClick: (item: string) => void;
}

const TYPE_TONE: Record<string, 'accent' | 'positive' | 'muted'> = {
  'full-time': 'positive',
  'part-time': 'muted',
  contract: 'accent',
  'co-founder': 'accent',
};

export function CompanyCard({ exp, index, onSkillClick }: Props) {
  const [open, setOpen] = useState(index < 1);
  const titles = [...new Set(exp.roles.map((r) => r.title))];
  const shownHighlights = open ? exp.highlights : exp.highlights.slice(0, 3);
  const hiddenCount = exp.highlights.length - shownHighlights.length;

  return (
    <article
      id={companySlug(exp.company)}
      className="panel relative scroll-mt-24 rounded-xl p-5 transition-colors sm:p-6"
    >
      {/* header */}
      <div className="flex flex-wrap items-start gap-4">
        <CompanyMark name={exp.company} size={52} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <h3 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">{exp.company}</h3>
            <Badge tone={TYPE_TONE[exp.employment_type] ?? 'muted'}>{exp.employment_type}</Badge>
            {exp.end_date === 'present' && (
              <Badge tone="positive">
                <span className="block h-1.5 w-1.5 rounded-full bg-positive animate-pulse-dot" />
                current
              </Badge>
            )}
          </div>
          <div className="mt-0.5 text-sm text-mute">
            {titles.join(' · ')}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 font-mono text-xs text-faint">
            <span>{fmtDateRange(exp.start_date, exp.end_date)}</span>
            <span>·</span>
            <span>{fmtDuration(exp.start_date, exp.end_date)}</span>
            <span>·</span>
            <span>{exp.location}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-mute">{exp.description}</p>

      {/* highlights */}
      <ul className="mt-4 space-y-2">
        {shownHighlights.map((h, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink/90">
            <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-accent/70" />
            <span className="min-w-0">
              {h.text} <SourceBadge sources={h.sources} />
            </span>
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <button
          onClick={() => setOpen(true)}
          className="mt-2 font-mono text-xs text-accent hover:underline"
        >
          + {hiddenCount} more highlights
        </button>
      )}

      {/* stack */}
      {exp.stack.length > 0 && (
        <div className="mt-5">
          <div className="label mb-2">stack</div>
          <div className="flex flex-wrap gap-1.5">
            {exp.stack.map((s) => (
              <Chip key={s} onClick={() => onSkillClick(s)} icon={<TechMark item={s} size={14} />}>
                {s}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {/* projects */}
      {exp.projects && exp.projects.length > 0 && (
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {exp.projects.map((p) => (
            <div key={p.name} className="rounded-lg border border-edge/70 bg-panel-2/50 p-3">
              <div className="text-sm font-medium text-ink">{p.name}</div>
              {p.highlights[0] && (
                <p className="mt-1 text-xs leading-relaxed text-mute">{p.highlights[0].text}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
