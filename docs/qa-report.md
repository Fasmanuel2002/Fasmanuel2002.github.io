# QA report: Manuel Fas portfolio

Pipeline step 3 (qa-engineer). Run on 2026-10-22. This report lists findings only. No files in `site/` or `data/` were changed.

## What was tested

- **Build.** `site/dist/portfolio/browser` (commit `93d050e`). A fresh `ng build --configuration production` (Node 24.22.0, Angular 22.2) into a scratch folder prerendered 9 routes. Its output is byte-identical to `site/dist` except for Angular hydration IDs in `contact/index.html`, which change between builds. The live site at https://fasmanuel2002.github.io serves the same HTML, `llms.txt`, `sitemap.xml` and `robots.txt` as the local dist.
- **Server.** Python `http.server` on `http://127.0.0.1:8765`, serving `site/dist/portfolio/browser`. No `file://` URLs were opened.
- **Browser.** Google Chrome 155 (headless), driven by Playwright-core 1.64.1. axe-core 4.14.0 and Lighthouse 12.8.2 ran from the session scratchpad, not the project.
- **Coverage.** 9 routes × 3 widths (375, 768, 1280) × light and dark = 54 page loads. Also tested: JavaScript off, keyboard, the mobile menu, client-side navigation, and every external link.
- **Sources compared.** `data/data.json`, the CV (`source/cv_Manuel_final.pdf`), the public CV copy (`/cv/Manuel-Fas-CV.pdf`), both hosted PDFs, the issuers' certificate pages and the linked GitHub READMEs. Private CV data (the phone number) and the partial ID numbers in the thesis PDF are deliberately not reproduced here.

## Summary

| Result | Count |
|---|---|
| PASS | 48 |
| FAIL | 15 (1 high, 3 medium, 11 low) |
| SKIPPED | 1 |

High and medium failures:

| ID | Severity | Finding | Location |
|---|---|---|---|
| B8 | high | The headline thesis result (DeepSurv best, C-index about 0.82, the only significant stratification) contradicts both the thesis PDF that the site hosts (p. 27) and the live GitHub README (Cox-nnet best at 0.875; DeepSurv 0.803; every model except RSF significant). This is NR-02. | `/projects/`, `/projects/upsa-thesis-cancer-survival/` (hero, Results, meta and OG description), `/llms.txt` |
| B9 | medium | The downloadable CV contradicts the site on the degree name, the PCA claim (removed under NR-04), the GenAI issuer and the CS50 dates and issuer. | `/cv/Manuel-Fas-CV.pdf`, linked from the footer on every page, the home hero, `/contact/` and `llms.txt` |
| B10 | medium | "4 Papers reimplemented" is not supported as worded. #03 fine-tunes seBERT for a different task, #02 is decoder-only, and data.json has no such count. | `/` At a glance |
| C3 | medium | The hosted thesis PDF shows the supervisors' e-signature stamps, with names and partially masked national ID numbers, and contains Word-template placeholder text. | `/papers/TFG_ManuelFasRuiz.pdf` (cover, pp. 5–6) |

## Results

### A. Build

| ID | Check | Result | Severity | Location | Details |
|---|---|---|---|---|---|
| A1 | Production build and prerender | PASS | | `site/` | `ng build --configuration production` succeeds in about 8 s and prerenders 9 static routes, matching `dist/portfolio/prerendered-routes.json`. The existing dist is current: no source file is newer than it, and a fresh build differs only in hydration IDs. |

### B. Factual accuracy (site vs `data/data.json` and the CV)

229 data.json strings were checked by exact match against the prerendered text of each route. All matched except four expected cases. The HSLU highlight is split by link markup but renders correctly. The #02 and #03 internal `verification.notes` are deliberately not shown. #04's note is reworded from "It is trained" to "The model is trained".

