# Portfolio website: Manuel Fas Ruiz

## Purpose
Build an English-language personal portfolio website for Manuel Fas Ruiz. The site presents his CV, certifications, and public GitHub projects. It is deployed to GitHub Pages at `https://fasmanuel2002.github.io`.

## Audience and tone
- Primary audience: recruiters and hiring managers for machine learning and AI engineering roles.
- Secondary audience: research group leads and graduate admissions committees.
- Tone: direct, factual, and confident. Avoid hype and superlatives unless the source data supports them.

## Source of truth
- All facts come from `data/data.json`, which is built from the CV, certifications, and GitHub repositories.
- Never invent achievements, dates, job titles, institutions, metrics, technologies, or URLs.
- If information is missing or unclear, add it to `needs_review` instead of guessing.
- Dates, titles, and institution names must match exactly across the site, the metadata, and the QA report.
- Every certification link must come from the author's input or the issuer's official site. Otherwise, it goes to `needs_review`.

## Stack
- Angular (latest stable version), TypeScript, standalone components, and plain CSS.
- The project lives in `site/` and is created with the Angular CLI, with routing enabled.
- Use static prerendering so each page's content is present in the built HTML without JavaScript.
- Build with `ng build --configuration production`. The output folder is the one defined in `angular.json`.
- Do not add UI component libraries, external fonts, or third-party scripts unless they are listed and justified in `docs/build-summary.md`.
- Language: English only. Set `lang="en"` on the HTML element. Do not add i18n scaffolding, locale routing, or translation files. Spanish is out of scope for this version.

## Site structure
- Home: short professional summary with photo, an "At a glance" summary, About, and recent activity. No featured projects section (author decision 2026-10-19); projects live on the Projects page.
- Experience
- Projects
- Certifications
- Education
- Contact: include only links that exist in `data/data.json`.

## Deployment
- The target is GitHub Pages as a user site: repository `Fasmanuel2002.github.io`, URL `https://fasmanuel2002.github.io`. The site is served from the root and the base href is `/`.
- A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds `site/` and publishes the browser build folder defined in `angular.json`.
- Prepare the project for GitHub Pages, but do not push, trigger the workflow, or change repository settings.
- Deployment happens only after the author approves. The author pushes to GitHub and enables Pages.

## Workflow rules
- The data collector must stop after writing `data/data.json`. Do not start the developer until the author approves the data.
- Only the developer edits files in `site/`.
- QA and SEO/GEO agents report findings. They do not edit site files.
- Do not run `git commit`, `git push`, or change repository settings. The author decides when to commit and deploy.
- Ask before deleting any file.

## Technical requirements

### Semantic HTML
- Use `header`, `nav`, `main`, `section`, `article`, and `footer`.
- Exactly one `h1` per page, with logical heading order below it.

### Responsive CSS
- Mobile-first layout that works at 375px, 768px, and 1280px widths.
- Use relative units, CSS Grid or Flexbox, and no fixed widths wider than the viewport.
- Do not put essential content in a separate CSS file that loads late.

### Accessibility (WCAG 2.1 AA)
- Text contrast of at least 4.5:1.
- Visible focus states and full keyboard navigation.
- Alt text on all meaningful images. Empty alt text on decorative images.
- Labels on all form fields.
- Respect `prefers-reduced-motion`.

### SEO
- Unique `<title>` and meta description per route. Keep descriptions under 160 characters.
- Canonical URL and Open Graph tags on each route.
- `sitemap.xml` listing every public route, and `robots.txt` pointing to the sitemap.
- JSON-LD that parses correctly:
  - `Person` on the home page.
  - `SoftwareSourceCode` for projects.
  - Values must match `data/data.json`.

### GEO (AI answer engine readability)
- Key facts appear in the prerendered HTML.
- Each section begins with a plain-text summary.
- `llms.txt` at the site root summarizes who the author is and what each project does.

### Performance
- Target a Lighthouse score of 90 or higher for performance, accessibility, SEO, and best practices.
- Optimize images and lazy-load images below the fold.

## Content guidelines
- Use specific names, dates, tools, and measurable results from `data/data.json`.
- Use natural, varied terms from the field, such as machine learning, deep learning, natural language processing, and retrieval-augmented generation. Do not repeat keywords to influence rankings.
- Name people, organizations, and technologies explicitly. Avoid vague pronouns such as "it" or "this" when the reference is unclear.

## Agent execution rules
- The developer checks its own output against the technical requirements above before reporting completion.
- QA and SEO/GEO write their findings to `docs/qa-report.md`, with a severity (high, medium, or low) for each failure.
- After the QA and SEO reports are in, the developer fixes all high and medium issues in one revision pass.
- Any remaining issues go into `docs/build-summary.md` for the author to decide. There are no further automatic revision cycles.

## Deliverables
- `site/`: the Angular project, buildable and previewable locally.
- `docs/build-summary.md`: at the top, list every external asset with its justification. Then describe what was built, key decisions, and how to preview the site.
- `docs/qa-report.md`: pass, fail, or skipped results for every check, with severity and location.

## Communication
- When finished, report what changed, which files were touched, which checks failed, and which decisions the author still needs to make.
- Keep the chat summary short. Put details in the files under `docs/`.