# Session overview: where we are (updated 2026-10-19)

Read this first when you continue. `CLAUDE.md` is still the project authority; `docs/build-summary.md` has the full build details.

## Pipeline status

| Step | Status |
|---|---|
| 1. data-collector: `data/data.json` | Done. Approved by the author on 2026-10-18. |
| 2. developer: Angular site in `site/` | Built and restyled. Approved by the author on 2026-10-19. |
| 3. qa-engineer: `docs/qa-report.md` | Not started. Ready to run. |
| 4. seo-geo-reviewer | Not started. Runs after QA. |
| 5. Developer fix pass (high and medium issues), re-serve, push to deploy on GitHub Pages | Not started. |

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
- Employer logos on Experience (files supplied by the author), and every employer name links to its official site.
- Lighthouse, before the logos were added: mobile 97–98 / 100 / 100 / 100, desktop 100 in all four categories. axe-core found 0 violations. After the logos, a short check passed: build, all 9 routes return 200, and /experience has no axe or overflow issues. Lighthouse was not rerun after the logos.
- Root `README.md` documents how to run, build, and deploy the site.
- Commits on `main`:
  - `6d57cfc`: first version.
  - `1e40b98`: project pages and figures.
  - `6522a91`: logos and organization links.
- `source/` is git-ignored, because it holds the CV, which contains your phone number, and the certificate ## Done on 2026-10-19
- Deploy target switched from Vercel to **GitHub Pages user site** `https://fasmanuel2002.github.io` (workflow `.github/workflows/deploy.yml`, README "Deploy to GitHub Pages"). NR-01 resolved.
- Minimal restyle of all 9 pages, inspired by (not copied from) fabiangroeger96.github.io. The site keeps its own fonts and palette.
- Home: photo in the hero, then At a glance, then About | Recent activity side by side. Featured projects removed from home.
- Canonicals and the sitemap use trailing slashes, the favicon is an MF monogram, and `attention-mask.ts` is deleted.

## Next session: start here
1. On GitHub: rename the repo to `Fasmanuel2002.github.io`, set Settings > Pages > Source to "GitHub Actions", then update the local remote (see README).
2. Run QA (step 3) and SEO/GEO (step 4), then the developer fix pass.

ite/`.

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

## How to run and deploy
See the root `README.md`. It covers Node 24 setup, the production preview on http://localhost:4200, the dev server, editing content, and the GitHub Pages setup.

During this session, the developer installed Node 24.22.0 with nvm and made it the nvm default. To undo that, run `nvm alias default system`.
