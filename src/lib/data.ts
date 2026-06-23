import portfolioYaml from '../../portfolio.yaml';
import type {
  Portfolio,
  Profile,
  SkillCategory,
  Experience,
  Education,
  Highlight,
  Project,
} from './types';

/* ------------------------------------------------------------------ *
 * The single source of truth, parsed at build time by the vite plugin.
 * ------------------------------------------------------------------ */
export const portfolio = portfolioYaml as Portfolio;

export const profile: Profile = portfolio.profile;
export const skills: SkillCategory[] = portfolio.skills;
export const experience: Experience[] = portfolio.experience;
export const education: Education[] = portfolio.education;

/* ------------------------------------------------------------------ *
 * Text helpers — normalization drives the skill <-> company index.
 * ------------------------------------------------------------------ */
const STOPWORDS = new Set([
  'and', 'for', 'the', 'with', 'based', 'using', 'use', 'via', 'into',
  'from', 'over', 'across', 'within', 'etc', 'including', 'include',
  'such', 'well', 'plus', 'also', 'only', 'per', 'all', 'new', 'old',
  'design', 'development', 'service', 'services', 'system', 'systems',
  'data', 'processing', 'management', 'integration', 'tools', 'tooling',
  'platform', 'platforms', 'engineer', 'engineering', 'custom', 'best',
  'practices', 'practice', 'proper', 'standards', 'support', 'supporting',
  'pipeline', 'pipelines', 'application', 'applications', 'production',
]);

/** Remove parenthetical content: "Golang (Fiber, Echo)" -> "Golang". */
export function stripParenthetical(s: string): string {
  return s.replace(/\([^)]*\)/g, ' ').trim();
}

/** Tokenize into significant lowercase alnum tokens (len >= 3, not a stopword). */
export function tokenize(s: string): Set<string> {
  const out = new Set<string>();
  const stripped = stripParenthetical(s.toLowerCase());
  const parts = stripped.split(/[^a-z0-9]+/);
  for (const p of parts) {
    if (p.length >= 3 && !STOPWORDS.has(p)) out.add(p);
  }
  return out;
}

/** slugify: "BareMetalCloud" -> "baremetalcloud", "Ride-Sharing Platform" -> "ride-sharing-platform". */
export function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Company slug: strips parentheticals then lowercases alphanumerics.
 *  "Seedrs (acquired by Republic)" -> "seedrs" */
