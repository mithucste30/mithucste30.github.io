# Media assets

The app auto-detects files dropped in these folders (via Vite glob import) — **no code change needed**.

## `icons/` — tech / framework / language marks
Already populated with CC0 icons from [simpleicons.org](https://simpleicons.org), normalized to monochrome (`currentColor`). Re-fetch / extend with:

```bash
npm run fetch-icons
```

Edit the slug list in `scripts/fetch-icons.mjs`. Slugs are simpleicons names (`go`, `rubyonrails`, `amazonwebservices`, …).

## `companies/` — company logos (optional)
Drop `<slug>.{svg,png,jpg,webp}`. Slug = company name lowercased, **alphanumeric only**:
- `BareMetalCloud` → `companies/baremetalcloud.svg`
- `Seedrs (acquired by Republic)` → `companies/seedrs.svg`
- `Berlingske Media (24Syv)` → `companies/berlingskemedia.svg`

Absent file → a generated on-brand monogram emblem (never a broken image).

## `projects/` — project visuals (optional)
Drop `<slug>.{png,jpg,webp}`. Slug = project name lowercased, words joined with `-`:
- `Ride-Sharing Platform` → `projects/ride-sharing-platform.png`
- `Multi-cloud substrate` → `projects/multi-cloud-substrate.png`

Absent file → a generated abstract SVG keyed to the project type (mesh, route grid, waveform, film strip, …). No fake screenshots.
