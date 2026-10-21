# Fasmanuel2002.github.io
Website for my resume and life

The site is an English portfolio for Manuel Fas, built with Angular. Every page is prerendered to static HTML, and the site deploys to GitHub Pages at https://fasmanuel2002.github.io.

## Project layout

| Path | Contents |
|---|---|
| `data/data.json` | The single source of truth for every fact on the site |
| `data/figures/` | Source images for the architecture figures |
| `site/` | The Angular project |
| `docs/` | Build summary, session overview, and QA report (once written) |
| `source/` | Private inputs such as the CV and certificates. Git-ignored and kept local only. |
| `CLAUDE.md` | Project rules |

## Requirements

- **Node 24** (`site/.nvmrc`). Angular 22 needs Node ^22.22.3 or ^24.15.0.
- **npm**, which ships with Node.

With nvm:

```bash
cd site
nvm install    # first time only; reads .nvmrc
nvm use
```

Without nvm, install Node 24 from https://nodejs.org and check it with `node -v`.

## Run it locally

All commands run inside `site/`.

### First time

```bash
cd site
npm install
```

### Option A: production preview (recommended)

This option serves the same static files that GitHub Pages will serve.

```bash
npm run build
npx -y serve@14.2.6 dist/portfolio/browser -l 4200 --no-port-switching --no-clipboard
```

Open http://localhost:4200. Press `Ctrl+C` to stop the server.

`npm run build` does two things:
1. It regenerates the site content, `sitemap.xml`, `robots.txt`, and `llms.txt` from `data/data.json`.
2. It runs `ng build --configuration production`.

### Option B: development server with live reload

```bash
npm run sync    # only needed after editing data/data.json
npm start       # ng serve
```

Open http://localhost:4200. Pages reload when you edit files in `site/src/`.

### If port 4200 is busy

```bash
lsof -i :4200       # find the process
kill <PID>          # stop it
```

Or serve on another port, for example `-l 4300`.

## Changing content

1. Edit `data/data.json`. Never edit the generated files in `site/src/app/content/` by hand.
2. Run `npm run build` in `site/`.
3. Preview with Option A.

## Social share card

Every page uses `site/public/images/og-card.png` (1200×630) as its Open Graph image. Its source is `site/scripts/og-card.html`, which uses the site's own fonts and the profile photo. If the name, headline or location in `data/data.json` changes, `npm run build` stops with a message until the card shows the new text.

To re-render it after editing `og-card.html`, run this inside `site/` (macOS, with Google Chrome installed):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --force-device-scale-factor=1 --allow-file-access-from-files --virtual-time-budget=5000 \
  --window-size=1200,630 --screenshot="$PWD/public/images/og-card.png" "file://$PWD/scripts/og-card.html"
```

`--allow-file-access-from-files` lets the page load the fonts from `public/fonts/`, and `--virtual-time-budget` waits for them before the screenshot. Check that the PNG is 1200×630 and stays under about 150 KB.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/experience` | Experience |
| `/projects` | Projects catalog |
| `/projects/trace-reimplementation` | TRACE reimplementation |
| `/projects/upsa-thesis-cancer-survival` | UPSA thesis |
| `/projects/paper-reimplementations` | Paper reimplementations |
| `/certifications` | Certifications |
| `/education` | Education |
| `/contact` | Contact |

## Deploy to GitHub Pages

The site is a GitHub Pages **user site**, so the repository must be named `Fasmanuel2002.github.io`. Pages then serves the site from the root (`https://fasmanuel2002.github.io`, base href `/`).

1. On GitHub, rename this repository to `Fasmanuel2002.github.io` (Settings > General > Repository name), or create a new repository with that name and push to it. If you rename it, update your local remote: `git remote set-url origin https://github.com/Fasmanuel2002/Fasmanuel2002.github.io.git`.
2. In Settings > Pages, set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow `.github/workflows/deploy.yml` runs `npm ci` and `npm run build` in `site/`, then publishes `site/dist/portfolio/browser`.

- Every route is prerendered to `<route>/index.html`, which Pages serves directly. No SPA fallback is needed.
- The public URL comes from `site.base_url` in `data/data.json`. Canonical URLs, Open Graph tags, the sitemap, and `llms.txt` all use that value.

More detail is in `docs/build-summary.md`. Current status and next steps are in `docs/session-overview.md`.
