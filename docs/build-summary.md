# Build summary: Manuel Fas portfolio

Built on 2026-10-18 from `data/data.json` (approved, revision 2). Angular 22.2.3, static prerendering, deploy target Vercel.

Revision 2026-10-18 (author review):
- Reimplementation #04 ("An Image Is Worth 16×16 Words") now shows Completed, following the author's update in data.json.
- Each project has its own prerendered page at `/projects/<slug>`, and `/projects` is now a catalog.
- Architecture figures from data.json are shown on the TRACE page (in the hero) and on reimplementations #02 and #04.

## External assets and justification

The site loads nothing from third-party servers: no CDN, web-font service, analytics, tracking or third-party script. Everything below is self-hosted from `site/public/` and served from the site's own origin.

| Asset | Source and licence | Served at | Size | Justification |
|---|---|---|---|---|
| Newsreader (variable font: weight 400–700, optical size 6–72) | Production Type / Google Fonts, SIL Open Font License 1.1. Taken from `@fontsource-variable/newsreader` 5.3.0 and subset to the 132 Latin glyphs headings use. The OFL declares no Reserved Font Name, so subsetting is permitted. | `/fonts/newsreader-latin-var.woff2` | 61 KB (original file 132 KB) | Display font for headings. An editorial, research-paper serif whose optical-size axis keeps large titles crisp. It gives the site an academic voice without imitating a LaTeX or arXiv template. |
| Atkinson Hyperlegible Next (variable font: weight 200–800) | Braille Institute / Google Fonts, SIL Open Font License 1.1. Latin subset as published in `@fontsource-variable/atkinson-hyperlegible-next` 5.3.0. | `/fonts/atkinson-hyperlegible-next-latin-var.woff2` | 34 KB | Body font, chosen for legibility. It clearly separates 0/O and 1/l/I, which matters on a page full of metrics (AUROC 0.787), arXiv IDs and dates. It also has tabular figures for the results tables. |
| Font licences | Copies of both OFL texts | `/fonts/OFL-*.txt` | 9 KB | The OFL requires the licence to travel with redistributed font files. |
| Profile photo | `source/profile_picture/profile.jpeg` (author's own; no EXIF/GPS per data.json) | `/images/profile.jpg`, `/images/profile.webp` | 15.5 KB JPEG, 5.2 KB WebP | Required by the brief. The WebP was generated locally at quality 80, with the JPEG as fallback. It is lazy-loaded below the fold and used as the Open Graph image. |
| Research PDFs | `source/papers/TRACEPAPER_Report.pdf`, `source/papers/TFG_ManuelFasRuiz.pdf` (byte-identical copies) | `/papers/TRACEPAPER_Report.pdf`, `/papers/TFG_ManuelFasRuiz.pdf` | 1.3 MB, 5.5 MB | Author decision NR-15: host both PDFs at these paths. The thesis is hosted as-is, also by author decision. |
| Employer logos (BISITE, AIR Institute, HSLU, Wembley Studios) | Logos supplied by the author (`source/logos/`, recorded in data.json `experience[].logo`) | `/images/logos/*.webp` (160 px wide) | 1–3 KB each | Shown decoratively (empty alt, `aria-hidden`) beside each role on /experience; the organization name is the link to `organization_url`. |
| Favicon | Generated for this site from the attention-mask motif | `/favicon.svg`, `/favicon.ico` | 4.7 KB | Site identity. No third-party icon. |
| TRACE architecture figure | `data/figures/trace-architecture.png`. Credit (shown under the figure): "Figure 4 of the author's TRACE report, adapted from Black et al. (2024), arXiv:2409.12972." | `/images/figures/trace-architecture.webp` (677×449) | 28 KB (PNG 88 KB) | Author request. White margins trimmed, WebP at quality 90. |
| GPT decoder-only figure (#02) | `data/figures/gpt-decoder-only.png`. Credit: "Adapted from Figure 1 of Vaswani et al. (2017), \"Attention Is All You Need\", arXiv:1706.03762." | `/images/figures/gpt-decoder-only.webp` (800×1126) | 39 KB (PNG 520 KB) | Author request. Converted from Generic RGB to sRGB, resized to 800 px wide, WebP at quality 90. |
| ViT overview figure (#04) | `data/figures/vit-overview.png`. Credit: "Figure 1 of Dosovitskiy et al. (2020), \"An Image is Worth 16x16 Words\", arXiv:2010.11929 (the repository README marks it as taken from the original paper)." | `/images/figures/vit-overview.webp` (720×531) | 40 KB (PNG 116 KB) | Author request. White margins trimmed, WebP at quality 90. |

npm packages: only Angular itself (`@angular/*` 22.2.3), `rxjs` and `tslib` at runtime. `@angular/ssr` and `@angular/platform-server` are used at build time for prerendering. There is no UI component library and no CSS framework, and Express is not installed.

**Attribution.** The three figures come from, or are adapted from, the original papers. Each is shown in a `<figure>` with the alt text from data.json and a `<figcaption>` giving the caption, then a visible "Credit:" line. Reuse rights have not been checked (NR-24, open; see Open items).

Figures are WebP only. Every current browser supports WebP, so no PNG fallback is needed. To replace a figure:
1. Export the PNG to `data/figures/`.
2. Convert it to WebP at about quality 90 and no wider than about 1,200 px, and save it as `site/public/images/figures/<same name>.webp`.
3. Run `npm run build`. The generator reads the WebP's width and height from the file itself and fails if the file is missing.

Tools I used during development but did not add to the project: fontTools and brotli for font subsetting, Pillow for image conversion, plus Playwright-core, axe-core and Lighthouse for testing. All of these ran from a temporary scratch folder.

## What was built

An English-only Angular 22 site in `site/` with nine prerendered routes:

| Route | Content (all from `data/data.json`) |
|---|---|
| `/` | Name, headline and CV summary. An "at a glance" metadata panel (current role, location, degree, interests, languages). Three featured project cards with their headline result, and a "recent activity" timeline of the eight latest milestones. The About section has the four Background.md paragraphs and the portrait. |
| `/experience` | Four roles with verbatim CV highlights, technologies and links, then technical skills and spoken languages. |
| `/projects` | Catalog: one entry per featured project with context, summary, headline result, technologies, and links to the project page, the code and the PDF. Then a link to the GitHub profile (NR-23). |
| `/projects/trace-reimplementation` | Reimplementation of clickstream event sequence analysis model TRACE. The architecture figure fills the hero's right column, then: context, report PDF, original paper, datasets, method, results table, findings, limitations, technologies, report abstract. |
| `/projects/upsa-thesis-cancer-survival` | Bachelor's thesis: context, thesis PDF, research question, data, method, results, limitations, keywords and technologies. |
| `/projects/paper-reimplementations` | All six reimplementations with their statuses (4 Completed, 2 Planned/in progress), original papers, implementation, reported results, caveats and folder links. #02 and #04 include their architecture figures. |
| `/certifications` | Twelve certificates, newest first. Eight are grouped under their two specializations. Each has a verification link, and the author's own notes sit in a collapsible "Course notes" panel. |
| `/education` | UPSA (dual B.S., degree status, Bachelor's thesis with PDF and code) and the HSLU exchange. |
| `/contact` | Email, GitHub, LinkedIn, location and languages. There is no phone number (NR-16) and no form. |

Crawl and AI-readability files in the build output: `sitemap.xml` (all nine routes), `robots.txt` (allows everything and points to the sitemap) and `llms.txt` (who Manuel Fas is, what each project and paper reimplementation does, experience, certifications, pages, contact).

## Key decisions

### Stack and rendering
- **Angular 22.2.3 (latest stable)**: standalone components, zoneless, signals, `OnPush`, plain CSS. The project was created with `ng new --routing --style css` and no Git initialisation.
- **Node 24 is required.** Angular 22 needs Node `^22.22.3 || ^24.15.0 || >=26`, but this machine's system Node is 22.14.0. I installed Node 24.22.0 LTS through the existing nvm. `site/.nvmrc` says `24` and `package.json` has `"engines": { "node": "24.x" }`, which Vercel honours.
- **Static prerendering (SSG)** follows the Angular documentation:
  - `angular.json` uses `"outputMode": "static"` and `"server": "src/main.server.ts"`.
  - `src/app/app.routes.server.ts` prerenders every route (`RenderMode.Prerender`).
  - With static output no server bundle is emitted, so no Express `server.ts` was created.
  - Each route is written to `<route>/index.html` with all content in the HTML, including `projects/<slug>/index.html` for the project pages.
  - Client hydration only takes over navigation; the pages work without JavaScript.
- **Base href `/`.** The skip link is written as `/<route>#main` so it works with `<base href="/">` and without JavaScript.

### Single source of truth and the site URL
- `site/scripts/sync-content.mjs` reads `data/data.json` and writes:
  - `src/app/content/*.json`, one trimmed file per page plus `shared.json`. Internal notes, sources and review items never reach the browser.
  - `public/sitemap.xml`, `public/robots.txt` and `public/llms.txt`.
- **The site URL lives in one place: `site.base_url` in `data/data.json`.** It is currently the placeholder `https://manuelfas.vercel.app` (NR-01). Canonical URLs, `og:url`, `og:image`, JSON-LD, the sitemap, robots.txt and llms.txt are all derived from it.
  - To change it, edit that one value and run `npm run build`.
  - In code, `absoluteUrl()` in `src/app/content/content.ts` is the only place that builds absolute URLs.
- `npm run build` runs the sync and then `ng build --configuration production`. The generated files are committed, so a plain `ng build --configuration production` also works.
- If `../data/data.json` is not visible (for example on Vercel with "include files outside the root directory" turned off), the sync prints a notice and the committed files are used.
- Every sentence the script composes from data has a check: a page description, section summary or count fails the build if data.json changes underneath it. Descriptions are also checked to stay under 160 characters.

### Project pages
- **Slugs.** data.json has no `slug` field, so each page uses the project's kebab-case `id` from data.json:
  - `trace-reimplementation`
  - `upsa-thesis-cancer-survival`
  - `paper-reimplementations`

  The generator falls back to a `slug` field if one is added later, then to a slug derived from the repository name (for example `aai-hslu-trace`). `app.routes.ts` reads the paths from the generated content, so the slugs live only in data.json.
- **Page structure.** Every project page has a breadcrumb (Home / Projects / title), one `h1` with the project title, and the project summary from data.json as the plain-text summary. Then come the headline result, actions (PDF, code, paper or dataset) and the full details. An "All projects" link closes the page.
- **Links.** The home cards, the timeline, the Experience "Project details" link and the Education thesis link all point to the project pages.
- **Navigation.** In the main nav, "Projects" is `aria-current="page"` on `/projects` and `aria-current="true"` on a project page.
- **Status summary.** "6 papers listed: 4 completed, 2 planned/in progress". Status groups with zero entries are left out, so no "0 in progress" appears.

### Architecture figures
- **TRACE.** The figure replaces the decorative attention mask in the hero's right column, as the author asked.
  - From 64rem the hero has two columns (1.3fr / 1fr), so the figure takes about 42% of it at 1280px. Below 64rem (375 and 768px) it stacks full width under the summary and buttons.
  - It is the LCP element, so it is loaded eagerly with `fetchpriority="high"` and is excluded from the load animation.
  - It is not repeated lower on the page.
- **Paper-Reimplementations.** The #02 (portrait, capped at 20rem) and #04 figures sit inside their implementation entries and are lazy-loaded. The hero keeps the decorative mask: moving the ViT figure up would either show it twice or single out one of six implementations. #01, #03, #05 and #06 have no figure and no placeholder.
- **Thesis.** Unchanged.
- **All figures.**
  - Each image links to its full-size file so the detail can be read, with "(opens the full-size image)" for screen readers.
  - Explicit `width`/`height` attributes plus `width: 100%; height: auto` prevent layout shift.
  - A white panel sits behind the white-background diagrams. The site has no dark mode.
- **JSON-LD.** The TRACE `SoftwareSourceCode` has an `image` (`ImageObject` with `url`, size, `caption` and `creditText`), built from `base_url`.

### SEO and GEO
- Each route sets its own `<title>`, meta description (137–155 characters; 143–146 on the project pages), canonical URL, Open Graph tags (`og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` with size and alt) and `twitter:card`. All of these are in the prerendered HTML.
- JSON-LD:
  - `Person` on `/`: name "Manuel Fas", `alternateName` "Manuel Fas Ruiz" (NR-17), job title, `worksFor`, `alumniOf`, `knowsAbout`, `knowsLanguage`, `sameAs` GitHub/LinkedIn.
  - An `ItemList` of the three project pages on `/projects`.
  - On each project page, its `SoftwareSourceCode` (with `codeRepository`, `isBasedOn` for the arXiv papers, and `subjectOf` for the hosted `Report` or `Thesis`) plus a `BreadcrumbList`.
- Every page and section starts with a plain-text summary.

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
- **Concept: a causal attention mask.** The recurring motif is the lower-triangular weight matrix of a decoder-only Transformer: each token can attend only to earlier tokens. The same idea shows up in:
  - the logo glyph and favicon
  - the large hero matrix and the smaller ones on inner pages
  - the timeline, drawn as a sequence of square tokens with the newest highlighted
  - the specialization course lists
- **Colour.** Deep teal "ink" (`#0f2a32`) is dominant: header, footer, headings, rules and matrix cells. One vermilion/amber signal marks the newest or most important element (the current token, latest milestone, active page, headline result). Text sits on warm paper (`#f5f2ea`).
- **Contrast.** Every text colour is at least 4.5:1, even over the darkest point of the background wash and dot grid:
  - accent `#9c370b`: 4.62 worst case, 6.33 on paper
  - muted `#44555a`: 5.09 worst case, 6.97 on paper
  - body text: 13.97 on paper
  - `#c4520f` and `#f0a23b` are used only for markers and focus rings (3.61 and 7.11, against a 3:1 requirement)
- **Layout.** Al-folio-style content-first structure with original styling:
  - a date rail on CV entries
  - thorough key/value metadata
  - numbered sections and project contents
  - result call-outs
  - Mobile-first: one column at 375px, a date rail from 768px, three cards and two-column implementations at 1280px.
- **Motion.** One staggered page-load reveal of the title block (70 ms steps, about 0.5 s total), and the hero matrix filling in row by row, as attention unrolls token by token. It is CSS only and runs only under `prefers-reduced-motion: no-preference`. With `reduce`, no animation runs and smooth scrolling is off.
- **Background.** A quiet ink radial wash plus a faint dot grid in each page head, faded out before the content. Cards and panels sit on solid paper.

### Accessibility
- **Semantics.** Banner header, nav labelled "Primary", `main`, `section`, `article` and `footer` landmarks, exactly one `h1` per page, and headings in order without skipped levels.
- **Keyboard.**
  - A skip link comes first in the tab order.
  - Focus rings are visible everywhere: 3 px, amber on ink and vermilion on paper.
  - `aria-current="page"` marks the active nav item.
  - Scrollable table regions are focusable and labelled.
- **Links and images.** Link text describes the destination; visually hidden context is added where the visible text repeats ("Verify certificate: <title>"). The portrait has alt text from data.json and the decorative SVGs are `aria-hidden`.

## Verification (production build, served statically)

| Check | Result |
|---|---|
| `ng build --configuration production` (Node 24.22.0) | Passes. 9 static routes prerendered. Initial JS+CSS 301 kB raw / 83 kB transferred; route chunks 1.8–15 kB. |
| One `h1`, heading order, title, description, canonical, OG tags per route | Pass on all nine routes (checked in the built HTML): no skipped heading levels, and titles and descriptions are unique. |
| JSON-LD | Parses on every route. Person values (35 earlier field checks) and each project's SoftwareSourceCode and BreadcrumbList are checked against data.json. |
| Links | 36 external links, all present in data.json. All internal links and `#fragment` targets resolve, and no old `/projects#…` anchors remain. |
| Leak scan | No TODO, lorem ipsum, placeholder text, `needs_review`/NR ids, `null`/`undefined` or superseded figures (0.8750, Cox Ridge, PCA, "Computer Engineering", "(edX)"). No "In progress" anywhere; the only lowercase "in progress" mentions are #05/#06 ("Planned/in progress") and the B.S. Computer Science degree. |
| Layout at 375 / 768 / 1280 px | No horizontal overflow on any of the nine routes (27 route/width combinations), including the figures; screenshots reviewed. No console errors or failed requests. |
| axe-core 4.14 (WCAG 2.0/2.1 A and AA plus best practices), 1280 and 375 px | 0 violations on all nine routes. The only "incomplete" items are contrast over the gradient backgrounds, checked by hand above. |
| Keyboard and motion | Tab order is logical and focus is visible. The skip link moves focus to `main`. Under reduced motion, 0 animations run. |
| Lighthouse 13.5 | See the next table. On the TRACE page the LCP element is the hero figure: 0.5 s on desktop, 2.5 s on mobile (the "good" threshold). CLS is at most 0.005. |

| Lighthouse 13.5 | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Mobile (7 routes without figures) | 98 | 100 | 100 | 100 |
| Mobile (`/projects/trace-reimplementation`, `/projects/paper-reimplementations`) | 97 | 100 | 100 | 100 |
| Desktop (all 9 routes) | 100 | 100 | 100 | 100 |

## How to preview locally

Prerequisite: Node 24.15+ (or 22.22.3+). With nvm, run `nvm use` inside `site/` to read `.nvmrc`. If nvm refuses because of the `prefix` setting in `~/.npmrc`, put Node 24 on the PATH for the command instead:

```sh
cd site
export PATH="$HOME/.nvm/versions/node/v24.22.0/bin:$PATH"   # only if `nvm use` is not possible
npm install

# Development server with live reload
npx ng serve --port 4300          # http://localhost:4300 (4200 is used by the static preview below)

# Production build exactly as deployed, then serve the static output
npm run build                     # sync from data/data.json + ng build --configuration production
npx serve dist/portfolio/browser -l 4200    # http://localhost:4200
```

`serve` is Vercel's own static file server. It resolves `/experience` to `experience/index.html` the way Vercel does.

## Vercel settings

| Setting | Value |
|---|---|
| Framework preset | Angular |
| Root directory | `site` |
| Install command | default (`npm install`) |
| Build command | `npm run build` (runs `scripts/sync-content.mjs`, then `ng build --configuration production`) |
| Output directory | `dist/portfolio/browser` |
| Node.js version | 24.x (taken from `package.json` `engines`) |

**I did not add `vercel.json`, because Angular routing does not need it here.**
- Every route is prerendered to `<route>/index.html`, and Vercel serves those directly for `/experience`, `/projects`, `/projects/trace-reimplementation` and so on. No rewrite or SPA fallback is needed.
- In-app navigation is handled by the hydrated Angular router.
- Unknown URLs get Vercel's standard 404, which is correct for a static site.
- I checked this behaviour locally with `serve` (Vercel's static server): all nine routes return 200, and an unknown path such as `/projects/unknown-slug` returns 404.

## Open items for the author

1. **Replace the placeholder URL (NR-01, blocks deploy).** Set `site.base_url` in `data/data.json` to the real domain, then run `npm run build`.
2. **Hosted thesis PDF.** By your decisions NR-02 and NR-15, the site reports DeepSurv (C-index approximately 0.82), as in the abstract. The hosted PDF's Table 2 and the public README still show Cox-nnet 0.8750 as best. The PDF also keeps the supervisors' signature stamps and template placeholder text.
3. **NR-20 (open).** The two specialization links come from your CV but could not be verified automatically. Please open them once in a browser.
4. **NR-10 (open).** The site lists five thesis models; the English abstract mentions six.
5. **NR-24 (open): third-party architecture figures.** The TRACE, #02 and #04 figures come from or are adapted from the original papers. They are shown with visible credit, but reuse rights were not checked. Confirm the attribution is acceptable, or supply self-made diagrams. Replacing a file in `data/figures/` and rebuilding is enough.
6. **Paper-Reimplementations README.** The site now shows #04 as Completed, but the repository README still says "In Progress" for #04 (noted in data.json `status_source`). Consider updating the README so both match.
7. **Node environment.** I installed Node 24.22.0 with nvm. Your nvm default alias (`lts/*`) now resolves to it in new terminals. To go back to the system Node, run `nvm alias default system`.
8. **Root `.gitignore`.** It used to ignore `/site` (a leftover from the Python template). You removed that line during this build; `site/` now shows as untracked and ready to commit.
9. **Optional.** Without a `vercel.json`, Vercel uses default cache headers for the hashed JS/CSS and fonts. Long-lived caching would need a `headers` entry in `vercel.json`, which CLAUDE.md allows only if routing requires it, so it was not added.
