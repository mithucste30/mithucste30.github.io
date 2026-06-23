#!/usr/bin/env node
/* Fetch CC0 tech icons from simpleicons.org, strip brand fill so they render
 * as monochrome currentColor marks, and save into src/media/icons/<slug>.svg.
 * Re-run anytime; 404s are skipped silently. Network required. */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../src/media/icons');

const SLUGS = [
  'go', 'rubyonrails', 'react', 'nextdotjs', 'typescript', 'javascript', 'python',
  'nodedotjs', 'springboot', 'swift', 'graphql', 'angular', 'stimulus', 'tailwindcss',
  'html5', 'css3', 'd3dotjs', 'postgresql', 'mysql', 'mongodb', 'redis',
  'apachecassandra', 'neo4j', 'amazondynamodb', 'timescaledb', 'apachekafka', 'rabbitmq',
  'amazonsqs', 'amazonsns', 'prometheus', 'grafana', 'loki', 'datadog', 'pagerduty',
  'pyroscope', 'amazonwebservices', 'googlecloud', 'microsoftazure', 'heroku', 'hetzner',
  'digitalocean', 'contabo', 'ovh', 'ovhcloud', 'kubernetes', 'docker', 'helm',
  'terraform', 'ansible', 'packer', 'github', 'githubactions', 'gitlab', 'jenkins',
  'circleci', 'drone', 'cloudflare', 'nginx', 'traefik', 'envoyproxy', 'vault',
  'stripe', 'paypal', 'twilio', 'googlemaps', 'ffmpeg', 'elasticsearch', 'elastic',
  'firebase', 'looker', 'git', 'linux', 'cisco', 'nagios', 'grpc', 'openjdk', 'dotnet',
  'hotwired', 'mixpanel', 'stream', 'docker',
];

await mkdir(OUT, { recursive: true });

let ok = 0;
let skip = 0;
for (const slug of SLUGS) {
  const url = `https://cdn.simpleicons.org/${slug}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      skip++;
      continue;
    }
    let svg = await res.text();
    // strip brand fill so currentColor (forced in CSS) wins
    svg = svg.replace(/\sfill="[^"]*"/g, '');
    // ensure a sensible viewBox + role
    if (!/viewBox=/.test(svg)) svg = svg.replace('<svg', '<svg viewBox="0 0 24 24"');
    await writeFile(resolve(OUT, `${slug}.svg`), svg, 'utf8');
    ok++;
  } catch {
    skip++;
  }
}
console.log(`icons: ${ok} fetched, ${skip} skipped`);
