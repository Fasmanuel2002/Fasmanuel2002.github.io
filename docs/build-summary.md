# Build summary: Manuel Fas portfolio

Built on 2026-10-18 from `data/data.json` (approved, revision 2). Angular 22.2.3, static prerendering. Deploy target since 2026-10-19: GitHub Pages user site `https://fasmanuel2002.github.io` (previously Vercel).

Revision 2026-10-18 (author review):
- Reimplementation #04 ("An Image Is Worth 16×16 Words") now shows Completed, following the author's update in data.json.
- Each project has its own prerendered page at `/projects/<slug>`, and `/projects` is now a catalog.
- Architecture figures from data.json are shown on the TRACE page (at the top) and on reimplementations #02 and #04.

Revision 2026-10-19:
- GitHub Pages preparation: new base URL in all generated files, a static `404.html`, and a skip-link fix for GitHub Pages' trailing-slash redirects. See "Deploy to GitHub Pages".
- A simplified design that keeps the site's own fonts, palette, links, navigation and lists. See "2026-10-19 minimal restyle".

Revision 2026-10-21: design polish pass approved by the author: one shared frame for header, content and footer, a simpler home hero, results as the anchor on /projects, grouped certifications, a dark theme with a toggle, and a 1200×630 share card. See "Design polish pass (2026-10-21)" at the end. Sections between here and there describe the site as of 2026-10-19.

Revision 2026-10-22 (author requests):
- The home hero no longer shows the headline ("Machine learning researcher and engineer") above the name, and the footer line reads only "© Manuel Fas". The headline stays in data.json, page titles, meta descriptions, the share card, `llms.txt` and the JSON-LD. The unused `.eyebrow` styles and the hero's `eyebrow` grid row were removed.
- "Open to international roles and relocation" was provided and approved by the author on 2026-10-22. The statement is not in data.json; it is a constant in `site/scripts/sync-content.mjs`. It appears under "Salamanca, Spain" in Home "At a glance", in the Contact intro and on the `llms.txt` Location line. By author decision it is left out of meta descriptions, Open Graph, the share card and JSON-LD.

Revision 2026-10-22 (fix pass, pipeline step 5): fixed the high and medium findings from `docs/qa-report.md`. B8 (high): the thesis result now follows thesis Table 2 (Cox-nnet, C-index 0.8750) and the thesis page shows the five-model table (NR-02 reversed by the author). B10: the home stat now reads "Completed implementations". S24: text read without CSS keeps adjacent values apart. B9 and C3 are kept as they are, by author decision. No asset, font, library or script was added. See "Fix pass (2026-10-22)" and "Remaining issues for the author" at the end.

## External assets and justification

The site loads nothing from third-party servers: no CDN, web-font service, analytics, tracking or third-party script. Everything below is self-hosted from `site/public/` and served from the site's own origin. The restyle of 2026-10-19 added no asset, font, library or script. The polish pass of 2026-10-21 added one image (the share card) and no font, library or script; its theme toggle is a few lines of the site's own Angular code plus a small inline script in `index.html`.

