import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { TopNav, type Lens } from './components/TopNav';
import { Background } from './components/Background';
import { Overview } from './components/Overview';
import { Footer } from './components/Footer';
import { companySlug } from './lib/data';

const Experience = lazy(() => import('./components/Experience').then((m) => ({ default: m.Experience })));
const Skills = lazy(() => import('./components/Skills').then((m) => ({ default: m.Skills })));
const Projects = lazy(() => import('./components/Projects').then((m) => ({ default: m.Projects })));

export default function App() {
  const [lens, setLens] = useState<Lens>('overview');
  const [query, setQuery] = useState('');
  const [focusSkill, setFocusSkill] = useState<string | null>(null);
  const pendingCompany = useRef<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // scroll to a company after the Experience lens mounts
  useEffect(() => {
    if (lens === 'experience' && pendingCompany.current) {
      const id = pendingCompany.current;
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        pendingCompany.current = null;
      }, 120);
      return () => clearTimeout(t);
    }
  }, [lens]);

  const handleSkillClick = (item: string) => {
    setFocusSkill(item);
    setLens('skills');
  };

  const handleCompanyClick = (company: string) => {
    pendingCompany.current = companySlug(company);
    setQuery('');
    setLens('experience');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeLens = (l: Lens) => {
    setLens(l);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
      <Background />
      <TopNav lens={lens} setLens={changeLens} query={query} setQuery={setQuery} />

      <main ref={mainRef} className="mx-auto max-w-site px-4 py-8 sm:px-6 sm:py-12">
        {lens === 'overview' && <Overview setLens={changeLens} />}

        <Suspense fallback={<LensLoading />}>
          {lens === 'experience' && <Experience onSkillClick={handleSkillClick} />}
          {lens === 'skills' && (
            <Skills
              query={query}
              focusSkill={focusSkill}
              onCompanyClick={handleCompanyClick}
              onSkillClick={handleSkillClick}
            />
          )}
          {lens === 'projects' && (
            <Projects onSkillClick={handleSkillClick} onCompanyClick={handleCompanyClick} />
          )}
        </Suspense>

        <Footer />
      </main>
    </div>
  );
}

function LensLoading() {
  return (
    <div className="panel flex h-64 items-center justify-center rounded-xl">
      <span className="font-mono text-xs uppercase tracking-micro text-faint">loading…</span>
    </div>
  );
}
