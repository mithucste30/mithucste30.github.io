import { useEffect, useMemo, useRef, useState } from 'react';
import { skillIndex, type SkillRecord } from '../lib/data';
import { Section } from './ui/Section';
import { Chip } from './ui/Chip';
import { TechMark } from './ui/Mark';
import { IconChevron } from '../lib/icons';
import { SkillDetail } from './SkillDetail';

interface Props {
  query: string;
  focusSkill: string | null;
  onCompanyClick: (company: string) => void;
  onSkillClick: (item: string) => void;
}

export function Skills({ query, focusSkill, onCompanyClick, onSkillClick }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const rowRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // focus from a stack chip elsewhere → expand + scroll
  useEffect(() => {
    if (focusSkill) {
      const rec = skillIndex.find(
        (r) => r.item.toLowerCase() === focusSkill.toLowerCase(),
      );
      if (rec) {
        setExpanded(rec.item);
        requestAnimationFrame(() => {
          rowRefs.current.get(rec.item)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }
    }
  }, [focusSkill]);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => (q ? skillIndex.filter((r) => r.item.toLowerCase().includes(q)) : skillIndex),
    [q],
  );

  const ranked = useMemo(
    () => [...skillIndex].sort((a, b) => b.companyCount - a.companyCount).slice(0, 10),
    [],
  );

  const grouped = useMemo(() => {
    const map = new Map<number, { category: string; records: SkillRecord[] }>();
    for (const r of filtered) {
      if (!map.has(r.categoryIndex)) map.set(r.categoryIndex, { category: r.category, records: [] });
      map.get(r.categoryIndex)!.records.push(r);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [filtered]);

  return (
    <Section
      label="03 · matrix"
      title={
        <span>
          {q ? (
            <>
              {filtered.length} match{filtered.length === 1 ? '' : 'es'}{' '}
              <span className="text-mute">for “{query}”</span>
            </>
          ) : (
            <>
              {skillIndex.length} skills <span className="text-mute">· click to trace usage</span>
            </>
          )}
        </span>
      }
      className="animate-fade-up"
    >
      {/* ranking strip */}
      {!q && (
        <div className="mb-6">
          <div className="label mb-2">most-used across companies</div>
          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
            {ranked.map((r) => (
              <Chip key={r.item} onClick={() => onSkillClick(r.item)} count={r.companyCount} icon={<TechMark item={r.item} size={14} />}>
                {r.item.replace(/\([^)]*\)/g, '').trim()}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="panel rounded-xl p-8 text-center text-sm text-mute">
          No skills match “{query}”. Try a broader term.
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(([_, { category, records }]) => (
            <div key={category}>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-sm font-semibold tracking-tight text-ink">{category}</h3>
                <span className="font-mono text-[0.625rem] text-faint">{records.length}</span>
                <span className="h-px flex-1 bg-edge" />
              </div>
              <div className="panel overflow-hidden rounded-xl">
                {records.map((r, i) => {
                  const isOpen = expanded === r.item;
                  return (
                    <div
                      key={r.item}
                      className={i > 0 ? 'border-t border-edge' : ''}
                    >
                      <button
                        ref={(el) => {
                          if (el) rowRefs.current.set(r.item, el);
                        }}
                        onClick={() => setExpanded(isOpen ? null : r.item)}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-panel-2 sm:px-4"
                        aria-expanded={isOpen}
                      >
                        <TechMark item={r.item} size={18} />
                        <span className="min-w-0 flex-1 truncate text-sm text-ink">{r.item}</span>
                        {r.companyCount > 0 && (
                          <span className="shrink-0 rounded border border-edge px-1.5 py-0.5 font-mono text-[0.625rem] text-mute">
                            {r.companyCount} co{r.companyCount === 1 ? '' : 's'}
                          </span>
                        )}
                        <IconChevron
                          width={15}
                          height={15}
                          className={`shrink-0 text-faint transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="bg-panel-2/30">
                          <SkillDetail record={r} onCompanyClick={onCompanyClick} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