| Asset | Source and licence | Served at | Size | Justification |
|---|---|---|---|---|
| Newsreader (variable font: weight 400–700, optical size 6–72) | Production Type / Google Fonts, SIL Open Font License 1.1. Taken from `@fontsource-variable/newsreader` 5.3.0 and subset to the 132 Latin glyphs headings use. The OFL declares no Reserved Font Name, so subsetting is permitted. | `/fonts/newsreader-latin-var.woff2` | 61 KB (original file 132 KB) | Display font for headings. An editorial, research-paper serif whose optical-size axis keeps large titles crisp. It gives the site an academic voice without imitating a LaTeX or arXiv template. |
| Atkinson Hyperlegible Next (variable font: weight 200–800) | Braille Institute / Google Fonts, SIL Open Font License 1.1. Latin subset as published in `@fontsource-variable/atkinson-hyperlegible-next` 5.3.0. | `/fonts/atkinson-hyperlegible-next-latin-var.woff2` | 34 KB | Body font, chosen for legibility. It clearly separates 0/O and 1/l/I, which matters on a page full of metrics (AUROC 0.787), arXiv IDs and dates. It also has tabular figures for the results tables. |
| Font licences | Copies of both OFL texts | `/fonts/OFL-*.txt` | 9 KB | The OFL requires the licence to travel with redistributed font files. |
| Profile photo | `source/profile_picture/profile.jpeg` (author's own; no EXIF/GPS per data.json) | `/images/profile.jpg`, `/images/profile.webp` | 15.5 KB JPEG, 5.2 KB WebP | Required by the brief. The WebP was generated locally at quality 80, with the JPEG as fallback. It is shown in the home hero, above the fold at every width, loaded eagerly with `fetchpriority="high"` (it is the mobile LCP element), and it is the JSON-LD `Person` image. Since 2026-10-21 the Open Graph image is the share card below. |
| Share card (Open Graph image) | Made for this site on 2026-10-21 from `site/scripts/og-card.html` (committed source): name, headline, location and domain from data.json, the profile photo, the two fonts above and the site palette. Rendered with the local Chrome; the command is in the root `README.md`. | `/images/og-card.png` (1200×630) | 100 KB | Link previews on LinkedIn, X, Slack and similar. The 400×400 headshot was too small for `summary_large_image` cards. `npm run build` fails if the card's text no longer matches data.json or the PNG is not 1200×630. |
| Research PDFs | `source/papers/TRACEPAPER_Report.pdf`, `source/papers/TFG_ManuelFasRuiz.pdf` (byte-identical copies) | `/papers/TRACEPAPER_Report.pdf`, `/papers/TFG_ManuelFasRuiz.pdf` | 1.3 MB, 5.5 MB | Author decision NR-15: host both PDFs at these paths. The thesis is hosted as-is, also by author decision. |
| Employer logos (BISITE, AIR Institute, HSLU, Wembley Studios) | Logos supplied by the author (`source/logos/`, recorded in data.json `experience[].logo`) | `/images/logos/*.webp` (160 px wide) | 1–3 KB each | Shown decoratively (empty alt, `aria-hidden`) as small grayscale marks beside each role on /experience; the organization name is the link to `organization_url`. |
| Favicon | "MF" monogram drawn for this site as SVG paths (no font): paper letters on an ink rounded square. The `.ico` (16, 32 and 48 px) was rendered from the SVG with Chrome and Pillow | `/favicon.svg`, `/favicon.ico` | 0.3 KB SVG, 4 KB ICO | Site identity. No third-party icon. |
| TRACE architecture figure | `data/figures/trace-architecture.png`. Credit (shown under the figure): "Figure 4 of the author's TRACE report, adapted from Black et al. (2024), arXiv:2409.12972." | `/images/figures/trace-architecture.webp` (677×449) | 28 KB (PNG 88 KB) | Author request. White margins trimmed, WebP at quality 90. |
| GPT decoder-only figure (#02) | `data/figures/gpt-decoder-only.png`. Credit: "Adapted from Figure 1 of Vaswani et al. (2017), \"Attention Is All You Need\", arXiv:1706.03762." | `/images/figures/gpt-decoder-only.webp` (800×1126) | 39 KB (PNG 520 KB) | Author request. Converted from Generic RGB to sRGB, resized to 800 px wide, WebP at quality 90. |
| ViT overview figure (#04) | `data/figures/vit-overview.png`. Credit: "Figure 1 of Dosovitskiy et al. (2020), \"An Image is Worth 16x16 Words\", arXiv:2010.11929 (the repository README marks it as taken from the original paper)." | `/images/figures/vit-overview.webp` (720×531) | 40 KB (PNG 116 KB) | Author request. White margins trimmed, WebP at quality 90. |

npm packages: only Angular itself (`@angular/*` 22.2.3), `rxjs` and `tslib` at runtime. `@angular/ssr` and `@angular/platform-server` are used at build time for prerendering. There is no UI component library and no CSS framework, and Express is not installed.

**Attribution.** The three figures come from, or are adapted from, the original papers. Each is shown in a `<figure>` with the alt text from data.json and a `<figcaption>` giving the caption, then a visible "Credit:" line. Reuse rights have not been checked (NR-24, open; see Open items).

Figures are WebP only. Every current browser supports WebP, so no PNG fallback is needed. To replace a figure:
1. Export the PNG to `data/figures/`.
2. Convert it to WebP at about quality 90 and no wider than about 1,200 px, and save it as `site/public/images/figures/<same name>.webp`.
3. Run `npm run build`. The generator reads the WebP's width and height from the file itself and fails if the file is missing.

Tools I used during development but did not add to the project: fontTools and brotli for font subsetting and glyph checks, Pillow for image work, plus Playwright-core 1.64, axe-core 4.14 and Lighthouse 13.5 for testing, driving the installed Google Chrome. All of these ran from a temporary scratch folder.

## What was built

An English-only Angular 22 site in `site/` with nine prerendered routes and a static 404 page:

| Route | Content (all from `data/data.json`) |
|---|---|
| `/` | Hero: headline, name, CV summary and plain links (View projects, Email, GitHub, LinkedIn), with the portrait. Then an "At a glance" strip (current role, location, degree, languages, interests), then About (the four Background.md paragraphs) and "Recent activity" (the eight latest milestones), side by side from 64rem. The featured projects are listed on `/projects`, linked from the hero and the nav. |
| `/experience` | Four roles with verbatim CV highlights, technologies and links, then technical skills and spoken languages. |
| `/projects` | Catalog: one entry per featured project with context, summary, headline result, technologies, and links to the project page, the code and the PDF. Then a link to the GitHub profile (NR-23). |
| `/projects/trace-reimplementation` | Reimplementation of clickstream event sequence analysis model TRACE. The page head ends with the architecture figure, then: context, report PDF, original paper, datasets, method, results table, findings, limitations, technologies, report abstract. |
| `/projects/upsa-thesis-cancer-survival` | Bachelor's thesis: context, thesis PDF, research question, data, method, results, limitations, keywords and technologies. |
| `/projects/paper-reimplementations` | All six reimplementations with their statuses (4 Completed, 2 Planned/in progress), original papers, implementation, reported results, caveats and folder links. #02 and #04 include their architecture figures. |
| `/certifications` | Twelve certificates, newest first. Eight are grouped under their two specializations. Each has a verification link, and the author's own notes sit in a collapsible "Course notes" panel. |
| `/education` | UPSA (dual B.S., degree status, Bachelor's thesis with PDF and code) and the HSLU exchange. |
| `/contact` | Email, GitHub, LinkedIn, location and languages. There is no phone number (NR-16) and no form. |
| `/404.html` | Static page (`site/public/404.html`) that GitHub Pages serves for unknown URLs: the site header, "Page not found" and a link home. `lang="en"`, `noindex`, inline CSS, the same two self-hosted fonts. |

Crawl and AI-readability files in the build output: `sitemap.xml` (all nine routes), `robots.txt` (allows everything and points to the sitemap) and `llms.txt` (who Manuel Fas is, what each project and paper reimplementation does, experience, certifications, pages, contact).

## Key decisions

### Stack and rendering
- **Angular 22.2.3 (latest stable)**: standalone components, zoneless, signals, `OnPush`, plain CSS. The project was created with `ng new --routing --style css` and no Git initialisation.
- **Node 24 is required.** Angular 22 needs Node `^22.22.3 || ^24.15.0 || >=26`, but this machine's system Node is 22.14.0. I installed Node 24.22.0 LTS through the existing nvm. `site/.nvmrc` says `24` (the GitHub Actions workflow reads it through `setup-node`) and `package.json` has `"engines": { "node": "24.x" }`.
- **Static prerendering (SSG)** follows the Angular documentation:
  - `angular.json` uses `"outputMode": "static"` and `"server": "src/main.server.ts"`.
  - `src/app/app.routes.server.ts` prerenders every route (`RenderMode.Prerender`).
  - With static output no server bundle is emitted, so no Express `server.ts` was created.
  - Each route is written to `<route>/index.html` with all content in the HTML, including `projects/<slug>/index.html` for the project pages.
  - Client hydration only takes over navigation; the pages work without JavaScript.
- **Output folder.** `angular.json` sets no `outputPath`, so the Angular default applies: `site/dist/portfolio`, with the static site in `site/dist/portfolio/browser`. That is the folder the workflow publishes.
- **Base href `/`.** The skip link is written as `/<route>#main` so it works with `<base href="/">` and without JavaScript. With JavaScript, a click handler moves focus to `main` without a navigation, because GitHub Pages serves each page at `/<route>/` and following `/<route>#main` from there would reload the page through a redirect.

### Single source of truth and the site URL
- `site/scripts/sync-content.mjs` reads `data/data.json` and writes:
  - `src/app/content/*.json`, one trimmed file per page plus `shared.json`. Internal notes, sources and review items never reach the browser.
  - `public/sitemap.xml`, `public/robots.txt` and `public/llms.txt`.
- **The site URL lives in one place: `site.base_url` in `data/data.json`.** It is `https://fasmanuel2002.github.io` (NR-01 resolved on 2026-10-19). Canonical URLs, `og:url`, `og:image`, JSON-LD, the sitemap, robots.txt and llms.txt are all derived from it.
  - To change it, edit that one value and run `npm run build`.
  - Page URLs come from `pageUrl()` in the sync script, which writes each page's `url` into `shared.json` for the canonical and `og:url`. In the app, `absoluteUrl()` in `src/app/content/content.ts` only builds file URLs, such as `og:image`.
- `npm run build` runs the sync and then `ng build --configuration production`. The generated files are committed, so a plain `ng build --configuration production` also works.
- If `../data/data.json` is not visible (for example in a build that only has the `site` folder), the sync prints a notice and the committed files are used.
- Every sentence the script composes from data has a check: a page description, section summary or count fails the build if data.json changes underneath it. Descriptions are also checked to stay under 160 characters.

### Project pages
- **Slugs.** data.json has no `slug` field, so each page uses the project's kebab-case `id` from data.json:
  - `trace-reimplementation`
  - `upsa-thesis-cancer-survival`
  - `paper-reimplementations`

  The generator falls back to a `slug` field if one is added later, then to a slug derived from the repository name (for example `aai-hslu-trace`). `app.routes.ts` reads the paths from the generated content, so the slugs live only in data.json.
- **Page structure.** Every project page has a breadcrumb (Home / Projects / title), the date and role, one `h1` with the project title, and the project summary from data.json as the plain-text summary. Then come the headline result, links (PDF, code, paper or dataset) and the full details. An "All projects" link closes the page.
- **Links.** The home list, the activity list, the Experience "Project details" link and the Education thesis link all point to the project pages.
- **Navigation.** In the main nav, "Projects" is `aria-current="page"` on `/projects` and `aria-current="true"` on a project page.
- **Status summary.** "6 papers listed: 4 completed, 2 planned/in progress". Status groups with zero entries are left out, so no "0 in progress" appears.

### Architecture figures
- **TRACE.** The figure closes the page head, at the full width of the reading column, as the author asked for it at the top of the page. It is loaded eagerly with `fetchpriority="high"` and is not animated. It is not repeated lower on the page.
- **Paper-Reimplementations.** The #02 (portrait, capped at 20rem) and #04 figures sit inside their implementation entries and are lazy-loaded. #01, #03, #05 and #06 have no figure and no placeholder.
- **Thesis.** No figure.
- **All figures.**
  - Each image links to its full-size file so the detail can be read, with "(opens the full-size image)" for screen readers.
  - Explicit `width`/`height` attributes prevent layout shift.
  - A white panel with a hairline border sits behind the white-background diagrams, and the caption and credit line follow in grey.
- **JSON-LD.** The TRACE `SoftwareSourceCode` has an `image` (`ImageObject` with `url`, size, `caption` and `creditText`), built from `base_url`.

### SEO and GEO
- Each route sets its own `<title>`, meta description (137–155 characters; 143–146 on the project pages), canonical URL, Open Graph tags (`og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` with size and alt) and `twitter:card`. All of these are in the prerendered HTML. The restyle did not change any of them; only the base URL changed.
- JSON-LD:
  - `Person` on `/`: name "Manuel Fas", `alternateName` "Manuel Fas Ruiz" (NR-17), job title, `worksFor`, `alumniOf`, `knowsAbout`, `knowsLanguage`, `sameAs` GitHub/LinkedIn.
  - An `ItemList` of the three project pages on `/projects`.
  - On each project page, its `SoftwareSourceCode` (with `codeRepository`, `isBasedOn` for the arXiv papers, and `subjectOf` for the hosted `Report` or `Thesis`) plus a `BreadcrumbList`.
- Every page and section starts with a plain-text summary.
- Page URLs end with a slash, as GitHub Pages serves them (`https://fasmanuel2002.github.io/experience/`; home stays `/`). This applies to the canonical, `og:url`, the sitemap, the JSON-LD `url`, `@id` and breadcrumb items, and the llms.txt links. Internal links stay `/experience`; Pages redirects them, and the router handles them in the app.

### Content decisions applied from `needs_review`
- **NR-02**: the thesis result is DeepSurv, C-index approximately 0.82. No per-model table. *Reversed by the author on 2026-10-22: the site now follows thesis Table 2 (Cox-nnet, 0.8750) and shows the per-model table. See "Fix pass (2026-10-22)".*
- **NR-03**: "819 patients raw, 519 after preprocessing".
- **NR-04**: no PCA claim.
- **NR-05**: English thesis title.
- **NR-06**: seBERT (#03) is described as fine-tuning for two other labels, with no metrics.
- **NR-08**: #02 is described as a decoder-only, GPT-style model.
- **NR-09**: #05 and #06 show "Planned/in progress": #05 links only to its existing folder and #06 has no folder link. #04 shows "Completed" (the author's later update in data.json).
- **NR-11**: May 2026.
- **NR-12**: degree names.
- **NR-13**: CS50 shows 2024 and 2023, issuer Harvard University.
- **NR-14**: AI For Everyone shows Apr 2024, with no notes.
- **NR-16**: no phone number.
- **NR-17**: display name "Manuel Fas".
- **NR-18**: BISITE title.
- **NR-19**: GenAI issuer.
- **NR-23**: other repositories are not shown.
- **Verification caveats**: the data collector's notes are shown only for reimplementations #01 and #04 (results not comparable with the papers).

Two small wording edits for clarity:
- In the #04 caveat, "It is trained" became "The model is trained".
- In the thesis description, the "Thesis: <title> —" prefix was dropped because the title is already shown.

### Visual design
The design as of 2026-10-19 is described in the next section. The original concept (a causal attention mask drawn as SVG matrices, token timelines and cards) was removed from the pages, and the favicon is now an "MF" monogram.

### Accessibility
- **Semantics.** Banner header, nav labelled "Primary", `main`, `section`, `article`, `aside` and `footer` landmarks, exactly one `h1` per page, and headings in order without skipped levels.
- **Keyboard.**
  - A skip link comes first in the tab order and moves focus to `main`.
  - Focus rings are visible everywhere: 3 px vermilion on paper, amber on the ink header and footer.
  - `aria-current="page"` marks the active nav item, which also has an amber underline.
  - Scrollable table regions are focusable and labelled.
- **Links and images.** Link text describes the destination; visually hidden context is added where the visible text repeats ("Verify certificate: <title>"). The portrait has alt text from data.json; the employer logos are decorative (empty alt, `aria-hidden`), because the organization name next to them is the link.
- **Contrast** (computed): body text 13.97:1, headings (ink) 13.43:1, grey metadata 6.97:1, teal links 7.56:1 and vermilion labels 6.33:1 on the paper colour; nav text 7.81:1 and amber 7.11:1 on ink. There are no gradients or textures behind text any more, so these values hold everywhere.

## 2026-10-19 minimal restyle

**Request.** The author asked for a simpler page, inspired by https://fabiangroeger96.github.io but not a copy ("ours is not bad but there are a lot of things"), and chose to keep all nine routes and the same navigation. Two clarifications followed while the work was in progress:
- "Don't copy the same letter format style or anything, it's just a reference."
- "Take it as reference because I like it very much, but don't copy."

So the reference supplied only principles and a feel: one reading column, much more whitespace, fewer elements, and a calm, academic, mostly text page. Everything that produces that feel comes from this site's own identity.

**Taken from the reference: principles only.**
- One centered reading column, 46rem wide (the site's existing measure), on every page.
- Generous whitespace and hairline rules between sections and entries.
- Text first: no cards, panels, badges or decorative graphics.

**Not taken.** Its arXiv framing and metadata lines, serif body text, italic and small-caps styling, lowercase navigation with a red underline, bracketed `[code] [pdf]` link rows, monospace labels, dark-red colour, and its photo-beside-the-title layout. A first pass on 2026-10-19 used several of these: a serif body, bracketed links, monospace labels, a lowercase nav and a deep red. All of them were reverted the same day after the author's clarification. That pass was never committed or deployed.

**Kept: the site's own identity.**
- **Fonts and roles.** Newsreader for headings and Atkinson Hyperlegible Next for body text. Both stay self-hosted and preloaded.
- **Palette** (fewer colours, all from the existing set):
  - paper `#f5f2ea` background
  - ink `#0f2a32` for headings, the header and the footer
  - text `#14262c`
  - grey `#44555a` for metadata
  - teal `#0b5560` for links
  - vermilion `#9c370b` for small labels, list markers, the result marker, link hover and focus rings
  - amber `#f0a23b` only on ink, for the active nav item and focus
  - hairline `#d9d3c5`
- **Header and nav.** The existing ink bar with the name and title-case links, and the active item underlined in amber. The wordmark glyph was removed; the name is now a plain text wordmark.
- **Links.** Teal underlined text links, turning vermilion on hover. Link rows such as "Code on GitHub" and "Research project report (PDF)" are plain links separated by spacing. All link texts are unchanged.
- **Lists.**
  - Small uppercase labels: kinds, field names, the eyebrow.
  - Dated entries with a narrow date rail on Experience, Education and Certifications (9rem from 48rem wide; stacked on mobile).
  - Key-value lists separated by hairlines.
  - Bullet lists with vermilion markers.
  - The headline result as bold text with a thin vermilion bar.
- **Motion.** One short staggered reveal of the page head (CSS only, 70 ms steps). It is off under `prefers-reduced-motion: reduce`.

**Removed** (noise, decoration or duplicated presentation; no content was removed):
- The radial background wash and the dot grid behind page heads.
- The attention-mask SVGs (the home hero and every inner page head) and their row-by-row fill animation.
- The wordmark glyph.
- The old home hero's side column (the attention mask and the bordered "At a glance" card). The card is now a plain list.
- The three-column project cards, now a one-column list.
- Technology tag pills, now comma-separated text after a "Technologies" label.
- Filled and outlined buttons, now plain links.
- Result call-out boxes.
- The timeline's square tokens and connecting line, now a plain dated list. The course lists' square markers went too.
- Status badges, now small labels.
- Section index numbers (01/02/03) and project rank numbers.
- The portrait's offset shadow, now a thin ink border.
- The two-column grid of implementation cards.
- Table panels and the tinted highlight row; the highlighted row is now bold.
- Unused colour tokens (`--ink-2`, `--paper-2`, `--tag-bg`, `--rule-strong`, `--accent-ui`).

**Employer logos.** These are small grayscale marks in a 3rem box, blended into the paper (`mix-blend-mode: multiply`), at the top right of each role. To show them in colour, delete the `filter` line in `.entry__logo` in `site/src/styles.css`.

**Footer.** A slim ink footer with two lines: the email, GitHub and LinkedIn links, then "© Manuel Fas · Machine learning researcher and engineer · Salamanca, Spain". The copyright has no year, so no date was invented.

**Size.**
- `src/styles.css`: 1,406 lines (24.2 KB) down to 800 lines (13.4 KB), then 872 lines (14.9 KB) after the home layout update below.
- `src/app/app.css`: 146 lines down to 112.
- Built CSS: 17.3 kB down to 8.8 kB (2.5 kB transferred), then 9.7 kB (2.7 kB transferred) after the home layout update.
- Initial JS+CSS: 292 kB raw, 81 kB transferred.

**Files.**
- Rewritten: all page templates, `project-head.ts`, `app.html`, `app.css` and `styles.css`.
- Small edits:
  - `app.ts` (skip-link handler)
  - the page components (removed the `AttentionMask` import)
  - `scripts/sync-content.mjs` (one comment, no behaviour change)
- Added: `public/404.html`.
- Not changed:
  - `architecture-figure.ts`
  - `seo.ts`
  - the routes
  - the generated content, apart from the new base URL
  - `index.html`, which still preloads both fonts

## Verification (production build, served statically)

All results are from 2026-10-19, on the final build.

| Check | Result |
|---|---|
| `npm run build` (sync + `ng build --configuration production`, Node 24.22.0) | Passes with no warnings or budget errors. 9 static routes prerendered. Initial JS+CSS 292 kB raw / 81 kB transferred; route chunks 1.4–16 kB. |
| Base URL | No "vercel" string in `site/src`, `site/public`, `site/scripts` or the build output. The sitemap, robots.txt, llms.txt, canonical, `og:url`, `og:image` and JSON-LD use `https://fasmanuel2002.github.io`. The unrelated project homepage `arxiv-app-kappa.vercel.app` stays in data.json; the site does not show it (NR-23). |
| Routes (static server) | All nine routes return 200. Unknown paths such as `/projects/unknown-slug` and `/nope` return 404 with the new `404.html`. |
| Head tags and JSON-LD vs. the build before the restyle | Identical on all nine routes: title, description, canonical, Open Graph, `twitter:card` and the parsed JSON-LD. Both builds use the new base URL. |
| Content vs. the build before the restyle | Same links (internal and external) and the same images with the same alt text on every route. Every visible word is still present except the decorative index numbers ("01", "03"). |
| One `h1`, heading order, `lang="en"` | Pass on all nine routes; no skipped heading levels. |
| Layout at 375 / 768 / 1280 px | No horizontal overflow on any of the 27 route/width combinations, including the figures and tables; screenshots reviewed. No console errors or failed requests. |
| axe-core 4.14 (WCAG 2.0, 2.1 and 2.2 A/AA plus best practices), 1280 and 375 px | 0 violations and 0 "incomplete" items on all nine routes. |
| Keyboard and motion | The first Tab reaches the visible skip link; Enter moves focus to `main` without a page load. Under `prefers-reduced-motion: reduce`, 0 animations run on the nine routes. |
| Lighthouse 13.5 | See the next table. Mobile: LCP 2.1–2.4 s, total blocking time at most 148 ms, CLS at most 0.015. Desktop: LCP 0.5 s on every route. |

| Lighthouse 13.5 (local static server, all nine routes) | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Mobile | 97–99 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

The table was measured before the home layout update; home was re-measured afterwards (see the next section). These numbers come from `serve` on localhost. GitHub Pages serves through its own CDN with its own caching, so the numbers there will differ slightly.

## 2026-10-19 home layout update

**Request.** Two follow-up requests from the author for the home page only:
- "Put the About me and Recent activity as the first part and put it like in parallel so the user can see both at the same time."
- "The picture must be one of the first things the user sees."

**Order** (superseded by the final pass below). The home page ran: hero, then About and Recent activity side by side, then Featured projects, then At a glance. The headings are h1 "Manuel Fas", then h2 About (with four h3s), h2 Recent activity, h2 Featured projects (with three h3s) and h2 At a glance. In the DOM, About comes before Recent activity.

**Hero.**
- The label, h1, summary and links are unchanged. The portrait sits in the hero, in the site's own style: a square with a thin ink border and slightly rounded corners, not a circle.
- From 40rem it sits on the right of the text block, top-aligned, 8–10rem wide (`clamp(8rem, 14vw, 10rem)`). Below 40rem it sits above the label at 6.5rem.
- It loads eagerly with `fetchpriority="high"`, keeps its width and height attributes and its alt text, and is not animated.
- Measured position:
  - 375×667: y = 182–286 px
  - 768×1024: y = 117–245 px
  - 1024×768: y = 135–278 px
  - 1280×800: y = 135–295 px
- The portrait is above the fold in every case. It is the LCP element on mobile; on desktop the summary paragraph is.

**About and Recent activity.**
- From 64rem they form a CSS grid of 3fr and 2fr, separated by a hairline divider under one top rule. Both columns start on the same line.
- Only this block is wider than the 46rem reading column, at 70rem (`min(100vw - 2.5rem, 70rem)`). That makes the columns 648 and 432 px at 1280, and 566 and 378 px at 1024.
- In the narrow column, each activity item stacks date, title, then kind and organization, so no date rail takes width.
- The About subsections have smaller h3s (1.1rem) and less spacing; no words were cut.
- Below 64rem the two blocks stack, About first.
- The activity column is not `position: sticky`. It is about as tall as a laptop viewport, so a sticky column could hide its last items on short screens.

**Featured projects and At a glance.** Unchanged styling; At a glance gained only a top margin, now that it comes last.

**Verification (final build).**

| Check | Result |
|---|---|
| Build | `npm run build` passes, with no warnings or budget errors. |
| Routes | All nine routes return 200; unknown paths return 404. |
| Content and head tags | Head tags, JSON-LD, links (href and text) and images (src and alt) are identical to the build before the restyle. |
| Headings | One h1 and logical heading order. |
| Layout | No horizontal overflow on any route at 375, 768, 1024 or 1280 px. |
| axe-core 4.14 | 0 violations on all nine routes at 375 and 1280 px. On home at 1280 it marks five text nodes as "incomplete" for contrast, because the wide block extends past `<main>`'s 46rem box and axe cannot work out the background behind them. The only background there is the flat paper colour, so contrast is 13.97:1 for text and 6.97:1 for grey metadata. |
| Lighthouse 13.5, home | Desktop: 100 / 100 / 100 / 100. Mobile: performance 95, 98 and 97 over three runs (LCP 2.3 s each time; total blocking time 63–179 ms, which is machine noise), with accessibility, best practices and SEO at 100. |

## 2026-10-19 final pass (author approval)

**Home.**
- Order: hero (with the portrait), "At a glance", then About | Recent activity. The headings are h1, then h2 At a glance, h2 About (with four h3s) and h2 Recent activity.
- The Featured projects section was removed from home at the author's request. `/projects` lists all three projects, and the nav and the hero's "View projects" link point there. The home JSON-LD and meta description are unchanged.
- **Conflict for the author:** CLAUDE.md still says "Home: short professional summary and featured projects". I did not edit CLAUDE.md.

**At a glance.** A strip directly under the hero. It is an auto-fit grid of small label/value pairs: one band of five columns from 64rem, three columns on tablet, and stacked on mobile. Its content and links are unchanged; only Languages and Interests swapped places, as asked.

**Alignment.**
- From 64rem the hero, the strip and the About | Recent activity block share one 70rem width and one 3fr / 2fr grid. Their left edges line up.
- The portrait sits at the right edge, in line with the Recent activity column. The summary keeps the 3fr column measure (648 px at 1280).
- The site header stays at the 46rem column on every page.

**Trailing slashes.** All page URLs now end with a slash; see "SEO and GEO".

**Files.**
- Deleted `site/src/app/attention-mask.ts`.
- Replaced `public/favicon.svg` and `public/favicon.ico` with the "MF" monogram.
- The employer logos stay grey.

**Verification.**

| Check | Result |
|---|---|
| Build | `npm run build` passes. |
| Routes | All nine routes return 200 at their trailing-slash URLs; unknown paths return 404. |
| URLs | The sitemap lists all nine routes with trailing slashes. On every route the canonical and `og:url` equal the sitemap entry. The JSON-LD page URLs and the llms.txt links end with a slash. |
| Headings | One h1 per page. |
| Layout | No horizontal overflow at 375, 768, 1024 or 1280 px on any route. |
| Portrait | Above the fold at 375×667 (y = 182–286 px) and 1280×800 (y = 135–295 px). |
| axe-core 4.14 | 0 violations on all routes at 375 and 1280 px, plus the one known "incomplete" on home at 1280 caused by the wide breakout. |
| Lighthouse | Not rerun in this pass. |

## How to preview locally

Prerequisite: Node 24.15+ (or 22.22.3+). With nvm, run `nvm use` inside `site/` to read `.nvmrc`. If nvm refuses because of the `prefix` setting in `~/.npmrc`, put Node 24 on the PATH for the command instead:

```sh
cd site
export PATH="$HOME/.nvm/versions/node/v24.22.0/bin:$PATH"   # only if `nvm use` is not possible
npm install

# Development server with live reload (ng serve)
npm run sync                      # only needed after editing data/data.json
npx ng serve --port 4300          # http://localhost:4300 (4200 is used by the static preview below)

# Production build exactly as deployed, then serve the static output
npm run build                     # sync from data/data.json + ng build --configuration production
npx -y serve@14.2.6 dist/portfolio/browser -l 4200 --no-port-switching --no-clipboard    # http://localhost:4200
```

`serve` is a small static file server. Like GitHub Pages, it serves `experience/index.html` for `/experience` and the custom `404.html` for unknown paths. Unlike GitHub Pages, it does not redirect `/experience` to `/experience/`.

## Deploy to GitHub Pages

The full steps are in the root `README.md`. The workflow is `.github/workflows/deploy.yml`.

| Item | Value |
|---|---|
| Repository | Must be named `Fasmanuel2002.github.io` (a user site), so the site is served from the root with base href `/` |
| Pages source | Settings > Pages > Source: **GitHub Actions** |
| Workflow | On push to `main` (or manually): `npm ci` and `npm run build` in `site/`, `touch dist/portfolio/browser/.nojekyll`, then it uploads and deploys `site/dist/portfolio/browser` |
| Node | From `site/.nvmrc` (24) |
| Output folder | `site/dist/portfolio/browser`, the Angular default for this project, matching the workflow |

- No SPA fallback is needed: every route is prerendered to `<route>/index.html`, which Pages serves directly, and the hydrated Angular router handles in-app navigation.
- Unknown URLs get `404.html` with HTTP 404. It uses absolute paths only, so it works at any depth.
- `.nojekyll` makes Pages serve the files as-is, without Jekyll processing.
- I did not push, trigger the workflow or change repository settings.

## Open items for the author

As of 2026-10-19, kept as a record. For the current list, see "Remaining issues for the author" at the end (2026-10-22).

1. **Trailing slashes: resolved on 2026-10-19** (author approval). Every page URL now ends with a slash; see "SEO and GEO".
2. **Hosted thesis PDF.** By your decisions NR-02 and NR-15, the site reports DeepSurv (C-index approximately 0.82), as in the abstract. The hosted PDF's Table 2 and the public README still show Cox-nnet 0.8750 as best. The PDF also keeps the supervisors' signature stamps and template placeholder text. *2026-10-22: NR-02 was reversed and the site now follows Table 2; the PDF is kept as is by author decision (QA C3).*
3. **NR-20 (open).** The two specialization links come from your CV but could not be verified automatically. Please open them once in a browser.
4. **NR-10 (open).** The site lists five thesis models; the English abstract mentions six.
5. **NR-24 (open): third-party architecture figures.** The TRACE, #02 and #04 figures come from or are adapted from the original papers. They are shown with visible credit, but reuse rights were not checked. Confirm the attribution is acceptable, or supply self-made diagrams. Replacing a file in `data/figures/` and rebuilding is enough.
6. **Paper-Reimplementations README.** The site shows #04 as Completed, but the repository README still says "In Progress" for #04 (noted in data.json `status_source`). Consider updating the README so both match.
7. **`attention-mask.ts`: deleted on 2026-10-19** (author approval). Nothing imported it.
8. **Favicon: replaced on 2026-10-19** with the "MF" monogram (author approval).
9. **Logos in grayscale.** Kept grey, as the author confirmed. One CSS line restores colour.
10. **Footer copyright has no year.** A year can be added if you want one.
11. **`site/angular.json`** has an uncommitted `"cli": { "analytics": "…" }` entry that was not part of this build. It turns on Angular CLI usage analytics on this machine and does not affect the site. Remove it if you did not mean to opt in.
12. **`404.html` lists the navigation by hand.** If the nav ever changes, update `site/public/404.html` too.
13. **Node environment.** I installed Node 24.22.0 with nvm. Your nvm default alias (`lts/*`) now resolves to it in new terminals. To go back to the system Node, run `nvm alias default system`.
14. **Caching.** GitHub Pages sets its own cache headers, which cannot be configured, so hashed JS/CSS files are not cached long-term. This is acceptable for a site of this size.

## Design polish pass (2026-10-21)

**Request.** Approved by the author on 2026-10-21: "make it better, it needs to be simple but perfect". The 2026-10-19 constraints still apply: calm and text-first; the site's own fonts (Newsreader, Atkinson Hyperlegible Next) and palette (teal, paper, vermilion); all nine routes, the nav, the scroll effects, the home counters and the mobile menu; no new libraries, fonts or third-party scripts. `data/data.json` was not edited. The uncommitted `"analytics"` line in `site/angular.json` was left as it is.

### What changed

**1. One frame.** A `--frame` token (46rem, widened to 70rem from 64rem) sets the width of the header bar, `<main>` and the footer on every route. Home fills the frame. Inner pages centre their 46rem reading column inside it (`main > :not(router-outlet)`). The Home `100vw` breakout is gone. Measured edges in CSS px:

| Width | Header and footer, left | Header, right (toggle icon) | Home content | Inner-page column |
|---|---|---|---|---|
| 375 | 20 | 355 | 20–355 | 20–355 |
| 768 | 20 | 748 | 20–748 | 20–748 |
| 1024 | 20 | 1004 | 20–1004 | 144–880 |
| 1280 | 80 | 1200 | 80–1200 | 272–1008 |
| 1440 | 160 | 1280 | 160–1280 | 352–1088 |

The header and footer are the same on every route.

**2. Home hero.**
- **Portrait.** A circle with no border; the photo's white background reads as a clean disc on the paper. It is 7.5rem on phones, 9–10.5rem on tablets and 12rem (192 CSS px) from 64rem, so it never exceeds 192 px for the 400 px file. It is still loaded eagerly with `fetchpriority="high"` and is not animated.
- **Lede.** "Specialising in Transformer architectures, NLP and large language models. Reimplements state-of-the-art papers as reproducible PyTorch code, with research experience across three labs in Spain and Switzerland." (26 words).
  - It is composed in `sync-content.mjs`, and "three labs in Spain and Switzerland" is computed from the research roles.
  - `expect` checks fail the build if the CV summary stops saying any of the three restated phrases, if the lede passes 32 words, or if it repeats the headline.
  - The full summary stays in the JSON-LD `description` and in `llms.txt`. The home meta description is unchanged.
- **Primary action.** "View projects" is bold, with a full-strength 2px underline and an arrow. It is still a text link.

**3. Home About.**
- Only "Who I am" and "What I do", verbatim (both are `verbatim: true`), selected in `sync-content.mjs`. The new lede is "Who Manuel Fas is and what he does, in his own words."
- The HSLU exchange is stated on /education: the entry "Lucerne University of Applied Sciences and Arts (HSLU)", "Visiting Exchange Student, Computer Science", Sep 2025 – Jan 2026, and the page summary.
- About is now much shorter than Recent activity. From 64rem wide and 40rem tall, it stays in view beside the list while the reader scrolls (`position: sticky`).

**4. Projects list.** The headline result is the visual anchor, rendered by a new `app-result` component.
- **Style.** Figures in Newsreader at 1.9–2.4rem with lining tabular figures. The words between them and the note below are small and grey. The vermilion bar is gone.
- **Wording.**
  - TRACE now reads "0.787 AUROC · 0.696 AUPRC" (number first, as suggested).
  - The thesis keeps its exact wording, "Best model: DeepSurv, C-index approximately 0.82" (NR-02). Only "0.82" is set large.
  - Paper-Reimplementations reads "6 papers listed".
  - The generator splits each result into parts and checks that the parts join back to the exact text.
- **Titles.** Ink, with no underline until hover or keyboard focus. The focus ring is unchanged.
- **Links row.** It wraps only between links.
- **Project pages.** The same component renders the result in the three project page heads, so the list and the detail pages match.

**5. Certifications.** Three sections: Deep Learning Specialization, Mathematics for Machine Learning and Data Science, and Other certificates.
- **Summaries.** Each section starts with a one-line summary composed in the generator:
  - "Five DeepLearning.AI courses on Coursera, Jun 2025 to Feb 2026."
  - "Three DeepLearning.AI courses on Coursera, Dec 2024 to Mar 2025."
  - "Four courses taken outside the specializations, 2023 to Aug 2026."
- **Links.** The two specialization headings link to their URLs from data.json.
- **Rows.** Each row has the date rail, the course title (h3), then "Verify certificate" and the "Course notes" disclosure on one line. The notes open at full width below.
- **Less repetition.** The repeated "Certificate · Part of …" eyebrow is gone. Issuer and platform are stated once per specialization and on each standalone row. The GenAI topics line stays.
- **Structure.** Headings run h1, then an h2 per group, then an h3 per certificate. The anchors `#spec-deep-learning`, `#spec-math-ml-ds` and every `#cert-…` are kept.
- **Height.** At 1280 px the page is 2,262 px tall instead of 3,491; at 375 px, 2,922 instead of 4,197.

**6. Dark theme with a toggle.**
- **Tokens.** Dark values sit under `@media (prefers-color-scheme: dark) { html:not([data-theme='light']) {…} }` and again under `html:is([data-theme='dark'])`. `data-theme='light'` forces the light theme, and `color-scheme` follows.
  - Page `#0a1b21`: deep ink, darker than the `#0f2a32` ink bar.
  - Text `#e6e1d6`, headings `#f5f2ea`, muted `#9fb1b4`.
  - Links `#7cc7cf`, vermilion `#f08c5f`, rules `#24414a`.
- **Contrast** on the dark page: text 13.52:1, headings 15.75:1, muted 7.91:1, links 9.17:1, vermilion 7.24:1. The bar keeps its colours (13.43, 7.81 and 7.11:1). The light values are unchanged.
- **Header.** The header and footer keep the ink bar in both themes, with a hairline edge in dark. `theme-color` (`#0f2a32`) is therefore right in both themes and was not changed.
- **Images.** Employer logos sit on a white chip in dark. Architecture figures stay on their white panel. The portrait is toned down slightly (`brightness(0.92)`).
- **Toggle.**
  - An icon button at the end of the header: a moon offers dark, a sun offers light (inline SVG).
  - It comes after the nav on desktop and next to the menu button on mobile, in DOM order, so the focus order matches the visual order.
  - Its accessible name is "Switch to dark theme" or "Switch to light theme". It is 44×44 px with the amber focus ring.
  - The choice is stored in `localStorage` (`theme`) inside `try/catch`. Without a saved choice the theme follows the system setting, including live changes. The button is hidden without JavaScript.
- **No flash.** An inline script in `index.html` sets `data-theme` before first paint. The build has a second trap:
  - Beasties inlines only the CSS whose selectors match the prerendered page, and it tests selectors with pseudo-classes stripped. The rest of the CSS loads late.
  - So `:root[data-theme='dark']` would have been left out, and dark pages would have flashed light.
  - The `html:not(…)` and `html:is(…)` selectors mean the same thing and stay inlined.
  - Verified by rendering pages with the stylesheet and all scripts blocked.
- **Back to top.** On hover it is now amber with ink (7.11:1 in both themes). The old vermilion with paper text would have failed contrast in dark.

**7. Share card.** See the asset table at the top.
- `og:image` on all nine routes points to `/images/og-card.png`, with `og:image:width` 1200, `og:image:height` 630 and `og:image:alt` "Manuel Fas: Machine learning researcher and engineer, Salamanca, Spain".
- `twitter:card` is `summary_large_image`.
- The JSON-LD `Person` image is still the profile photo.

**8. General polish.**
- The Home breakout was replaced by the frame. This also removes the axe "incomplete" result on Home at 1280 px and a few pixels of misalignment with classic scrollbars.
- Removed the unused rule `.section .entry { padding-bottom: 0 }`. It was left over from the removed home projects list and would have squeezed the certificate rows.
- Disclosures ("Course notes", "Report abstract") use a small chevron after the label instead of the browser's triangle. It looks the same in every browser.
- Certifications: all group headings use the heading ink, and the link is marked by its underline.
- Thesis page: the Technologies line now matches the Keywords line above it, with the same size and colour as on the other project pages.
- Education: the thesis title is set at weight 500, so it no longer competes with its "Bachelor's Thesis" heading.
- Mobile menu: a hairline under the panel keeps it distinct from the page, which matters in dark.
- Home no longer imports four content files just to count. The counts come precomputed in `home.json`, with the same values (4, 3, 4, 12).
- `404.html`: the header uses the same frame, the page follows the dark theme and the saved choice, and the nav links have trailing slashes like the app.

### Files touched
- **Changed:**
  - `site/scripts/sync-content.mjs`
  - `site/src/index.html`
  - `site/src/styles.css`
  - `site/src/app/app.ts`, `app.html`, `app.css`
  - `site/src/app/seo.ts`
  - `site/src/app/pages/home/home.ts`, `home.html`
  - `site/src/app/pages/projects/projects.ts`, `projects.html`, `project-head.ts`, `thesis-project.html`
  - `site/src/app/pages/certifications/certifications.ts`, `certifications.html`
  - `site/public/404.html`
  - The generated `site/src/app/content/*.json`, and `site/public/llms.txt` (only the TRACE result wording)
  - `README.md` (share card section) and this file
- **Added:** `site/src/app/result.ts`, `site/scripts/og-card.html`, `site/public/images/og-card.png`.
- **Not changed:** `data/data.json`; `site/angular.json` (the analytics line is still its only uncommitted change); the routes; `sitemap.xml`; `robots.txt`; the JSON-LD; page titles and descriptions. Nothing was deleted.

### Verification (production build, served statically)

| Check | Result |
|---|---|
| `npm run build` (Node 24.22.0) | Passes with no warnings or budget errors; 9 routes prerendered. Initial JS+CSS is 309 kB raw / 85 kB transferred (was 305 / 84). CSS is 13.8 kB / 3.6 kB. |
| Routes | All nine return 200. Unknown paths return 404 with `404.html`. |
| Overflow, h1, heading order, axe-core 4.14 (WCAG 2.0, 2.1 and 2.2 A and AA, plus best practices) | 9 routes × 375/768/1280 px × light, dark (system) and dark (saved choice): 81 of 81 pass. No horizontal overflow, one h1, no skipped levels, 0 violations, 0 incomplete. The 375 px runs use Playwright viewport emulation, which has no window-size minimum. `404.html` has 0 violations in both themes. |
| Contrast | Computed values are listed above. axe found no contrast issue in either theme. |
| Theme toggle | Reached by Tab after the nav (8th stop on desktop) and after the menu button on mobile. Enter and Space switch the theme. The label always names the action, and focus stays on the button. The choice persists across reloads, client-side navigation and full page loads. Without a saved choice it follows a live system change. It works with the mobile menu open, with no errors when storage throws. |
| No flash | With the stylesheet and all scripts blocked: saved dark and system dark render dark; saved light (with system dark) and system light render light. |
| Reduced motion | With `reduce`: 0 running animations on all nine routes in both themes, also after scrolling. The counters show their final values. |
| Lighthouse 13.5 (localhost) | Home and /projects: mobile 98 / 100 / 100 / 100, desktop 100 / 100 / 100 / 100 (performance, accessibility, best practices, SEO). Mobile LCP is 2.3 s. |
| Content | Every route has the same link targets and images (src and alt) as the committed build. Words removed: on Home, the two dropped About paragraphs, the long hero summary and the old About lede; on /certifications, the "Certificate · Part of" eyebrow. All 12 certificates keep their id, date and verification URL, and both specialization links are unchanged. |
| Head tags | The 1200×630 card is the `og:image` on all nine routes, with alt text and `summary_large_image`. Titles and descriptions are unique; descriptions are 137–155 characters. The JSON-LD parses: Person, ItemList, and SoftwareSourceCode with BreadcrumbList. |
| Key facts without JavaScript | The prerendered HTML contains the name, the headline, the current role and the other roles, the project titles and results (0.787, 0.696, DeepSurv C-index approximately 0.82, 6 papers), the certificates and the HSLU exchange. |
| Generator | Deterministic: a second `npm run sync` changes nothing. `sitemap.xml` and `robots.txt` are unchanged. |

Test tools ran from a scratch folder and were not added to the project: Playwright-core 1.64, axe-core 4.14 and Lighthouse 13.5, driving the installed Google Chrome 155.

### For the author
1. **Sticky About on Home (new).** I added it to avoid a tall empty column next to Recent activity, and it matches your earlier request to see both at once. If you prefer About to scroll away, delete the `@media` block under the comment "About is much shorter than Recent activity" in `site/src/styles.css`.
2. **Dropped About text.** The facts from "Education and international experience" and "My interests" are on /education and in At a glance. Their personal sentences now appear nowhere on the site, for example "Studying both fields has helped me think about technology from different perspectives" and your goal of bridging research ideas and practical applications.
3. **NR-02 is now more visible.** "0.82" is set large on /projects and on the thesis page. The wording is unchanged, and it still differs from the hosted PDF's Table 2 and the README (Cox-nnet 0.8750). *Resolved on 2026-10-22: see "Fix pass (2026-10-22)".*
4. **TRACE order.** The result now reads "0.787 AUROC · 0.696 AUPRC" everywhere it appears, including `llms.txt`.
5. **Date formats in Recent activity.** Paper dates come from data.json as "July 2026" and "January 2026", while roles and certificates use "Sep 2026". I kept them verbatim.
6. **Unused generated data.** `home.json` still carries `projectCards` and `ledes.featured` from the removed home projects section, about 3 kB in the home chunk. I did not remove them in this pass.

## Fix pass (2026-10-22)

Pipeline step 5: one revision pass for the high and medium findings in `docs/qa-report.md` (QA and SEO/GEO, both run on commit `93d050e`). Low findings were not changed; they are listed under "Remaining issues for the author". The developer did not edit `data/data.json`. It contains the data collector's NR-02 update, which the author approved on 2026-10-22.

### What was fixed

| ID | Severity | Fix | Where |
|---|---|---|---|
| B8 | high | NR-02 reversed by the author. The large result figure now reads "Best model: Cox-nnet, C-index 0.8750". The thesis page Results section opens with the five-model table: C-index and log-rank p as printed in thesis Table 2, best model highlighted, same layout as the TRACE table. The four rewritten findings from data.json follow. "DeepSurv best", "approximately 0.82" and "the only significant model" are gone from the HTML, the JS bundle, the meta and OG description, and `llms.txt`. | `site/scripts/sync-content.mjs`, `site/src/app/pages/projects/thesis-project.html`; generated `project-thesis.json`, `projects.json`, `home.json`, `shared.json`, `public/llms.txt` |
| B10 | medium | Home At a glance "4 Papers reimplemented" now reads "4 Completed implementations" (author wording). | `sync-content.mjs`, generated `home.json` |
| S24 | medium | Adjacent inline values no longer run together in text read without CSS. Separators were added where inline elements touched: visually hidden ". ", ", " or ": " spans, or a preserved space (`&ngsp;`) in flex rows, where white space is not rendered. Locations: the result line (value and note), the home stats, At a glance current role and education, the Recent activity labels, the project date and role line, and the Paper-Reimplementations number, status and paper citations. The visual layout is unchanged. | `site/src/app/result.ts`, `site/src/app/pages/home/home.html`, `site/src/app/pages/projects/project-head.ts`, `site/src/app/pages/projects/reimplementations-project.html` |

Notes:
- **Table caption.** It is data.json's `results.description` without its internal review reference: "Held-out test results as reported in thesis Table 2 (page 27)". The p-values are shown as printed in Table 2 (six decimals), so the rounding differences in the thesis prose (NR-25) do not reach the table.
- **New build checks.** `expect()` guards in `sync-content.mjs` fail the build in four cases: the first table row is not the best model, the rows are not ordered by C-index, the rows do not cover exactly `method.models`, or the results description changes.
- **Thesis metadata.** The meta and OG description is 134 characters: "Bachelor's Thesis (UPSA): classical and deep survival models on TCGA breast cancer RNA-seq data. Best model: Cox-nnet, C-index 0.8750." The thesis JSON-LD carries no result values; its name, description and repository match data.json.
- **Separators in rendered text.** The hidden separators use the site's existing `.visually-hidden` class. Screen readers read them inline. In the browser's rendered `innerText` they sit on their own line, as the site's existing hidden link suffixes such as " (PDF)" do. Boundaries between block elements (list items, `dt`/`dd`, headings) come from the HTML structure and were not changed.

### Author decisions recorded (no change)
- **B9 (medium), downloadable CV.** `/cv/Manuel-Fas-CV.pdf` keeps the original CV wording. Its degree name, PCA claim, GenAI issuer and CS50 dates and issuer differ from the site. Author decision 2026-10-22: keep as is.
- **C3 (medium), hosted thesis PDF.** `/papers/TFG_ManuelFasRuiz.pdf` keeps:
  - the supervisors' e-signature stamps, with names and partially masked national ID numbers;
  - the Word-template placeholder text on pp. 5–6;
  - the abstract's DeepSurv figures on p. iii, which now differ from the site (Table 2).

  Author decision 2026-10-22: keep as is.

### Files touched
- Source: `site/scripts/sync-content.mjs`, `site/src/app/pages/projects/thesis-project.html`, `site/src/app/result.ts`, `site/src/app/pages/home/home.html`, `site/src/app/pages/projects/project-head.ts`, `site/src/app/pages/projects/reimplementations-project.html`.
- Generated by `npm run build`: `site/src/app/content/project-thesis.json`, `projects.json`, `home.json`, `shared.json`, and `site/public/llms.txt`. `sitemap.xml` and `robots.txt` are unchanged.
- Docs: this file.

### Verification (production build)

| Check | Result |
|---|---|
| Build | `npm run build` (sync, then `ng build --configuration production`, Node 24.22.0): exit 0, 9 static routes prerendered. |
| Prerendered HTML, all 9 routes | 87/87 checks pass: one h1 per route; the footer; unique titles and descriptions (134–155 characters); `og:description` equals the meta description; JSON-LD parses on the 5 routes that carry it. The thesis table rows and findings equal data.json, and the thesis JSON-LD matches data.json. |
| Old thesis claim | No "0.82", "approximately", "only model" or "only significant" anywhere in `dist` (HTML, JS, text) or `llms.txt`. "DeepSurv" appears only in the model list, the method details, its table row (0.8032) and the new findings. |
| S24 | A scan for inline elements whose text runs together finds 0 cases on the 9 routes (32 before). Naive strip-tags text reads "4 Roles", "Junior Machine Learning Researcher, BISITE Research Group (University of Salamanca), Sep 2026 – Present", "Role: BISITE Research Group (University of Salamanca)", "0.787 AUROC · 0.696 AUPRC. TRACE (multi-task)…", "Best model: Cox-nnet, C-index 0.8750. 819 patients raw…", "6 papers listed. 4 completed…", "January 2026 Role: Author", "01 Completed" and "Sequence to Sequence Learning with Neural Networks. Ilya Sutskever…". |
| Layout | `/`, `/projects/` and the thesis page at 375, 768 and 1280 px, light and dark (18 loads in headless Chrome over http://127.0.0.1): 96/96 checks pass. No page overflow. The thesis table fits its column at every width (335 px at 375, no inner scrolling). Hidden separators render at 1 px or less, and result notes stay on their own line. Contrast is at least 6.97 (table cells 13.43 light, 15.75 dark). "Completed implementations" wraps to two lines at 375 and 768. |
| Not re-run | axe-core and Lighthouse; no offline copy was available. QA's results (axe 0 violations, Lighthouse 93–100) predate this pass. |

## Remaining issues for the author

Per CLAUDE.md there is no further automatic revision cycle. Nothing below was changed in the fix pass; each item needs your decision.

### Low findings: QA

| ID | Finding | Where | Possible action |
|---|---|---|---|
| B11 | TRACE table shows "0.68" and "0.62"; the report prints "0.680" and "0.620" (data.json stores numbers). | `/projects/trace-reimplementation/` | Store display strings in data.json, or format to three decimals. |
| B12 | Mixed month formats: "July 2026" and "January 2026" next to "Aug 2026". Each matches data.json. | Home Recent activity, `/projects/`, project pages, `/education/` | Abbreviate the papers' `date_display` in data.json. |
| B13 (NR-10) | Five thesis models are listed; the thesis abstract mentions six (including Ridge). | Thesis page, `/education/`, `llms.txt` | Decide NR-10. |
| B14 (NR-11) | Degree completed May 2026 (CV date), while the thesis is dated July 2026; Home lists the thesis above "Degree completed". | `/education/`, Home Recent activity | Confirm NR-11 or change the date. |
| B15 | Paper-Reimplementations JSON-LD `isBasedOn` lists all six papers, including #05 and #06, which are not implemented yet. | `/projects/paper-reimplementations/` JSON-LD | List only completed papers. |
| B16 | "Open to international roles and relocation" is a constant in `sync-content.mjs`, not in data.json (single-source rule). | Home, Contact, `llms.txt` | Add it to data.json, for example `person.open_to`. |
| C2 | Both full PDFs are published (approved under NR-15). | `/papers/*.pdf` | None, unless NR-15 changes. |
| E3 | At 375 px, table header text renders at about 10.9 px. The new thesis table uses the same header style. | TRACE, thesis and Paper-Reimplementations tables | Raise the header size on small screens. |
| H3 | Course notes (verbatim author text): five lack a final period, one is in the present tense, "It was an amazing course" is informal, and British and American spellings are mixed. | `/certifications/` | Edit the notes in the source. |
| I14 / S25 | Some h2 sections open with a list, table or definition list instead of a summary sentence. | TRACE, thesis and Paper-Reimplementations sections; Home At a glance; Contact details | Add a one-sentence lede from data.json facts. |
| J1 (NR-24) | Third-party architecture figures are credited, but reuse rights are unconfirmed. | TRACE page, Paper-Reimplementations | Confirm, or supply your own diagrams. |

### Low findings: SEO/GEO

| ID | Finding | Where | Possible action |
|---|---|---|---|
| S3 | Long `<title>`s (thesis 102 characters, TRACE 80), so " — Manuel Fas" is cut in search results. | Thesis and TRACE pages | Shorter `<title>`/`og:title` from data.json wording, for example the README title. |
| S12 | TRACE `SoftwareSourceCode` has no `license` (data.json: MIT). | TRACE JSON-LD | Add `license` to the TRACE block only. |
| S13 | The thesis's Spanish cover title (`title_original`) is not on the site. | Thesis page and JSON-LD | Add it as `alternateName` (`inLanguage: es`) and one citation line. |
| S14 | No `WebSite` or `ProfilePage` JSON-LD on `/`; roles and certificates are not machine-readable. | `/` | Add both nodes; `hasCredential` is optional. |
| S19 | `index.csr.html` is deployed and crawlable. | Live site | `Disallow: /index.csr.html` in the generated robots.txt, or leave the file out of the published folder (removing files needs your approval). |
| S26 | The thesis page lead repeats the h1 and gives no quotable facts. | Thesis page, its JSON-LD description, `/projects/` card | Use a lead built from data.json facts, consistent with NR-02 (now Table 2) and NR-10. |
| S28 | The GitHub profile does not link back to the site. | GitHub profile (your account) | Set the profile website and add the link to the profile README. |

### Open `needs_review` items
- **NR-10 (low):** see B13.
- **NR-21 (low):** inconsistent figures and the "Swiss retail company" line are inside the hosted TRACE report PDF only, not in the site's HTML.
- **NR-24 (low):** see J1.
- **NR-25 (low, new):** the thesis prose rounds two p-values differently from Table 2 and calls the table "Table 1". The site follows Table 2 (its caption number and printed values), so no site change is needed. Optionally fix the PDF.
- **NR-20 and NR-22:** QA found both specialization links working (D7), so NR-20 can be closed. NR-22 has no site impact.

### Checks that need a manual browser check
- **D6:** the LinkedIn links (your profile and three supervisors) and the cBioPortal dataset link block automated requests.
- **S34:** Google Rich Results Test on the 5 routes with JSON-LD. The schema.org validator found 0 errors.
- **S35:** Search Console indexing (needs your Google account; submit `/sitemap.xml`).
- **S36:** check that your LinkedIn profile links to https://fasmanuel2002.github.io.
- Not covered by QA: real devices, Safari and Firefox, and screen readers.

### Kept by author decision
- B9 (downloadable CV) and C3 (hosted thesis PDF): see "Author decisions recorded" above.