export function companySlug(s: string): string {
  return s
    .replace(/\([^)]*\)/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

/** The "primary token" of a skill — used as the matching key. */
export function primaryToken(item: string): string {
  const tokens = [...tokenize(item)];
  // prefer the longest token (skips short noise), falls back to first
  return tokens.sort((a, b) => b.length - a.length)[0] ?? item.toLowerCase();
}

/* ------------------------------------------------------------------ *
 * Derived index: skill -> companies / evidence.
 * ------------------------------------------------------------------ */
export interface SkillCompanyMatch {
  experience: Experience;
  matchedStack: string[]; // raw stack items whose tokens overlap the skill
  inHighlight: boolean; // skill token appears in any highlight text
}

export interface SkillRecord {
  item: string;
  category: string;
  categoryIndex: number;
  matches: SkillCompanyMatch[];
  companyCount: number;
}

function experienceStackTokens(exp: Experience): {
  perItem: Map<string, Set<string>>;
  all: Set<string>;
} {
  const perItem = new Map<string, Set<string>>();
  const all = new Set<string>();
  for (const s of exp.stack ?? []) {
    const toks = tokenize(s);
    perItem.set(s, toks);
    toks.forEach((t) => all.add(t));
  }
  return { perItem, all };
}

function buildSkillIndex(): SkillRecord[] {
  const expTokens = new Map<Experience, ReturnType<typeof experienceStackTokens>>();
  const expHighlight = new Map<Experience, string>();
  for (const exp of experience) {
    expTokens.set(exp, experienceStackTokens(exp));
    expHighlight.set(
      exp,
      (exp.highlights ?? []).map((h) => h.text).join(' ').toLowerCase(),
    );
  }

  const records: SkillRecord[] = [];
  skills.forEach((cat, categoryIndex) => {
    for (const item of cat.items) {
      const skillToks = tokenize(item);
      if (skillToks.size === 0) continue;
      const matches: SkillCompanyMatch[] = [];
      for (const exp of experience) {
        const { perItem, all } = expTokens.get(exp)!;
        const overlap = [...skillToks].some((t) => all.has(t));
        if (!overlap) continue;
        const matchedStack: string[] = [];
        for (const [stackItem, toks] of perItem) {
          if ([...toks].some((t) => skillToks.has(t))) matchedStack.push(stackItem);
        }
        const hl = expHighlight.get(exp) ?? '';
        const inHighlight = [...skillToks].some((t) => hl.includes(t));
        if (matchedStack.length || inHighlight) {
          matches.push({ experience: exp, matchedStack, inHighlight });
        }
      }
      records.push({
        item,
        category: cat.category,
        categoryIndex,
        matches: matches.sort(
          (a, b) => Date.parse(b.experience.start_date) - Date.parse(a.experience.start_date),
        ),
        companyCount: matches.length,
      });
    }
  });
  return records;
}

export const skillIndex: SkillRecord[] = buildSkillIndex();

/** Look up the cross-link record for a skill item string (exact match or token match). */
export function findSkill(item: string): SkillRecord | undefined {
  const exact = skillIndex.find((r) => r.item.toLowerCase() === item.toLowerCase());
  if (exact) return exact;
  const tok = primaryToken(item);
  return skillIndex.find((r) => tokenize(r.item).has(tok));
}

/** All companies' flat project list, newest company first. */
export interface FlatProject extends Project {
  company: string;
  companyRef: Experience;
  slug: string;
}

export const projectsFlat: FlatProject[] = experience.flatMap((exp) =>
  (exp.projects ?? []).map((p) => ({
    ...p,
    company: exp.company,
    companyRef: exp,
    slug: slug(p.name),
  })),
);

/* ------------------------------------------------------------------ *
 * Stats — honest, derived only from the YAML.
 * ------------------------------------------------------------------ */
const allYears = experience.flatMap((e) => [
  Number(String(e.start_date).slice(0, 4)),
  String(e.end_date) === 'present'
    ? new Date().getFullYear()
    : Number(String(e.end_date).slice(0, 4)),
]);

export const stats = {
  companies: experience.length,
  categories: skills.length,
  skills: skills.reduce((n, c) => n + c.items.length, 0),
  projects: projectsFlat.length,
  since: Math.min(...allYears.filter(Boolean)),
  highlights: experience.reduce((n, e) => n + e.highlights.length, 0),
};

export const currentRole: Experience | undefined =
  experience.find((e) => e.end_date === 'present') ?? experience[0];

/** Highlights relevant to a skill (for the skill detail panel). */
export function highlightsForSkill(item: string): Highlight[] {
  const rec = findSkill(item);
  if (!rec) return [];
  const out: { highlight: Highlight; company: string }[] = [];
  const seen = new Set<string>();
  for (const m of rec.matches) {
    if (!m.inHighlight) continue;
    for (const h of m.experience.highlights) {
      const text = h.text.toLowerCase();
      const hit = [...tokenize(item)].some((t) => text.includes(t));
      if (hit && !seen.has(h.text)) {
        seen.add(h.text);
        out.push({ highlight: h, company: m.experience.company });
      }
    }
  }
  return out.slice(0, 6).map((o) => ({ ...o.highlight, company: o.company })) as Highlight[];
}

/* ------------------------------------------------------------------ *
 * Formatting.
 * ------------------------------------------------------------------ */
export function fmtDateRange(start: string, end: string): string {
  const f = (d: string) => {
    if (d === 'present') return 'Present';
    const [y, m] = d.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const mi = Number(m) - 1;
    return `${months[mi] ?? ''} ${y}`.trim();
  };
  return `${f(start)} — ${f(end)}`;
}

export function fmtDuration(start: string, end: string): string {
  const s = new Date(start + '-01');
  const e = end === 'present' ? new Date() : new Date(end + '-01');
  const months = Math.max(0, (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()) + 1);
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y && m) return `${y}y ${m}m`;
  if (y) return `${y}y`;
  return `${m}m`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}
