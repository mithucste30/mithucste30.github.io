import type { SkillRecord } from '../lib/data';
import { fmtDateRange } from '../lib/data';
import { CompanyMark, TechMark } from './ui/Mark';

interface Props {
  record: SkillRecord;
  onCompanyClick: (company: string) => void;
}

export function SkillDetail({ record, onCompanyClick }: Props) {
  if (record.matches.length === 0) {
    return (
      <div className="px-3 py-3 text-xs text-mute">
        Appears in the skill catalog — no direct stack match in the experience record.
      </div>
    );
  }
  return (
    <div className="space-y-3 px-1 pb-3 pt-1 sm:px-3">
      {/* companies */}
      <div className="grid gap-2 sm:grid-cols-2">
        {record.matches.map((m) => (
          <button
            key={m.experience.company}
            onClick={() => onCompanyClick(m.experience.company)}
            className="group flex items-start gap-3 rounded-lg border border-edge/70 bg-panel-2/50 p-2.5 text-left transition-colors hover:border-accent/40"
          >
            <CompanyMark name={m.experience.company} size={36} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-ink group-hover:text-accent">
                  {m.experience.company}
                </span>
                <span className="shrink-0 font-mono text-[0.625rem] text-faint">
                  {fmtDateRange(m.experience.start_date, m.experience.end_date)}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {m.matchedStack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    id={undefined}
                    className="inline-flex items-center gap-1 rounded border border-edge/60 px-1.5 py-0.5 font-mono text-[0.625rem] text-mute"
                  >
                    <TechMark item={s} size={11} /> {s.replace(/\([^)]*\)/g, '').trim()}
                  </span>
                ))}
                {m.inHighlight && (
                  <span className="inline-flex items-center rounded border border-positive/30 px-1.5 py-0.5 font-mono text-[0.625rem] text-positive">
                    cited
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
