// Shape mirrors portfolio/portfolio.yaml (single source of truth).

export type SourceKey =
  | 'source'
  | 'oneleet'
  | 'exnaton'
  | 'optimizely'
  | 'zipdev';

export interface Summary {
  source: string;
  text: string;
}

export interface Social {
  github: string;
  linkedin: string;
}

export interface Profile {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  social: Social;
  summaries: Summary[];
}

export interface SkillCategory {
  category: string;
  items: string[];
  sources: string[];
}

export interface Highlight {
  text: string;
  sources: string[];
}

export interface Project {
  name: string;
  highlights: Highlight[];
  stack?: string[];
  sources: string[];
}

export interface Role {
  title: string;
  sources: string[];
}

export interface Experience {
  company: string;
  roles: Role[];
  location: string;
  start_date: string;
  end_date: string; // "present" or YYYY-MM
  employment_type: string;
  description: string;
  highlights: Highlight[];
  projects?: Project[];
  stack: string[];
  sources: string[];
}

export interface Education {
  institution: string;
  area: string;
  degree: string;
  location: string;
  start_date: string | number;
  end_date: string | number;
  highlights: string[];
}

export interface Portfolio {
  version: number;
  last_updated: string;
  profile: Profile;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
}
