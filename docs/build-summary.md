# Build summary: Manuel Fas portfolio

Built on 2026-10-18 from `data/data.json` (approved, revision 2). Angular 22.2.3, static prerendering. Deploy target since 2026-10-19: GitHub Pages user site `https://fasmanuel2002.github.io` (previously Vercel).

Revision 2026-10-18 (author review):
- Reimplementation #04 ("An Image Is Worth 16×16 Words") now shows Completed, following the author's update in data.json.
- Each project has its own prerendered page at `/projects/<slug>`, and `/projects` is now a catalog.
- Architecture figures from data.json are shown on the TRACE page (at the top) and on reimplementations #02 and #04.

Revision 2026-10-19:
- GitHub Pages preparation: new base URL in all generated files, a static `404.html`, and a skip-link fix for GitHub Pages' trailing-slash redirects. See "Deploy to GitHub Pages".
- A simplified design that keeps the site's own fonts, palette, links, navigation and lists. See "2026-10-19 minimal restyle".

## External assets and justification

The site loads nothing from third-party servers: no CDN, web-font service, analytics, tracking or third-party script. Everything below is self-hosted from `site/public/` and served from the site's own origin. The restyle of 2026-10-19 added no asset, font, library or script.

| Asset | Source and licence | Served at | Size | Justification |
|---|---|---|---|---|
| Newsreader (variable font: weight 400–700, optical size 6–72) | Production Type / Google Fonts, SIL Open Font License 1.1. Taken from `@fontsource-variable/newsreader` 5.3.0 and subset to the 132 Latin glyphs headings use. The OFL declares no Reserved Font Name, so subsetting is permitted. | `/fonts/newsreader-latin-var.woff2` | 61 KB (original file 132 KB) | Display font for headings. An editorial, research-paper serif whose optical-size axis keeps large titles crisp. It gives the site an academic voice without imitating a LaTeX or arXiv template. |
| Atkinson Hyperlegible Next (variable font: weight 200–800) | Braille Institute / Google Fonts, SIL Open Font License 1.1. Latin subset as published in `@fontsource-variable/atkinson-hyperlegible-next` 5.3.0. | `/fonts/atkinson-hyperlegible-next-latin-var.woff2` | 34 KB | Body font, chosen for legibility. It clearly separates 0/O and 1/l/I, which matters on a page full of metrics (AUROC 0.787), arXiv IDs and dates. It also has tabular figures for the results tables. |
| Font licences | Copies of both OFL texts | `/fonts/OFL-*.txt` | 9 KB | The OFL requires the licence to travel with redistributed font files. |
| Profile photo | `source/profile_picture/profile.jpeg` (author's own; no EXIF/GPS per data.json) | `/images/profile.jpg`, `/images/profile.webp` | 15.5 KB JPEG, 5.2 KB WebP | Required by the brief. The WebP was generated locally at quality 80, with the JPEG as fallback. It is shown in the home hero, above the fold at every width, loaded eagerly with `fetchpriority="high"` (it is the mobile LCP element), and used as the Open Graph image. |
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
- **NR-02**: the thesis result is DeepSurv, C-index approximately 0.82. No per-model table.
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

1. **Trailing slashes: resolved on 2026-10-19** (author approval). Every page URL now ends with a slash; see "SEO and GEO".
2. **Hosted thesis PDF.** By your decisions NR-02 and NR-15, the site reports DeepSurv (C-index approximately 0.82), as in the abstract. The hosted PDF's Table 2 and the public README still show Cox-nnet 0.8750 as best. The PDF also keeps the supervisors' signature stamps and template placeholder text.
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
