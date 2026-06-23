import authorImg from '../../author.jpg';
import {
  profile,
  stats,
  currentRole,
  fmtDateRange,
  experience,
} from '../lib/data';
import { IconMail, IconPhone, IconGithub, IconLinkedin, IconPin, IconGlobe, IconArrow, IconBolt } from '../lib/icons';
import type { Lens } from './TopNav';

function ContactButton({ href, label, children, external }: { href: string; label: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-edge text-mute transition-all hover:border-accent/50 hover:text-accent"
    >
      {children}
    </a>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="panel rounded-lg p-3 sm:p-4">
      <div className="font-mono text-2xl font-semibold tracking-tight text-ink tabular-nums sm:text-3xl">{value}</div>
      <div className="label mt-1">{label}</div>
    </div>
  );
}

function LensCard({ code, title, desc, onClick }: { code: string; title: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group panel relative overflow-hidden rounded-xl p-5 text-left transition-all hover:border-accent/40"
    >
      <div className="flex items-center justify-between">
        <span className="label">{code}</span>
        <IconArrow className="text-faint transition-all group-hover:translate-x-1 group-hover:text-accent" width={16} height={16} />
      </div>
      <div className="mt-6 text-lg font-semibold text-ink">{title}</div>
      <div className="mt-1 text-sm text-mute">{desc}</div>
    </button>
  );
}

export function Overview({ setLens }: { setLens: (l: Lens) => void }) {
  const summary = profile.summaries.find((s) => s.source === 'source') ?? profile.summaries[0];

  return (
    <div className="animate-fade-up space-y-10">
      {/* Hero */}
      <section className="grid items-center gap-6 lg:grid-cols-[auto_1fr] lg:gap-10">
        {/* photo */}
        <div className="relative mx-auto w-fit lg:mx-0">
          <div className="glow-orb absolute -inset-4 opacity-60" />
          <div className="relative overflow-hidden rounded-xl border border-edge bg-panel-2">
            <img
              src={authorImg}
              alt={profile.name}
              width={240}
              height={300}
              className="h-64 w-52 object-cover sm:h-72 sm:w-60"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-canvas to-transparent p-3">
              <span className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-micro text-positive">
                <span className="block h-1.5 w-1.5 rounded-full bg-positive animate-pulse-dot" />
                available
              </span>
            </div>
          </div>
        </div>

        {/* identity */}
        <div className="min-w-0">
          <div className="label mb-3">platform engineer · architect · AI-native</div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-base text-mute sm:text-lg">
            {summary?.text}
          </p>

          {/* contact row */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <ContactButton href={`mailto:${profile.email}`} label="Email">
              <IconMail width={16} height={16} />
            </ContactButton>
            <ContactButton href={`tel:${profile.phone}`} label="Phone">
              <IconPhone width={16} height={16} />
            </ContactButton>
            <ContactButton href={`https://github.com/${profile.social.github}`} label="GitHub" external>
              <IconGithub width={16} height={16} />
            </ContactButton>
            <ContactButton href={`https://linkedin.com/in/${profile.social.linkedin}`} label="LinkedIn" external>
              <IconLinkedin width={16} height={16} />
            </ContactButton>
            <ContactButton href={profile.website} label="Website" external>
              <IconGlobe width={16} height={16} />
            </ContactButton>
            <span className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-edge px-2.5 py-2 text-xs text-mute">
              <IconPin width={14} height={14} /> {profile.location}
            </span>
          </div>

          {/* current focus */}
          {currentRole && (
            <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-lg border border-accent/30 bg-accent-soft px-3 py-2 text-sm">
              <IconBolt className="text-accent" width={15} height={15} />
              <span className="text-mute">Now:</span>
              <span className="font-medium text-ink">{currentRole.roles[0]?.title}</span>
              <span className="text-faint">·</span>
              <span className="font-mono text-xs text-accent">{currentRole.company}</span>
              <span className="text-faint">·</span>
              <span className="font-mono text-xs text-mute">{fmtDateRange(currentRole.start_date, currentRole.end_date)}</span>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Stat value={`${stats.since}`} label="Building since" />
        <Stat value={`${stats.companies}`} label="Companies" />
        <Stat value={`${stats.categories}`} label="Skill domains" />
        <Stat value={`${stats.skills}`} label="Technologies" />
        <Stat value={`${stats.projects}`} label="Featured projects" />
      </section>

      {/* Lens jump cards */}
      <section className="grid gap-3 sm:grid-cols-3">
        <LensCard
          code="02 · experience"
          title="By Company"
          desc={`${experience.length} roles, newest first — expandable highlights, stack, and projects per company.`}
          onClick={() => setLens('experience')}
        />
        <LensCard
          code="03 · skills"
          title="By Skill"
          desc="Matrix of technologies. Click any skill to see every company that used it."
          onClick={() => setLens('skills')}
        />
        <LensCard
          code="04 · projects"
          title="By Project"
          desc="Flagship builds across the career with stack and outcomes."
          onClick={() => setLens('projects')}
        />
      </section>
    </div>
  );
}
