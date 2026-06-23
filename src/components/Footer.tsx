import { profile, education } from '../lib/data';
import { IconMail, IconPhone, IconGithub, IconLinkedin, IconPin } from '../lib/icons';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-edge pt-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* contact */}
        <div>
          <div className="label mb-3">contact</div>
          <div className="space-y-2 text-sm">
            <a href={`mailto:${profile.email}`} className="link-underline inline-flex items-center gap-2 text-ink">
              <IconMail width={15} height={15} className="text-mute" /> {profile.email}
            </a>
            <br />
            <a href={`tel:${profile.phone}`} className="link-underline inline-flex items-center gap-2 text-ink">
              <IconPhone width={15} height={15} className="text-mute" /> {profile.phone}
            </a>
            <br />
            <a
              href={`https://github.com/${profile.social.github}`}
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-flex items-center gap-2 text-ink"
            >
              <IconGithub width={15} height={15} className="text-mute" /> github/{profile.social.github}
            </a>
            <br />
            <a
              href={`https://linkedin.com/in/${profile.social.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-flex items-center gap-2 text-ink"
            >
              <IconLinkedin width={15} height={15} className="text-mute" /> in/{profile.social.linkedin}
            </a>
          </div>
        </div>

        {/* location */}
        <div>
          <div className="label mb-3">based</div>
          <div className="flex items-center gap-2 text-sm text-ink">
            <IconPin width={15} height={15} className="text-mute" /> {profile.location}
          </div>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-faint">
            Open to platform, backend, and architect roles — remote or hybrid. Available for founding-engineer and contract engagements.
          </p>
        </div>

        {/* education */}
        <div>
          <div className="label mb-3">education</div>
          {education.map((e) => (
            <div key={e.institution} className="text-sm">
              <div className="font-medium text-ink">{e.institution}</div>
              <div className="text-mute">
                {e.degree} · {e.area}
              </div>
              <div className="font-mono text-xs text-faint">
                {e.start_date}–{e.end_date} · {e.highlights.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-edge pt-4 font-mono text-xs text-faint sm:flex-row sm:items-center">
        <span>
          © {new Date().getFullYear()} {profile.name} · built from <span className="text-mute">portfolio.yaml</span>
        </span>
        <span>designed &amp; engineered with care</span>
      </div>
    </footer>
  );
}
