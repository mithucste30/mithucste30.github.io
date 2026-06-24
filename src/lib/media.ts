// Asset resolution. Real assets (when present under src/media) are picked up
// via Vite glob; anything missing falls back to generated on-brand SVG
// rendered by the React <Mark> / <ProjectArt> components. No broken images.

import { companySlug } from './data';

// Icons are inlined as raw SVG (not <img>) so we can force currentColor and
// recolor them with the theme. Logos/projects use URLs.
const iconsRaw = import.meta.glob('../media/icons/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// Inline SVG brand marks — raw markup so they theme with currentColor and stay
// crisp at any size. Falls back to a raster <img> if a non-SVG file is dropped,
// then to the generated <Emblem> in the React layer.
const companiesRaw = import.meta.glob('../media/companies/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const companies = import.meta.glob(
  '../media/companies/*',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>;

const projects = import.meta.glob(
  '../media/projects/*',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>;

function bySlug(map: Record<string, string>, slug: string): string | null {
  for (const key of Object.keys(map)) {
    const base = key.split('/').pop()!.replace(/\.[^.]+$/, '');
    if (base.toLowerCase() === slug.toLowerCase()) return map[key];
  }
  return null;
}

function bySlugRaw(map: Record<string, string>, slug: string): string | null {
  for (const key of Object.keys(map)) {
    const base = key.split('/').pop()!.replace(/\.[^.]+$/, '');
    if (base.toLowerCase() === slug.toLowerCase()) return map[key];
  }
  return null;
}

/** Curated alias map: a significant token in a stack/skill item -> simpleicons slug. */
const TOKEN_TO_SLUG: Record<string, string> = {
  go: 'go', golang: 'go',
  rails: 'rubyonrails', ruby: 'rubyonrails', rubyonrails: 'rubyonrails',
  react: 'react', nextjs: 'nextdotjs', next: 'nextdotjs',
  typescript: 'typescript', ts: 'typescript',
  javascript: 'javascript', js: 'javascript',
  python: 'python', node: 'nodedotjs', nodejs: 'nodedotjs',
  spring: 'springboot', swift: 'swift', graphql: 'graphql',
  angular: 'angular', angularjs: 'angular', stimulus: 'stimulus',
  tailwind: 'tailwindcss', html: 'html5', html5: 'html5', css: 'css3', css3: 'css3',
  d3: 'd3dotjs', postgres: 'postgresql', postgresql: 'postgresql',
  mysql: 'mysql', mongo: 'mongodb', mongodb: 'mongodb', redis: 'redis',
  cassandra: 'apachecassandra', neo4j: 'neo4j', neo4: 'neo4j',
  dynamodb: 'amazondynamodb', timescale: 'timescaledb', timescaledb: 'timescaledb',
  kafka: 'apachekafka', rabbitmq: 'rabbitmq', sqs: 'amazonsqs', sns: 'amazonsns',
  prometheus: 'prometheus', grafana: 'grafana', loki: 'loki', tempo: 'grafana',
  datadog: 'datadog', pagerduty: 'pagerduty', pyroscope: 'pyroscope',
  aws: 'amazonwebservices', amazonwebservices: 'amazonwebservices',
  gcp: 'googlecloud', google: 'googlecloud', azure: 'microsoftazure',
  heroku: 'heroku', hetzner: 'hetzner', digitalocean: 'digitalocean',
  digital: 'digitalocean', contabo: 'contabo', ovh: 'ovh',
  kubernetes: 'kubernetes', k8s: 'kubernetes', docker: 'docker',
  helm: 'helm', terraform: 'terraform', ansible: 'ansible', packer: 'packer',
  github: 'github', gitlab: 'gitlab', jenkins: 'jenkins', circleci: 'circleci',
  drone: 'drone', cloudflare: 'cloudflare', nginx: 'nginx',
  traefik: 'traefik', envoy: 'envoyproxy', vault: 'vault',
  stripe: 'stripe', paypal: 'paypal', twilio: 'twilio',
  maps: 'googlemaps', ffmpeg: 'ffmpeg',
  elasticsearch: 'elasticsearch', elastic: 'elasticsearch',
  firebase: 'firebase', looker: 'looker', git: 'git', linux: 'linux',
  cisco: 'cisco', nagios: 'nagios', grpc: 'grpc',
  springboot: 'springboot',
};

/** Resolve a tech icon as inline SVG markup for a stack/skill item, or null. */
export function techIconRaw(item: string): string | null {
  const stripped = item.replace(/\([^)]*\)/g, ' ').toLowerCase();
  const tokens = stripped.split(/[^a-z0-9.]+/).filter(Boolean);
  for (const t of tokens) {
    const slug = TOKEN_TO_SLUG[t];
    if (slug) {
      const raw = bySlugRaw(iconsRaw, slug);
      if (raw) return raw;
    }
  }
  return bySlugRaw(iconsRaw, tokens.join('-'));
}

export function companyLogoUrl(name: string): string | null {
  return bySlug(companies, companySlug(name));
}

/** Inline SVG brand mark markup for a company, or null. */
export function companyLogoRaw(name: string): string | null {
  return bySlugRaw(companiesRaw, companySlug(name));
}

export function projectImageUrl(name: string): string | null {
  return bySlug(projects, projectSlug(name));
}

export function projectSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
