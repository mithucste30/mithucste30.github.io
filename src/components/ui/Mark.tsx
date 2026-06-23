import { useMemo } from 'react';
import { companyLogoUrl, techIconRaw } from '../../lib/media';
import { initials } from '../../lib/data';

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/* ---------------- Company emblem (generated fallback) ---------------- */
function Emblem({ name, size = 44 }: { name: string; size?: number }) {
  const h = hashStr(name);
  const motif = h % 4;
  const mono = initials(name);
  const bars = [h % 5 + 1, (h >> 3) % 5 + 1, (h >> 6) % 5 + 1];
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-edge bg-panel-2"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* accent corner */}
      <span className="absolute right-0 top-0 h-0 w-0 border-r-[10px] border-t-[10px] border-r-accent/50 border-t-transparent" />
      <svg width={size} height={size} className="absolute inset-0 text-accent/20">
        {motif === 0 &&
          bars.map((b, i) => (
            <rect key={i} x={6 + i * 4} y={size - 6 - b * 3} width="2.4" height={b * 3} fill="currentColor" />
          ))}
        {motif === 1 &&
          [0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => <circle key={`${r}-${c}`} cx={6 + c * 5} cy={6 + r * 5} r="1.1" fill="currentColor" />),
          )}
        {motif === 2 && <path d={`M0 ${size} L${size} 4`} stroke="currentColor" strokeWidth="1" opacity="0.5" />}
        {motif === 3 && (
          <circle cx={size - 8} cy={size - 8} r="5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        )}
      </svg>
      <span className="relative font-mono text-[0.7rem] font-semibold tracking-tight text-accent">{mono}</span>
    </span>
  );
}

export function CompanyMark({ name, size = 44 }: { name: string; size?: number }) {
  const url = companyLogoUrl(name);
  if (url) {
    return (
      <img
        src={url}
        alt={`${name} logo`}
        width={size}
        height={size}
        loading="lazy"
        className="shrink-0 rounded-lg border border-edge bg-panel-2 object-contain p-2 opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return <Emblem name={name} size={size} />;
}

/* ---------------- Tech icon (inlined, currentColor) ---------------- */
export function TechMark({ item, size = 16 }: { item: string; size?: number }) {
  const raw = techIconRaw(item);
  const letter = item.replace(/\([^)]*\)/g, '').trim()[0]?.toUpperCase() ?? '?';
  if (raw) {
    return (
      <span
        className="techicon inline-flex items-center justify-center text-mute transition-colors"
        style={{ fontSize: size, width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: raw }}
        aria-hidden
      />
    );
  }
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded border border-edge bg-panel-2 font-mono text-[0.6rem] font-semibold text-mute"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {letter}
    </span>
  );
}

/* ---------------- Project art (generated, abstract) ---------------- */
type ProjectKind = 'mesh' | 'route' | 'wave' | 'film' | 'nodes' | 'arches';

function classify(name: string, company: string): ProjectKind {
  const s = `${name} ${company}`.toLowerCase();
  if (/(cloud|substrate|provision|multi-cloud|runtime|isolation|tunnel|network)/.test(s)) return 'mesh';
  if (/(ride|sharing|route|pricing|driver|uber)/.test(s)) return 'route';
  if (/(podcast|audio|speech|wave|spotify|24syv)/.test(s)) return 'wave';
  if (/(fashion|video|commerce|runway|shop|store|bitcommerce|spree|booking)/.test(s)) return 'film';
  if (/(recommend|graph|neo4j|social|political|edtech)/.test(s)) return 'nodes';
  return 'arches';
}

