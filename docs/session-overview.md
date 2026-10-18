# Session overview: where we are (2026-10-18)

Read this first when you continue. `CLAUDE.md` is still the project authority; `docs/build-summary.md` has the full build details.

## Pipeline status

| Step | Status |
|---|---|
| 1. data-collector: `data/data.json` | Done. Approved by the author on 2026-10-18. |
| 2. developer: Angular site in `site/` | Built, with your requested changes applied. **Preview not yet formally approved.** |
| 3. qa-engineer: `docs/qa-report.md` | Not started. Waits for preview approval. |
| 4. seo-geo-reviewer | Not started. Runs after QA. |
| 5. Developer fix pass (high and medium issues), re-serve, Vercel deploy steps | Not started. |

## Done this session
- `CLAUDE.md`: deploy target switched to Vercel, English only, no i18n.
- `data/data.json`: built from the CV, certifications, papers, and GitHub, with 24 `needs_review` items. Your decisions are applied.
- Site: 9 prerendered routes, consisting of Home, Experience, Education, Certifications, Contact, the `/projects` catalog, and one page per project:
  - `/projects/trace-reimplementation`
  - `/projects/upsa-thesis-cancer-survival`
  - `/projects/paper-reimplementations`
- ViT (#04) is marked Completed.
- Architecture figures added, with a visible credit line on each:
  - The TRACE diagram is in the hero's top-right slot.
  - The #02 GPT decoder and #04 ViT diagrams are inside their implementation entries.
- Lighthouse: mobile 97–98 / 100 / 100 / 100, desktop 100 across all four categories. axe-core finds 0 violations.
- Commits:
  - `6d57cfc`: first version.
  - Second commit: project pages and figures.
- `source/` is git-ignored, because it holds the CV, which contains your phone number, and the certificate scans.

## Next session: start here
1. **Company logos on Experience** (requested, not started). You want each employer's logo next to its role, in the top-right of each entry, as circled in your screenshot.
   - Employers: BISITE (University of Salamanca), AIR Institute, AAI Lab at HSLU, and Wembley Studios.
   - Easiest and safest: put official logo files (SVG or PNG) in `source/logos/`, then ask Claude to add them.
   - Otherwise, Claude must take each logo from the organization's official website and record the source in `data.json`.
2. Approve the preview, then run QA (step 3) and SEO/GEO (step 4), then the developer fix pass.
3. Before you deploy to Vercel:
   - Replace the placeholder `site.base_url` (`https://manuelfas.vercel.app`) in `data/data.json` with your real domain, then run `npm run build` in `site/`.

## Open decisions
- **NR-02 / DeepSurv:** the site says DeepSurv was best (C-index about 0.82, as in the abstract). The hosted thesis PDF (Table 2) and the GitHub README say Cox-nnet (0.8750).
- **NR-24:** the architecture figures come from the original papers. They are shown with credit, but reuse rights are unchecked.
- **Thesis PDF:** the hosted PDF's cover has signature stamps with partial ID numbers, and the document still contains template placeholder text.
- **Paper-Reimplementations README on GitHub:**
  - It still says "In Progress" for #04.
  - Its status icons and links contain small errors (NR-09).
- **Still open:**
  - NR-10: the thesis model count (five vs six).
  - NR-20: confirm the two specialization links in a browser.
  - NR-21 and NR-22: low priority.

## How to preview locally
Node 24 is required: Angular 22 needs Node ^22.22.3 or ^24.15.0. The developer installed Node 24.22.0 with nvm and set it as the nvm default.

```
cd site
npm install
npm run build
npx -y serve@14.2.6 dist/portfolio/browser -l 4200 --no-port-switching --no-clipboard
```

Then open http://localhost:4200.

## Vercel settings (do not deploy until approved)

| Setting | Value |
|---|---|
| Framework preset | Angular |
| Root directory | `site` |
| Build command | `npm run build` |
| Output directory | `dist/portfolio/browser` |
| Node | 24.x |

- Keep "Include files outside the root directory" enabled. The build reads `../data/data.json`.
- No `vercel.json` is needed, because every route is prerendered to `<route>/index.html`.
