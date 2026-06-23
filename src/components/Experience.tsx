import { experience } from '../lib/data';
import { Section } from './ui/Section';
import { CompanyCard } from './CompanyCard';

export function Experience({ onSkillClick }: { onSkillClick: (item: string) => void }) {
  return (
    <Section
      label="02 · timeline"
      title={
        <span>
          {experience.length} companies <span className="text-mute">· reverse chronological</span>
        </span>
      }
      className="animate-fade-up"
    >
      <div className="relative space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-edge sm:before:hidden">
        {experience.map((exp, i) => (
          <div key={exp.company} className="relative sm:pl-0 pl-5">
            {/* timeline dot (mobile) */}
            <span className="absolute left-[3px] top-7 block h-2 w-2 rounded-full bg-accent sm:hidden" />
            <CompanyCard exp={exp} index={i} onSkillClick={onSkillClick} />
          </div>
        ))}
      </div>
    </Section>
  );
}
