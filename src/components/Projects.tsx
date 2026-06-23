import { projectsFlat } from '../lib/data';
import { Section } from './ui/Section';
import { ProjectArt, TechMark } from './ui/Mark';
import { Chip } from './ui/Chip';
import { IconArrow } from '../lib/icons';

export function Projects({
  onSkillClick,
  onCompanyClick,
}: {
  onSkillClick: (item: string) => void;
  onCompanyClick: (company: string) => void;
}) {
  return (
    <Section
      label="04 · showcase"
      title={
        <span>
          {projectsFlat.length} flagship builds <span className="text-mute">· across the career</span>
        </span>
      }
      className="animate-fade-up"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {projectsFlat.map((p) => (
          <article key={p.slug} className="panel group overflow-hidden rounded-xl">
            <ProjectArt name={p.name} company={p.company} className="aspect-[16/8]" />
            <div className="p-4 sm:p-5">
              <button
                onClick={() => onCompanyClick(p.company)}
                className="group/co inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-micro text-accent"
              >
                {p.company}
                <IconArrow width={12} height={12} className="transition-transform group-hover/co:translate-x-0.5" />
              </button>
              <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink">{p.name}</h3>

              {p.highlights[0] && (
                <p className="mt-2 text-sm leading-relaxed text-mute">{p.highlights[0].text}</p>
              )}
              {p.highlights[1] && (
                <p className="mt-1.5 text-sm leading-relaxed text-mute/80">{p.highlights[1].text}</p>
              )}

              {p.stack && p.stack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <Chip key={s} onClick={() => onSkillClick(s)} icon={<TechMark item={s} size={13} />}>
                      {s}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
