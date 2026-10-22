# Session overview: where we are (updated 2026-10-22)

Read this first when you continue. `CLAUDE.md` is still the project authority; `docs/build-summary.md` has the full build details.

## Pipeline status

| Step | Status |
|---|---|
| 1. data-collector: `data/data.json` | Done. Approved by the author on 2026-10-18. |
| 2. developer: Angular site in `site/` | Built and restyled. Approved by the author on 2026-10-19. |
| 3. qa-engineer: `docs/qa-report.md` | Done 2026-10-22: 48 pass, 15 fail (1 high, 3 medium, 11 low), 1 skipped. |
| 4. seo-geo-reviewer | Done 2026-10-22 (section at the end of `docs/qa-report.md`): 24 pass, 9 fail (1 medium, 8 low), 3 skipped. |
| 5. Developer fix pass (high and medium issues), push to deploy on GitHub Pages | Done 2026-10-22. Low issues are listed in `docs/build-summary.md`, "Remaining issues for the author". |

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

## Done on 2026-10-21
- The site is live at https://fasmanuel2002.github.io (repo renamed, Pages source set to GitHub Actions).
- Design polish pass, approved by the author ("simple but perfect"). Details are in `docs/build-summary.md`, section "Design polish pass (2026-10-21)":
  - Header, content and footer share one frame.
  - Shorter hero lede and a larger round photo.
  - Home About shows two blocks ("Who I am", "What I do").
  - `/projects` leads with large result figures.
  - `/certifications` is grouped by specialization.
  - Dark mode with a header toggle.
  - 1200×630 share card (`site/public/images/og-card.png`).
- Checked by the developer: axe 0 violations on 9 routes × 3 widths × light/dark; Lighthouse mobile 98/100/100/100, desktop 100.
- Not committed yet. New untracked files `site/src/app/result.ts`, `site/scripts/og-card.html` and `site/public/images/og-card.png` must be committed with the rest, or the CI build fails.

## Done on 2026-10-22
- Home hero no longer shows the headline above the name, and the footer reads only "© Manuel Fas".
- "Open to international roles and relocation" (author-provided, not in `data.json`) is on Home At a glance, the Contact intro and `llms.txt`. It is a constant in `site/scripts/sync-content.mjs`.
- NR-02 reversed by the author: the thesis results follow Table 2 (page 27). Cox-nnet is best (0.8750), and the five-model table is on the thesis page.
- The Home counter now reads "4 Completed implementations". Visually hidden separators keep values apart in the raw HTML text (SEO S24).
- The author kept the CV PDF (B9) and the thesis PDF (C3) as they are.
- Do not open `file://` URLs inside `~/Desktop` with headless Chrome. It made macOS revoke Terminal's Desktop access mid-session. Render the share card from a copy outside `~/Desktop`.

## Next session: start here
1. Check the 4 LinkedIn links and the cBioPortal link by hand in a browser (automated checks are blocked).
2. Decide the low items in `docs/build-summary.md`, "Remaining issues for the author".

ite/`.

## Open decisions
- **NR-02:** resolved 2026-10-22 (Cox-nnet 0.8750, from Table 2). The hosted thesis PDF's abstract (page iii) still says DeepSurv about 0.82.
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