| ID | Check | Result | Severity | Location | Details |
|---|---|---|---|---|---|
| B1 | Experience: 4 job titles, organizations, locations, dates, highlights, supervisors | PASS | | `/experience/`, `/`, `/llms.txt` | Matches data.json and the CV exactly: "Junior Machine Learning Researcher" (Sep 2026 – Present), "Machine Learning Research Intern" (Apr 2026 – Jun 2026), "Machine Learning Research Assistant" (Oct 2025 – Jan 2026), "Machine Learning & Backend Engineer" (Jul 2025 – Sep 2025). The highlights are verbatim from the CV. |
| B2 | Education: institutions, program, dates, degrees, thesis title, director and co-director | PASS | | `/education/`, `/` | Matches data.json, including the NR-12 degree names, the NR-03 cohort wording and no PCA claim (NR-04). For differences from the CV, see B9. |
| B3 | Certifications: 12 titles, issuers, dates | PASS | | `/certifications/`, `/llms.txt` | All 12 match data.json. Dates were also confirmed on the issuers' pages (see D7). |
| B4 | Specializations: titles, dates, course grouping | PASS | | `/certifications/` | Deep Learning Specialization (Feb 2026, 5 courses) and Mathematics for Machine Learning and Data Science (Mar 2025, 3 courses) match data.json and Coursera. |
| B5 | Paper and report titles | PASS | | Project pages, `/education/`, `/` | The TRACE report title matches the PDF cover exactly. The thesis title follows the NR-05 decision. All 8 original-paper titles match arXiv (all 8 arXiv pages fetched, HTTP 200, titles checked). |
| B6 | Person, skills, spoken languages, contact | PASS | | `/`, `/experience/`, `/contact/` | Skills lists are verbatim from the CV. The email, GitHub and LinkedIn links match data.json. No phone number anywhere. |
| B7 | Metadata values (titles, descriptions, OG, JSON-LD, llms.txt) match data.json | PASS | | All routes | `Person.jobTitle`, `worksFor`, `alumniOf`, `sameAs`, repository dates and paper authors all match data.json. See B15 for one wording issue. |
| B8 | Thesis headline result (NR-02) | FAIL | **high** | `/projects/` (large "0.82"); `/projects/upsa-thesis-cancer-survival/` (hero, Results, meta and OG description); `/llms.txt` (project entry and Pages list) | **Site:** "Best model: DeepSurv, C-index approximately 0.82", "DeepSurv achieved the best discriminative performance (C-index of approximately 0.82)." and "DeepSurv was the only model to produce a statistically significant risk stratification, outperforming both the linear Cox models and the Random Survival Forest." **Hosted thesis PDF p. 27** (`/papers/TFG_ManuelFasRuiz.pdf`, linked from the same page): "the Cox-nnet model achieved the highest overall accuracy (0.8750) for predicting patient risk, significantly outperforming the DeepSurv neural network (0.8032)" and "With exception of the Random Forest Model (0.1668), all models successfully stratified and classify patients into significantly distinct risk groups (p-value < 0.05)". **Live GitHub README** (UPSA_Thesis_Research, linked as "Code on GitHub"): "\| 1 \| **Cox-nnet** \| **0.875** \| 0.019 \|", "\| 2 \| DeepSurv \| 0.803 \| 0.031 \|" and "Every model *except* the Random Survival Forest separates its risk groups significantly". The site follows the thesis abstract (p. iii), as the author decided under NR-02. The thesis itself is internally inconsistent. A reader who clicks through from the page sees different numbers, so the conflict is public. |
| B9 | Downloadable CV matches the site | FAIL | medium | `/cv/Manuel-Fas-CV.pdf` (footer "Download CV" on all 9 routes, home hero, `/contact/`, `llms.txt`) | The public CV is the original with only the phone number removed, so it keeps wording the author changed in data.json. (1) **Degree.** CV: "Dual B.S., Computer Science and Business Administration of Technology Companies". Site: "Dual B.S., Business Administration for Tech Companies and Computer Science". NR-12 says this name is "used everywhere". (2) CV: "B.S. Business Administration completed May 2026". Site: "B.S. Business Administration for Tech Companies completed May 2026". (3) **Thesis.** CV: "(819 patients, 20,440 genes); benchmarked regularised Cox models, Random Survival Forest, DeepSurv and Cox-nnet with PCA preprocessing". Site: "(819 patients and 20,440 genes raw; 519 patients after preprocessing); benchmarked regularised Cox models, Random Survival Forest, DeepSurv and Cox-nnet, evaluated by …". NR-04 removed the PCA claim as unsupported. (4) CV: "Generative AI with Large Language Models — DeepLearning.AI (Coursera), Aug 2026". Site: "DeepLearning.AI and Amazon Web Services · Coursera" (NR-19). (5) CV: "CS50: Intro to AI with Python & Intro to Programming with Python — Harvard University (edX), Oct 2024". Site: "2024 … Introduction to Artificial Intelligence with Python, Harvard University" and "2023 … Introduction to Programming with Python, Harvard University" (NR-13; the certificates say 2024 and 2023). |
| B10 | Home statistic "4 Papers reimplemented" | FAIL | medium | `/` At a glance | data.json has no "papers reimplemented" count. The 4 is the number of implementations with `status: Completed`. Of those, #03 has `verification.result: "mismatch"` (it fine-tunes seBERT for a different task, and the site says so on the project page), #02 is `"partial"` (a decoder-only GPT, not the paper's encoder-decoder), and #01 covers two papers. The TRACE reimplementation is not counted. `/projects/` words the same fact as "4 completed". A label that matches the data would remove the over-claim. |
| B11 | TRACE results table precision | FAIL | low | `/projects/trace-reimplementation/` Results table | Site: "0.68" (Single-task cohort, Macro F1) and "0.62" (Multi-task Bi-LSTM, Binary F1). Report Table 2 (p. 28): "0.680" and "0.620". The values are equal, but the trailing zero is lost because data.json stores numbers. The other cells show three decimals. |
| B12 | Date format consistency | FAIL | low | `/` Recent activity; `/projects/`; both research project pages; `/education/` | "July 2026" and "January 2026" (papers' `date_display`) sit next to "Aug 2026", "Sep 2026", "Feb 2026" and so on. Each string matches data.json exactly, but the list mixes full and abbreviated months. |
| B13 | Thesis model count (NR-10, open) | FAIL | low | `/projects/upsa-thesis-cancer-survival/` Method; `/education/` thesis line; `/llms.txt` | Site: "Cox Lasso, Cox Elastic Net, Random Survival Forest, DeepSurv, Cox-nnet" (five). Hosted thesis English abstract (p. iii): "compare six survival analysis models (penalized Cox regression (Lasso, Elastic Net, and Ridge), Random Survival Forest, and two deep neural network approaches (DeepSurv and Cox-nnet))". The live README says five. |
| B14 | Degree completion vs thesis date (NR-11) | FAIL | low | `/education/`; `/` Recent activity | `/education/` says "B.S. Business Administration for Tech Companies · completed, May 2026", while the thesis for that degree shows "July 2026" (cover: "Salamanca, Julio de 2026"). On Home, the thesis (July 2026) is listed above "Degree completed" (May 2026). This follows author decision NR-11 (use the CV date), but readers can see the order. |
| B15 | JSON-LD `isBasedOn` for Paper-Reimplementations | FAIL | low | `/projects/paper-reimplementations/` JSON-LD | `SoftwareSourceCode.isBasedOn` lists all six papers. #05 (no model code) and #06 (no folder) are not implemented yet. |
| B16 | "Open to international roles and relocation" (single source) | FAIL | low | `/` At a glance; `/contact/` intro; `/llms.txt` | Approved by the author on 2026-10-22 and recorded in `docs/build-summary.md`, so it is not an invented fact. It is a constant in `site/scripts/sync-content.mjs` and not in data.json, which deviates from the single-source rule. |

### C. Thesis and papers

| ID | Check | Result | Severity | Location | Details |
|---|---|---|---|---|---|
| C1 | No full PDF text in HTML pages | PASS | | All routes, `/llms.txt` | 12-word shingle comparison against both PDFs. `/projects/trace-reimplementation/` shares about 130 words with the report: its abstract, shown as "Report abstract" and stored in data.json. `/projects/upsa-thesis-cancer-survival/` shares about 22 words with the thesis (one abstract sentence). No other overlap. |
| C2 | Full PDFs are published | FAIL | low | `/papers/TRACEPAPER_Report.pdf` (36 pp), `/papers/TFG_ManuelFasRuiz.pdf` (39 pp) | Byte-identical copies of `source/papers/`, linked from the project pages, `/projects/`, `/education/` and `llms.txt`. The QA rule allows only summaries. The author approved hosting both under NR-15, so this is recorded as low. |
| C3 | Content of the hosted thesis PDF | FAIL | medium | `/papers/TFG_ManuelFasRuiz.pdf` | (1) The cover has two electronic-signature stamps with the supervisors' full legal names and partially masked national ID numbers (not reproduced here), plus handwritten signatures. (2) p. 5 has template text: "Estructura prevista de la memoria. El índice definitivo se generará automáticamente en Word con la opción Tabla de contenido una vez completada la memoria…". (3) p. 6: "Figuras previstas para la memoria. El índice definitivo se generará con la opción Insertar título y Tabla de ilustraciones de Word." The index of tables also labels two tables "Figure 5" and "Figure 6". (4) Results conflict with the site (B8). NR-15 hosts the file "as-is", but third-party ID data on a public portfolio needs explicit re-confirmation, or a redacted copy. |
| C4 | NR-21 report inconsistencies kept off the site | PASS | | `/projects/trace-reimplementation/` | The page does not quote the conflicting session counts, the ATC rate, the attention-head count or the "Swiss retail company" claim. They remain inside the hosted report PDF (see the NR table). |

### D. Links

| ID | Check | Result | Severity | Location | Details |
|---|---|---|---|---|---|
| D1 | Internal routes | PASS | | All nav, breadcrumb, footer and in-page links | All 9 routes plus `/404.html` return 200. 73 unique hrefs in total. |
| D2 | In-page anchors | PASS | | `#main`, `/experience/#exp-*`, `/education/#edu-upsa`, `/certifications/#spec-deep-learning`, `/certifications/#cert-genai-llm` | Every fragment has a matching `id` on its target page. |
| D3 | Images, fonts, PDFs, CSS, JS | PASS | | All routes | 28 local assets return 200 with correct content types: profile JPG/WebP, 4 logos, 3 figures, 2 fonts, 3 PDFs, favicons, CSS and JS. |
| D4 | Absolute site URLs (canonical, OG, JSON-LD, sitemap, llms.txt) | PASS | | All routes | All 20 unique `https://fasmanuel2002.github.io/…` URLs map to existing files, including `og-card.png` (1200×630). |
| D5 | External links respond | PASS | | See the external link table | 38 unique external URLs, all present in data.json. 33 return HTTP 200 (with a browser user agent). `bisite.usal.es` redirects to `/es` (Spanish home page). |
| D6 | LinkedIn and cBioPortal links | SKIPPED | | `/contact/`, footer (author LinkedIn); `/experience/` (3 supervisor LinkedIn profiles); `/projects/upsa-thesis-cancer-survival/` (cBioPortal) | Not verifiable automatically. LinkedIn returns 999 or a reCAPTCHA page to scripts, and cBioPortal returns 403 (Cloudflare challenge). Check these by hand in a browser. |
| D7 | Certificate links show the right certificate | PASS | | `/certifications/` | In headless Chrome, all 10 Coursera course links show "Course Certificate <title> Completed by Manuel Fas <date>", with dates matching the site. The GenAI and Deep Learning Specialization links (CV URL formats `/certificate/` and `/specialization/certificate/`) open Coursera's record viewer with the certificate PDF; the matching public pages confirm Aug 4, 2026 and Feb 24, 2026. Mathematics specialization: Mar 22, 2025. Both CS50 PDFs name "Manuel Fas Ruiz", awarded 2024 (AI) and 2023 (Python). |
| D8 | Live GitHub Pages behaviour | PASS | | https://fasmanuel2002.github.io | `/experience` and other paths without a trailing slash return 301 to the slash URL. Unknown paths return 404 with the site's "Page not found" page. PDFs, CV and `llms.txt` return 200. |
| D9 | External link hygiene | PASS | | All routes | Every external URL comes from data.json. No `target="_blank"` link lacks `rel="noopener"`. |

### E. Mobile and responsive layout

| ID | Check | Result | Severity | Location | Details |
|---|---|---|---|---|---|
| E1 | 375 px: no horizontal overflow | PASS | | All 9 routes, light and dark | `scrollWidth` equals the viewport width on every route, including with every `<details>` (course notes, figures) opened. No element extends past the viewport. |
| E2 | 375 px: overlap and readability (visual review) | PASS | | All 9 routes | Reviewed full-page screenshots taken with reduced motion. No overlapping elements or clipped text. Tables fit (TRACE table at 375 px is tight but readable). The architecture diagrams are small at 375 px but link to the full-size image. The automated overlap hits were inline wrapping or collapsed `<details>` content, not real overlaps. |
| E3 | 375 px: minimum text size | FAIL | low | `/projects/trace-reimplementation/` and `/projects/paper-reimplementations/` results table headers | At 375 px the uppercase table headers ("MODEL", "AUROC", "BINARY F1", …) render at 10.88 px, below the 12 px heuristic. Legible in the screenshots, and axe reports no issue. |
| E4 | 768 px spot check | PASS | | All 9 routes | No overflow and the layout is intact (desktop nav, two-column experience entries). |
| E5 | 1280 px spot check | PASS | | All 9 routes | No overflow. Home hero, At a glance band and About and Recent activity columns render correctly. |
| E6 | Mobile menu | PASS | | Header at 375 px | The menu button sets `aria-expanded="true"`, the menu closes on Escape and after navigating, and all 5 links work. |

Note: in full-page screenshots with motion enabled, content below the fold looks blank. That is the `.scroll-reveal` effect, which keeps elements at opacity 0 until they scroll into view. After scrolling through each page, no element in `main` remained at opacity 0. With `prefers-reduced-motion: reduce` the effect is off.

### F. Prerendered content

| ID | Check | Result | Severity | Location | Details |
|---|---|---|---|---|---|
| F1 | Main text present in built HTML | PASS | | All 9 `index.html` files | Each file contains its h1, intro summary and full body text: names, dates, titles, metrics and certificate list. |
| F2 | Text without JavaScript equals text with JavaScript | PASS | | All 9 routes | The `main` innerText with JavaScript off matches JavaScript on for 8 routes. On `/`, the only difference is the "Certifications" counter caught mid-animation ("11"). It settles at "12" within 300 ms and does not animate under reduced motion. |

### G. Console errors and network

| ID | Check | Result | Severity | Location | Details |
|---|---|---|---|---|---|
| G1 | JavaScript errors and console errors or warnings | PASS | | 54 page loads plus navigation runs | 0 `pageerror`, 0 console errors and 0 warnings, including no Angular hydration warnings. |
| G2 | Failed requests and HTTP ≥ 400 | PASS | | 54 page loads | 0 failed requests and 0 error responses. |
| G3 | Third-party requests | PASS | | All 9 routes | Every request (91) went to the site's own origin. |
| G4 | Client-side navigation | PASS | | Header nav at 1280 and 375 px; project links | Each route updates the URL, title, h1, canonical and meta description with no errors. |

### H. Content leaks

| ID | Check | Result | Severity | Location | Details |
|---|---|---|---|---|---|
| H1 | Placeholder text, lorem ipsum, TODO, `needs_review` or NR IDs | PASS | | All HTML, TXT, XML, CSS and JS in dist | No matches in site content. The only "Placeholder" hits are Angular framework internals and `urlIsPlaceholder:!1` in the bundled config. The only HTML comment is the theme-script comment. For template text inside the hosted thesis PDF, see C3. |
| H2 | Private data | PASS | | All routes; `/cv/Manuel-Fas-CV.pdf` | No phone number in any page, in the public CV text, or in its link annotations (no `tel:` link). |
| H3 | Certificate "Course notes" wording | FAIL | low | `/certifications/` | These notes are verbatim author text from `source/certifications.md`, so they are an author call. Five notes end without a period: Sequence Models, Neural Networks and Deep Learning, Probability & Statistics, Linear Algebra and CS50 AI. Linear Algebra is in the present tense ("I am learning…") although the course was completed in Dec 2024. "It was an amazing course" is informal for recruiters. The site also mixes British and American spelling ("specialising", "modelling", "tumour" vs "initialized", "optimizing"), from verbatim sources. |

### I. CLAUDE.md technical requirements

| ID | Check | Result | Severity | Location | Details |
|---|---|---|---|---|---|
| I1 | Semantic HTML landmarks | PASS | | All routes | `header`, `nav`, `main` and `footer` on every route. `section` and `article` are used for content blocks. |
| I2 | Exactly one h1 and logical heading order | PASS | | All routes | One h1 per route, and no skipped levels (h1 → h2 → h3). |
| I3 | `lang="en"`, no i18n | PASS | | All routes, `404.html` | |
| I4 | Text contrast ≥ 4.5:1 | PASS | | All routes, light and dark, 375 and 1280 px | axe `color-contrast`: 0 violations. axe overall (WCAG 2.1 A/AA plus best practice): 0 violations on 36 runs. |
| I5 | Visible focus and keyboard navigation | PASS | | `/` (25 tab stops), `/experience/` | Every stop shows a 3 px solid outline. The skip link is first, and Enter moves focus to `main#main`. The theme toggle is reachable and its label updates. |
| I6 | Alt text | PASS | | All images | The portrait and the 3 figures have descriptive alt text. The 4 employer logos use `alt=""` and are decorative (the organization name is the adjacent link). |
| I7 | Form labels | PASS | | | No form fields on the site. |
| I8 | `prefers-reduced-motion` | PASS | | CSS and JS | Animations are gated by `(prefers-reduced-motion: no-preference)`. The scroll-reveal and the counters are skipped under `reduce`. |
| I9 | Unique title and description ≤ 160 characters | PASS | | All routes | 9 unique titles. Descriptions are 137–155 characters. `404.html` has none but is `noindex`. |
| I10 | Canonical and Open Graph per route | PASS | | All routes | The canonical is the trailing-slash URL. `og:title`, `og:description`, `og:url`, `og:image` (1200×630) and the Twitter card are present. |
| I11 | `sitemap.xml` and `robots.txt` | PASS | | `/sitemap.xml`, `/robots.txt` | The sitemap lists all 9 public routes. `robots.txt` allows all and points to the sitemap. |
| I12 | JSON-LD parses and has the right types | PASS | | `/` `Person`; 3 project pages `SoftwareSourceCode` and `BreadcrumbList`; `/projects/` `ItemList` | All blocks parse. Values match data.json (see B15 for one item). |
| I13 | `llms.txt` | PASS | | `/llms.txt` | Summarizes the person, every project and every certification with links. Includes the B8 and B16 content. |
| I14 | GEO: every section begins with a plain-text summary | FAIL | low | `/projects/trace-reimplementation/` (Overview, Datasets, Method, Results, Limitations); `/projects/upsa-thesis-cancer-survival/` (Data, Method, Results, Limitations); `/projects/paper-reimplementations/` (Implementations); `/` (At a glance) | These sections start with a list, table or definition list rather than a summary sentence. Page-level intros exist on every route. The SEO/GEO reviewer should confirm. |
| I15 | Lighthouse ≥ 90 in all four categories | PASS | | Live site, all 9 routes | Mobile on the live site: performance 93–100, accessibility, best practices and SEO all 100. Desktop (home, `/projects/`): 100 in all four. The local Python server gave mobile performance 83–88 because it does not gzip (`uses-text-compression`); GitHub Pages does. |
| I16 | Lazy-loaded images below the fold | PASS | | `/experience/`, `/projects/paper-reimplementations/` | The portrait is eager (it is the LCP image). Below-fold logos and the #02 and #04 figures use `loading="lazy"`. |
| I17 | External assets listed and justified; no third-party scripts | PASS | | `docs/build-summary.md` | Two self-hosted OFL fonts, the photo, the share card, PDFs, logos, the favicon and the figures are all listed. There are no CDN, analytics or third-party requests (G3). |
| I18 | Essential CSS not loaded late | PASS | | All routes | About 13 KB of critical CSS is inlined in each HTML file. The full stylesheet loads non-blocking, with a `noscript` fallback. |

### J. Open author decisions (as shown on the site today)

| NR | Status in data.json | How it shows on the site | Severity |
|---|---|---|---|
| NR-02 | resolved by the author, but listed as open in `docs/session-overview.md` | DeepSurv shown as best (C-index about 0.82), large on `/projects/` and the thesis page and in meta, OG and llms.txt. The hosted thesis PDF p. 27 and the live README say Cox-nnet 0.875 / DeepSurv 0.803. See B8. | **high** (B8) |
| NR-10 | open | Five models listed. The hosted thesis abstract says six, including Ridge. See B13. | low (B13) |
| NR-20 | open | Both specialization links on `/certifications/` work and show Manuel Fas's certificates (Deep Learning, Feb 24, 2026; Mathematics for ML and DS, Mar 22, 2025). No site defect; the author can close the item. | none (D7 PASS) |
| NR-21 | open | Not visible in the site's HTML (C4). The inconsistent figures and the "Swiss retail company" line remain inside the hosted `/papers/TRACEPAPER_Report.pdf`, which is linked from the TRACE page, `/projects/` and `llms.txt`. | low (inside the PDF only; not counted as a separate failure) |
| NR-22 | open | No site impact. It concerns file paths in `source/certifications.md`. | none |
| NR-24 | open | Three third-party architecture figures are shown with visible credit lines: TRACE (Black et al. 2024) on `/projects/trace-reimplementation/` and in its JSON-LD `image`; the Vaswani et al. 2017 decoder figure (#02) and the Dosovitskiy et al. 2020 ViT figure (#04) on `/projects/paper-reimplementations/`. Reuse rights are still unchecked. | low (J1) |

| ID | Check | Result | Severity | Location | Details |
|---|---|---|---|---|---|
| J1 | Third-party figures (NR-24) | FAIL | low | `/projects/trace-reimplementation/`, `/projects/paper-reimplementations/` | Credited, but reuse permission is unconfirmed. |

## External link status

The status codes were taken with curl using a desktop Chrome user agent. Certificate contents were checked in headless Chrome (D7).

| URL | Status | Note |
|---|---|---|
| https://github.com/Fasmanuel2002 | 200 | |
| https://github.com/Fasmanuel2002/AAI_HSLU_TRACE | 200 | |
| https://github.com/Fasmanuel2002/UPSA_Thesis_Research | 200 | The README reports Cox-nnet as best (B8) |
| https://github.com/Fasmanuel2002/Paper-Reimplementations | 200 | The README now shows #04 as Completed, matching the site |
| …/Paper-Reimplementations/tree/main/01_… to 05_… (5 folders) | 200 | |
| https://github.com/otto-de/recsys-dataset | 200 | |
| https://arxiv.org/abs/ 2409.12972, 1409.3215, 1409.0473, 1706.03762, 2205.01335, 2010.11929, 2106.11959, 2101.03961 | 200 | Titles match the site |
| https://bisite.usal.es | 200 | Redirects to `/es` |
| https://air-institute.com/en | 200 | |
| https://www.hslu.ch/en/ | 200 | |
| https://wembleystudios.com/ | 200 | |
| 10 × https://www.coursera.org/account/accomplishments/verify/… | 200 | Each shows the right course, Manuel Fas and the date |
| https://www.coursera.org/account/accomplishments/certificate/6NA3EOD4W4GZ | 200 | Record viewer; certificate confirmed Aug 4, 2026 |
| https://www.coursera.org/account/accomplishments/specialization/certificate/00RDBED98XWU | 200 | Record viewer showing the Deep Learning certificate PDF |
| https://www.coursera.org/account/accomplishments/specialization/PMIMWEI2Q8ZK | 200 | Mathematics for ML and DS, Mar 22, 2025 |
| 2 × https://certificates.cs50.io/….pdf?size=letter | 200 | Manuel Fas Ruiz; 2024 (AI), 2023 (Python) |
| https://linkedin.com/in/manuel-fas-48b2b9257 | 200 (reCAPTCHA) | Not verifiable automatically (D6) |
| https://www.linkedin.com/in/jan-svoboda-8946a615b/ | 999 | Not verifiable automatically (D6) |
| https://www.linkedin.com/in/stephanynievesuribe/ | 999 | Not verifiable automatically (D6) |
| https://www.linkedin.com/in/ernestofc/ | 999 | Not verifiable automatically (D6) |
| https://www.cbioportal.org/study/summary?id=brca_tcga_pub2015 | 403 | Cloudflare challenge; not verifiable automatically (D6) |

## Lighthouse (mobile, live site)

| Route | Performance | Accessibility | Best practices | SEO | LCP |
|---|---|---|---|---|---|
| `/` | 98 | 100 | 100 | 100 | 2.1 s |
| `/experience/` | 97 | 100 | 100 | 100 | 2.1 s |
| `/projects/` | 99 | 100 | 100 | 100 | 1.9 s |
| `/projects/trace-reimplementation/` | 93 | 100 | 100 | 100 | 2.3 s |
| `/projects/upsa-thesis-cancer-survival/` | 96 | 100 | 100 | 100 | 2.1 s |
| `/projects/paper-reimplementations/` | 99 | 100 | 100 | 100 | 2.0 s |
| `/certifications/` | 100 | 100 | 100 | 100 | 1.4 s |
| `/education/` | 98 | 100 | 100 | 100 | 2.0 s |
| `/contact/` | 96 | 100 | 100 | 100 | 2.0 s |

## Not covered

- Manual verification of the LinkedIn and cBioPortal links (D6).
- Real devices, Safari and Firefox, and screen-reader testing. Only Chrome was used.
- Desktop Lighthouse on routes other than `/` and `/projects/`.

# SEO and GEO

Pipeline step 4 (seo-geo-reviewer). Run on 2026-10-22 against the same build as the QA section (`site/dist/portfolio/browser`, commit `93d050e`). Findings only: no file in `site/` or `data/` was changed. This section does not repeat QA findings. Where a QA finding also affects search or AI answers, it is listed under "Related QA findings" and not counted again. These results describe what the checks show; they make no claim about rankings.

## What was tested

- **Build HTML.** The 9 prerendered `index.html` files, `404.html`, `index.csr.html`, `sitemap.xml`, `robots.txt` and `llms.txt`, parsed with Python (head tags, headings, JSON-LD, images, links and main text).
- **Live site.** https://fasmanuel2002.github.io, with response headers checked by curl. All 9 routes and `llms.txt` match the local build; the only difference is Angular hydration IDs in `ng-state` on 5 routes.
- **Browser.** Headless Chrome 155 with Playwright-core, against the live URL (no `file://`). Compared `innerText` with `textContent`, with JavaScript on and off, and checked JSON-LD after client-side navigation.
- **Validators.** JSON-LD was parsed with Python `json` and checked with the schema.org validator (validator.schema.org, rendered mode) on all 5 routes that carry JSON-LD. Lighthouse 12.8.2 (mobile, SEO and performance categories) ran on all 9 live routes.
- **Sources compared.** `data/data.json`, `CLAUDE.md`, the GitHub API (profile and the `Fasmanuel2002.github.io` repository) and the GitHub profile README.
- **Author decisions respected.** "Open to international roles and relocation" appears only in Home At a glance, the Contact intro and `llms.txt`, and the hero and footer have no headline. Neither is flagged.

## Summary

| Result | Count |
|---|---|
| PASS | 24 |
| FAIL | 9 (0 high, 1 medium, 8 low) |
| SKIPPED | 3 |

High and medium failures:

| ID | Severity | Finding | Location |
|---|---|---|---|
| S24 | medium | In the raw HTML, adjacent `<span>` values have no whitespace between them. Crawlers that read HTML text without CSS (`textContent`-style extraction, typical of AI crawlers that do not render) read "C-index approximately 0.82819 patients raw" and "0.696 AUPRCTRACE (multi-task)". | `/projects/`, `/projects/upsa-thesis-cancer-survival/`, `/projects/trace-reimplementation/`, `/projects/paper-reimplementations/` (result line); `/` (At a glance, Recent activity). Templates: `site/src/app/result.ts`, `site/src/app/pages/home/home.html` |

## Results

### S-A. Metadata

| ID | Check | Result | Severity | Location | Finding and suggested fix |
|---|---|---|---|---|---|
| S1 | Unique `<title>` per route | PASS | | All 9 routes, `404.html` | 10 unique titles. Each inner page uses the pattern "<page> — Manuel Fas". |
| S2 | Unique meta description, under 160 characters | PASS | | All 9 routes | 9 unique descriptions, 137–155 characters. For the thesis description, see QA B8 under "Related QA findings". |
| S3 | Title length in search results | FAIL | low | `/projects/upsa-thesis-cancer-survival/` (102 characters), `/projects/trace-reimplementation/` (80 characters); generated by `site/scripts/sync-content.mjs` | Search result titles are usually cut at about 55–60 characters, so " — Manuel Fas" is hidden on these two routes and the result does not show who the author is. **Fix:** keep the full title in the h1, and use a shorter `<title>`/`og:title` built from data.json wording, for example the repository README title "Breast Cancer Survival Analysis — Classical vs. Deep Survival Models" (`projects.featured[1].repository.readme_title`) or "TRACE reimplementation", followed by " — Manuel Fas". |
| S4 | Canonical URL | PASS | | All 9 routes | Absolute, self-referencing, with a trailing slash. Matches `og:url` and the sitemap. `/projects` returns 301 to `/projects/`, and `/index.html` carries the `/` canonical. |
| S5 | Open Graph and Twitter tags | PASS | | All 9 routes | `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` (1200×630, 100 KB, HTTP 200) with `og:image:alt`, and `twitter:card=summary_large_image`. Optional: `og:type` is `website` everywhere. `profile` on `/` and `article` on project pages would describe the pages more precisely. |
| S6 | Share card content | PASS | | `/images/og-card.png` | Shows "Manuel Fas", "Machine learning researcher and engineer", "Salamanca, Spain" and the site URL. All match data.json, and the same text is in the OG tags, so nothing is image-only. |

### S-B. Headings

| ID | Check | Result | Severity | Location | Finding and suggested fix |
|---|---|---|---|---|---|
| S7 | Exactly one h1 per route, naming the page subject | PASS | | All 9 routes | `/` h1 is "Manuel Fas". Project h1s are the full project titles. Confirms QA I2. |
| S8 | Logical heading order | PASS | | All 9 routes | h1 → h2 → h3 with no skipped levels. On `/certifications/`, the specialization names are h2 and the courses are h3. |

### S-C. Structured data (JSON-LD)

| ID | Check | Result | Severity | Location | Finding and suggested fix |
|---|---|---|---|---|---|
| S9 | JSON-LD parses and validates | PASS | | `/`, `/projects/`, 3 project pages | All 5 blocks parse with `json.loads`. The schema.org validator reports 0 errors and 0 warnings on all 5 routes. There is no microdata, so there is nothing to conflict with the JSON-LD. |
| S10 | `Person` on home matches data.json | PASS | | `/` | `name` "Manuel Fas", `alternateName` "Manuel Fas Ruiz" (NR-17), `jobTitle` "Junior Machine Learning Researcher", `worksFor` BISITE with `https://bisite.usal.es`, `alumniOf` UPSA and HSLU, `address` Salamanca, Spain, `email`, `image` (`profile.jpg`, 400×400), `description` (verbatim CV summary), `knowsAbout` (`person.interests` plus `skills.methods`, without the duplicate "computer vision"), `knowsLanguage` Spanish and English, and `sameAs` GitHub and LinkedIn. All match data.json. |
| S11 | `SoftwareSourceCode` on project pages matches data.json | PASS | | 3 project pages | `name`, `description`, `codeRepository`, `dateCreated` (2025-11-05, 2026-02-04, 2026-09-06), `keywords` (the technologies) and the `isBasedOn` papers and authors all match. The `author` `@id` points to the home `Person`. `Thesis` and `Report` are attached through `subjectOf`, and every page has a `BreadcrumbList`. Note: `Thesis.author.name` is "Manuel Fas", whereas `papers[1].authors` is "Manuel Fas Ruiz". It is the same `@id`, so it is not counted. For #05 and #06 in `isBasedOn`, see QA B15. |
| S12 | `SoftwareSourceCode` license | FAIL | low | `/projects/trace-reimplementation/` JSON-LD; `site/scripts/sync-content.mjs` | data.json has `repository.license: "MIT"` for AAI_HSLU_TRACE, but the JSON-LD has no `license`. **Fix:** add `"license": "https://opensource.org/licenses/MIT"` to the TRACE block only. The other two repositories have `license: null`, so leave theirs out. |
| S13 | Thesis findable by its original Spanish title | FAIL | low | `/projects/upsa-thesis-cancer-survival/` (HTML and JSON-LD) | The cover title "Aplicación de métodos de Inteligencia Artificial y Aprendizaje Profundo (Deep Learning) al análisis de datos genómicos y transcriptómicos en cáncer" (`title_original`) does not appear anywhere on the site, so a search for the catalogued Spanish title cannot reach the page. **Fix:** add it as `alternateName` (with `inLanguage: "es"`) on the `Thesis` node, and show it once on the page as "Original title (Spanish): …". The site stays English-only; this is a single citation line, not translation. |
| S14 | Page-type and entity markup | FAIL | low | `/` JSON-LD; `/certifications/`, `/experience/`, `/education/`, `/contact/` (no JSON-LD) | There is no `WebSite` node, which Google uses for the site name shown in results, and no `ProfilePage` wrapper, which marks `/` as the page about this person. Past roles and the 12 certificates are not machine-readable. **Fix:** on `/`, add `{"@type":"ProfilePage","mainEntity":{"@id":"…/#person"}}` and `{"@type":"WebSite","name":"Manuel Fas","url":"https://fasmanuel2002.github.io/"}`. Optionally add `hasCredential` (`EducationalOccupationalCredential`, from `certifications[]`) to the Person. Use data.json values only. |
| S15 | JSON-LD after client-side navigation | PASS | | `/` → `/projects/` via the header | The rendered DOM keeps exactly one JSON-LD block per route, and it is replaced on navigation, so the home `Person` does not linger on `/projects/`. |

### S-D. Crawl files and indexing

| ID | Check | Result | Severity | Location | Finding and suggested fix |
|---|---|---|---|---|---|
| S16 | `sitemap.xml` | PASS | | `/sitemap.xml` | Lists all 9 public routes, matching `prerendered-routes.json`. Every `<loc>` uses `https://fasmanuel2002.github.io` with a trailing slash and equals the page canonical. Served as `application/xml`. Optional: no `<lastmod>`. |
| S17 | `robots.txt` | PASS | | `/robots.txt` | `User-agent: *` / `Allow: /` with a `Sitemap:` line pointing to the right URL. No AI crawler is blocked. |
| S18 | HTTPS, redirects and error status | PASS | | Live site | `http://` returns 301 to `https://`. Paths without a trailing slash return 301 to the slash URL. Unknown paths return a real 404 with `404.html` (`noindex`). HTML and text are served gzipped as UTF-8. |
| S19 | Stray crawlable shell page | FAIL | low | `https://fasmanuel2002.github.io/index.csr.html` (200) | The Angular client-only shell is deployed and publicly reachable. Its title is "Manuel Fas", it has an empty `<app-root>`, and it has no description, canonical or `noindex`. It is not linked or in the sitemap, so the risk is low, but if discovered it is a thin duplicate of the home page. **Fix:** add `Disallow: /index.csr.html` to the robots.txt generated by `site/scripts/sync-content.mjs`, or have the deploy workflow leave the file out of the published folder (removing files needs the author's approval). |
| S20 | Live site equals the local build | PASS | | All 9 routes, `llms.txt` | Byte-identical except for Angular hydration IDs (`ng-state`) on 5 routes. |

### S-E. llms.txt

| ID | Check | Result | Severity | Location | Finding and suggested fix |
|---|---|---|---|---|---|
| S21 | `llms.txt` at the site root | PASS | | `/llms.txt` (8.9 KB, `text/plain; charset=utf-8`) | Follows the llms.txt layout: H1 name, a blockquote summary (the verbatim CV summary), key facts, then Projects (what each project does, with its result, code and PDF links, plus all 6 papers with status), Experience, Certifications, Pages (every route with its description) and Contact. Uses absolute URLs, and the facts match data.json. Optional: Experience lists only title, organization and dates; one highlight per role from data.json would let AI answers say what he did in each role. For the thesis result in this file, see QA B8. |

### S-F. GEO: readability without JavaScript

| ID | Check | Result | Severity | Location | Finding and suggested fix |
|---|---|---|---|---|---|
| S22 | Key facts in the prerendered HTML | PASS | | All 9 routes | Confirms QA F1 and F2. The built HTML contains all 4 roles (titles, organizations, locations, dates, highlights and supervisors), all 3 projects (with data, method, results and limitations), all 12 certificates (with issuer and date), both specializations, education, skills and contact details. The page `innerText` with JavaScript off matches JavaScript on. |
| S23 | No key fact only in images or the JS bundle | PASS | | All routes | The share card text is repeated in the OG tags. The 3 architecture figures have descriptive alt text and visible captions, and their content is also described in text. Employer logos are decorative, with the organization name in text. Course notes sit in `<details>` but are present in the HTML. |
| S24 | Raw HTML text keeps values separate | FAIL | **medium** | `/projects/` and the 3 project pages (`app-result` line); `/` At a glance (`.stats__num` + `.stats__label`, `dd .sub`) and Recent activity (`.kind` + organization). Templates: `site/src/app/result.ts` (lines 16–21), `site/src/app/pages/home/home.html` (about lines 54 and 128) | Adjacent `<span>`s have no whitespace or punctuation between them. CSS makes them look separate in a browser (`innerText` is correct), but `textContent`, which is what CSS-unaware extractors produce, reads: "Best model: DeepSurv, C-index approximately **0.82819** patients raw, 519 after preprocessing"; "0.787 AUROC · 0.696 **AUPRCTRACE** (multi-task)…"; "6 papers **listed4** completed…"; "**4Roles**", "**12Certifications**"; "Junior Machine Learning **ResearcherBISITE** Research Group (University of Salamanca)**Sep 2026** – Present"; "**RoleBISITE** Research Group…". The first one turns a headline metric into a different number. Verified with JavaScript on and off on the live site. **Fix:** add a text separator between the spans in the templates, such as a space, ". " or " · ", or a visually hidden separator. Alternatively, make the note its own block element (`<p>`/`<div>`). Then check that `textContent` reads "0.82. 819 patients raw…" (or similar) on each route. |
| S25 | Each section begins with a plain-text summary | FAIL | low | `/` At a glance; `/projects/trace-reimplementation/` (Overview, Datasets, Method, Results, Limitations); `/projects/upsa-thesis-cancer-survival/` (Data, Method, Results, Limitations); `/projects/paper-reimplementations/` (Implementations); `/contact/` (Contact details) | Confirms QA I14 and adds `/contact/` Contact details. These h2 sections open with a list, definition list, table or article instead of a sentence. All `/certifications/` sections and the Home About and Recent activity sections do open with a summary. **Fix:** add a one-sentence lede after each listed h2, built from data.json facts, for example "Three public e-commerce datasets were assessed; OTTO was used for training and evaluation." |
| S26 | Page lead sentence states what the page is about | FAIL | low | `/projects/upsa-thesis-cancer-survival/` (first paragraph under the h1; also the JSON-LD `description` and the `/projects/` card) | The lead "Application of AI and deep learning methods to genomic and transcriptomic data analysis in cancer." repeats the h1 and gives no information that an answer engine could quote: no breast cancer, TCGA, survival models or cohort size. The meta description is specific; the lead is not. **Fix:** use a lead built from data.json facts, for example "Survival modelling on TCGA breast cancer RNA-seq data (819 patients raw, 519 after preprocessing), comparing Cox Lasso, Cox Elastic Net, Random Survival Forest, DeepSurv and Cox-nnet." (keep it consistent with the NR-02 and NR-10 decisions). |
| S27 | Name and entity consistency | PASS | | All routes, JSON-LD, `llms.txt` | "Manuel Fas" is the primary name everywhere. "Manuel Fas Ruiz" is the `alternateName` and appears in About ("I'm Manuel Fas Ruiz…") and `llms.txt`, which links the legal name used on the thesis PDF and CS50 certificates to the site. Organization names are identical across pages, meta, JSON-LD and `llms.txt`. |
| S28 | GitHub profile links back to the site | FAIL | low | GitHub profile `Fasmanuel2002` (outside `site/`; author action) | `sameAs` points to GitHub, but the GitHub profile's website field (`blog`) is empty and the profile README (`Fasmanuel2002/Fasmanuel2002`) has no link to `fasmanuel2002.github.io`. Only the `Fasmanuel2002.github.io` repository's homepage field links to the site. Two-way links help search engines and answer engines confirm that the profile and the site are the same person. **Fix (author):** set the GitHub profile website to `https://fasmanuel2002.github.io` and add the link to the profile README. |

### S-G. Images and links

| ID | Check | Result | Severity | Location | Finding and suggested fix |
|---|---|---|---|---|---|
| S29 | Alt text on meaningful images | PASS | | All routes | Confirms QA I6. The portrait has "Portrait of Manuel Fas". The 3 figures have long descriptive alt text plus captions. The 4 logos use `alt=""` next to linked organization names. |
| S30 | Descriptive link text | PASS | | All routes | No "click here" or bare "read more". Repeated "Project details" and "Code on GitHub" links on `/projects/` carry a visually hidden suffix (": AAI_HSLU_TRACE" and so on). On project pages, "Code on GitHub" sits directly under the project's h1. Certificate links read "Verify certificate: <course>". PDF links state the type and page count. |

### S-H. Performance basics

| ID | Check | Result | Severity | Location | Finding and suggested fix |
|---|---|---|---|---|---|
| S31 | Lighthouse (mobile, live site) | PASS | | All 9 routes | SEO 100 on all 9 routes. Performance 95–100, LCP 1.4–2.1 s, CLS ≤ 0.019, TBT 30–220 ms (`/contact/` 220 ms, still scoring 95). Consistent with QA I15. |
| S32 | No render-blocking scripts or CSS | PASS | | All routes | Lighthouse `render-blocking-insight` is empty. About 13 KB of critical CSS is inlined, the full stylesheet loads non-blocking, the app script is `type="module"` (deferred), and the inline scripts (theme, event dispatch) are under 0.5 KB each. |
| S33 | Image weight | PASS | | `/images/` | Every image is 100 KB or less: share card 100 KB, figures 28–40 KB WebP, portrait 15 KB JPG / 5 KB WebP, logos under 4 KB. All have `width` and `height`, and below-fold images are lazy. Remaining opportunities, all small: `gpt-decoder-only.webp` is 800×1126 for a smaller display box (about 22 KiB saving with a `srcset`); `trace-architecture.webp` could save 5–20 KiB; `main-VGORDERU.js` has about 29 KiB unused (Angular runtime); GitHub Pages fixes the cache TTL at 10 minutes, which cannot be changed. `/papers/TFG_ManuelFasRuiz.pdf` is 5.4 MB, but it is a download and does not affect page load. |

### S-I. Not run

| ID | Check | Result | Severity | Location | Finding and suggested fix |
|---|---|---|---|---|---|
| S34 | Google Rich Results Test | SKIPPED | | 5 routes with JSON-LD | Requires the interactive Google tool. The schema.org validator (S9) ran instead and found 0 errors. |
| S35 | Search Console indexing and coverage | SKIPPED | | Live site | No Search Console access. The author can verify the property and submit `/sitemap.xml` to see which routes Google has indexed. |
| S36 | LinkedIn profile links back to the site | SKIPPED | | `linkedin.com/in/manuel-fas-48b2b9257` | LinkedIn blocks automated requests (QA D6). Check by hand that the profile's Contact info or Featured section links to `https://fasmanuel2002.github.io`. |

## Related QA findings that affect search and AI answers (not counted again)

- **QA B8 (high), thesis result.** "Best model: DeepSurv, C-index approximately 0.82" is in the thesis page meta and OG description, which Google and link previews show, and in two places in `llms.txt`, which answer engines are likely to quote. When B8 is resolved, update the meta and OG description, `llms.txt` (project entry and Pages list) and the `/projects/` result line together. S24 makes the same figure read as "0.82819" in raw text.
- **QA B9 (medium) and C3 (medium), PDFs.** `/cv/Manuel-Fas-CV.pdf` and both `/papers/*.pdf` are crawlable and indexable: robots.txt allows them, and GitHub Pages cannot send `X-Robots-Tag`. A search for the author's name can surface the CV PDF, which uses a different degree name and dates (B9), or the thesis PDF with its signature stamps (C3). Fix the PDFs themselves. If a PDF should stay off search results, a robots.txt `Disallow` for that path is the only option on GitHub Pages.
- **QA B10 (medium), "4 Papers reimplemented".** This label is also part of the home page's raw text, which S24 flags as "4Papers reimplemented".