export function ProjectArt({
  name,
  company,
  className = '',
}: {
  name: string;
  company: string;
  className?: string;
}) {
  const kind = useMemo(() => classify(name, company), [name, company]);
  const h = hashStr(name);
  return (
    <div className={`relative overflow-hidden rounded-lg border border-edge bg-panel-2 ${className}`}>
      <svg viewBox="0 0 320 180" className="h-full w-full text-accent" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`pg-${h}`} cx="30%" cy="20%" r="90%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="180" fill={`url(#pg-${h})`} />
        {/* faint grid */}
        <g stroke="currentColor" strokeOpacity="0.06">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2="180" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 32} x2="320" y2={i * 32} />
          ))}
        </g>

        {kind === 'mesh' && <MeshArt h={h} />}
        {kind === 'route' && <RouteArt h={h} />}
        {kind === 'wave' && <WaveArt h={h} />}
        {kind === 'film' && <FilmArt h={h} />}
        {kind === 'nodes' && <NodesArt h={h} />}
        {kind === 'arches' && <ArchesArt h={h} />}
      </svg>
    </div>
  );
}

function MeshArt({ h }: { h: number }) {
  const pts = [
    [60, 50], [160, 30], [260, 60], [100, 110], [210, 120], [150, 150],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [3, 4], [3, 5], [4, 5], [0, 1],
  ];
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === (h % pts.length) ? 5 : 3} fill="currentColor" fillOpacity={i === (h % pts.length) ? 1 : 0.55} />
      ))}
    </g>
  );
}

function RouteArt({ h }: { h: number }) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 150 C 80 150, 80 60, 150 60 S 240 60, 300 30" strokeOpacity="0.9" />
      <path d="M30 40 C 100 40, 120 120, 200 120 S 280 150, 300 150" strokeOpacity="0.35" strokeDasharray="4 4" />
      {[[20, 150], [150, 60], [300, 30]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="currentColor" stroke="none" fillOpacity={i === h % 3 ? 1 : 0.6} />
      ))}
    </g>
  );
}

function WaveArt({ h }: { h: number }) {
  const bars = Array.from({ length: 40 });
  return (
    <g>
      {bars.map((_, i) => {
        const amp = 8 + Math.abs(Math.sin(i * 0.5 + h)) * 30 + Math.abs(Math.cos(i * 0.2)) * 18;
        return (
          <rect
            key={i}
            x={12 + i * 7.6}
            y={90 - amp / 2}
            width="3"
            height={amp}
            rx="1.5"
            fill="currentColor"
            fillOpacity={0.3 + (i % 5) * 0.12}
          />
        );
      })}
    </g>
  );
}

function FilmArt({ h }: { h: number }) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={20 + i * 74} y={36} width="60" height="108" rx="4" fill="currentColor" fillOpacity={0.08 + (i % 2) * 0.06} stroke="currentColor" strokeOpacity="0.3" />
      ))}
      {[0, 1, 2, 3].map((i) =>
        [0, 1].map((r) => (
          <rect key={`${i}-${r}`} x={20 + i * 74} y={r === 0 ? 16 : 150} width="60" height="14" fill="currentColor" fillOpacity="0.25" />
        )),
      )}
      <circle cx={50 + (h % 4) * 74} cy={90} r="14" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d={`M${44 + (h % 4) * 74} 84 l10 6 l-10 6 Z`} fill="currentColor" />
    </g>
  );
}

function NodesArt({ h }: { h: number }) {
  const pts = Array.from({ length: 9 }).map((_, i) => {
    const a = (i / 9) * Math.PI * 2;
    return [160 + Math.cos(a) * (50 + (i % 3) * 16), 90 + Math.sin(a) * (36 + (i % 3) * 12)];
  });
  return (
    <g>
      {pts.map(([x, y], i) =>
        pts.slice(i + 1).map(([x2, y2], j) => (
          <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke="currentColor" strokeOpacity="0.12" />
        )),
      )}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === h % 9 ? 5 : 3} fill="currentColor" fillOpacity={i === h % 9 ? 1 : 0.5} />
      ))}
      <circle cx="160" cy="90" r="6" fill="currentColor" />
    </g>
  );
}

function ArchesArt({ h }: { h: number }) {
  return (
    <g fill="none" stroke="currentColor">
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={70 + i * 60} cy="150" r={30 + i * 14} strokeOpacity={0.55 - i * 0.1} strokeWidth="1.5" />
      ))}
      <circle cx={70 + (h % 4) * 60} cy="150" r="6" fill="currentColor" stroke="none" />
    </g>
  );
}
