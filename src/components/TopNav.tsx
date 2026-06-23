import { useTheme } from '../lib/theme';
import { IconMoon, IconSun, IconSearch, IconClose } from '../lib/icons';
import { profile } from '../lib/data';

export type Lens = 'overview' | 'experience' | 'skills' | 'projects';

const TABS: { id: Lens; label: string; code: string }[] = [
  { id: 'overview', label: 'Overview', code: '01' },
  { id: 'experience', label: 'Experience', code: '02' },
  { id: 'skills', label: 'Skills', code: '03' },
  { id: 'projects', label: 'Projects', code: '04' },
];

interface TopNavProps {
  lens: Lens;
  setLens: (l: Lens) => void;
  query: string;
  setQuery: (q: string) => void;
}

export function TopNav({ lens, setLens, query, setQuery }: TopNavProps) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-site items-center gap-3 px-4 sm:px-6">
        {/* brand */}
        <button
          onClick={() => setLens('overview')}
          className="group flex shrink-0 items-center gap-2"
          aria-label="To overview"
        >
          <span className="font-mono text-sm font-bold tracking-tight text-accent">MZ//</span>
          <span className="hidden text-sm font-medium text-ink sm:inline">{profile.name}</span>
        </button>

        {/* tabs */}
        <nav className="no-scrollbar -mx-1 flex flex-1 items-center gap-1 overflow-x-auto px-1 sm:justify-center">
          {TABS.map((t) => {
            const active = lens === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setLens(t.id)}
                className={[
                  'group relative flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors',
                  active ? 'text-ink' : 'text-mute hover:text-ink',
                ].join(' ')}
                aria-current={active ? 'page' : undefined}
              >
                <span className="font-mono text-[0.625rem] text-faint">{t.code}</span>
                <span>{t.label}</span>
                <span
                  className={[
                    'absolute inset-x-2 -bottom-px h-px transition-all',
                    active ? 'bg-accent opacity-100' : 'bg-transparent opacity-0 group-hover:opacity-40',
                  ].join(' ')}
                />
              </button>
            );
          })}
        </nav>

        {/* search */}
        <div className="relative hidden md:block">
          <IconSearch className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-faint" width={15} height={15} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value && lens !== 'skills') setLens('skills');
            }}
            placeholder="Filter skills…"
            className="w-36 rounded-md border border-edge bg-panel/60 py-1.5 pl-8 pr-7 font-mono text-xs text-ink placeholder:text-faint focus:w-48 focus:border-accent/50 focus:outline-none focus:ring-0"
            aria-label="Filter skills"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-faint hover:text-ink"
              aria-label="Clear filter"
            >
              <IconClose width={13} height={13} />
            </button>
          )}
        </div>

        {/* theme toggle */}
        <button
          onClick={toggle}
          className="ml-auto flex shrink-0 items-center justify-center rounded-md border border-edge p-2 text-mute transition-colors hover:border-accent/50 hover:text-ink md:ml-0"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <IconSun width={16} height={16} /> : <IconMoon width={16} height={16} />}
        </button>
      </div>

      {/* mobile filter */}
      <div className="border-t border-edge/60 px-4 py-2 md:hidden">
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-faint" width={15} height={15} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value && lens !== 'skills') setLens('skills');
            }}
            placeholder="Filter skills, stack, companies…"
            className="w-full rounded-md border border-edge bg-panel/60 py-2 pl-8 pr-7 font-mono text-xs text-ink placeholder:text-faint focus:border-accent/50 focus:outline-none"
            aria-label="Filter skills"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-faint"
              aria-label="Clear filter"
            >
              <IconClose width={13} height={13} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
