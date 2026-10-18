// Builds the site's content and crawl files from data/data.json, the single source of truth.
//
// Outputs (all committed, so `ng build` also works on its own):
//   src/app/content/*.json  trimmed, display-ready content used by the Angular app
//   public/sitemap.xml, public/robots.txt, public/llms.txt
//
// The public site URL comes from data.json `site.base_url`. Change it there, then run
// `npm run build` (or `npm run sync`) to regenerate canonical URLs, Open Graph tags,
// JSON-LD, sitemap.xml, robots.txt and llms.txt.
//
// Every sentence composed here restates facts from data.json. The `expect` checks make the
// script fail loudly if the data changes in a way that would make a sentence inaccurate.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = resolve(siteRoot, '..', 'data', 'data.json');
const outputs = {
  contentDir: resolve(siteRoot, 'src/app/content'),
  sitemap: resolve(siteRoot, 'public/sitemap.xml'),
  robots: resolve(siteRoot, 'public/robots.txt'),
  llms: resolve(siteRoot, 'public/llms.txt'),
};

if (!existsSync(dataPath)) {
  // For example a Vercel build that cannot see files outside the `site` root directory.
  console.warn(`sync-content: ${dataPath} not found; keeping the committed generated files.`);
  process.exit(0);
}

const data = JSON.parse(readFileSync(dataPath, 'utf8'));

// ---------------------------------------------------------------------------------------------
// Helpers

function expect(condition, message) {
  if (!condition) throw new Error(`sync-content: ${message}`);
}
const byId = (list) => new Map(list.map((item) => [item.id, item]));
const get = (map, id) => {
  expect(map.has(id), `missing id "${id}" in data.json`);
  return map.get(id);
};
const RANGE_SEPARATOR = ' – '; // en dash, as used in every *_display range in data.json
const rangeStart = (display) => display.split(RANGE_SEPARATOR)[0];
const rangeEnd = (display) => display.split(RANGE_SEPARATOR)[1] ?? null;
const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);
const upperFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const repoName = (url) => url.replace(/\/+$/, '').split('/').pop();
const bareUrl = (url) => url.replace(/^https?:\/\//, '').replace(/\/+$/, '');
const sentences = (text) => text.split(/(?<=\.)\s+/);
const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const numberWord = (n) => NUMBER_WORDS[n] ?? String(n);
const listJoin = (items) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
const formatInt = (n) => n.toLocaleString('en-US');

// ---------------------------------------------------------------------------------------------
// Source data

expect(data.meta?.approval_status === 'approved', 'data.json is not approved (meta.approval_status)');

const siteUrl = data.site.base_url.replace(/\/+$/, '');
expect(/^https:\/\/[^/]+$/.test(siteUrl), `site.base_url must be an https origin, got "${siteUrl}"`);
const abs = (path) => `${siteUrl}${path}`;

const person = data.person;
const contact = data.contact;
const experience = data.experience;
const educationList = data.education;
const papers = byId(data.papers);
const featured = [...data.projects.featured].sort((a, b) => a.featured_rank - b.featured_rank);
const certifications = data.certifications;
const specializations = data.specializations;
const certificationsById = byId(certifications);
const educationById = byId(educationList);
const experienceById = byId(experience);

const current = experience.find((role) => role.current);
expect(current, 'expected one current role');
const [locality, country] = person.location.split(', ');
const upsa = get(educationById, 'edu-upsa');
const hslu = get(educationById, 'edu-hslu');

const photo = {
  src: '/images/profile.jpg',
  webp: '/images/profile.webp',
  width: person.photo.width_px,
  height: person.photo.height_px,
  alt: person.photo.alt,
};

const links = {
  email: { label: 'Email', url: contact.email.url, display: contact.email.value },
  social: contact.links.map((link) => ({ label: link.label, url: link.url, display: bareUrl(link.url) })),
};
const githubProfile = {
  label: data.projects.github_profile_link.label,
  url: data.projects.github_profile_link.url,
};

// ---------------------------------------------------------------------------------------------
// Experience

const experienceOut = experience.map((role) => ({
  id: role.id,
  title: role.title,
  organization: role.organization,
  organizationUrl: role.organization_url ?? null,
  location: role.location,
  start: role.start,
  end: role.end ?? null,
  current: role.current,
  datesDisplay: role.dates_display,
  startDisplay: rangeStart(role.dates_display),
  endDisplay: rangeEnd(role.dates_display),
  supervisor: role.supervisor ?? null,
  highlights: role.highlights,
  technologies: role.technologies_mentioned ?? [],
  links: (role.links ?? []).map((link) => ({ label: link.label, url: link.url })),
  relatedProjectId: role.related_project_id ?? null,
}));

const researchRoles = experience.filter((role) => /Research/.test(role.title));
const otherRoles = experience.filter((role) => !/Research/.test(role.title));
const researchCountries = [...new Set(researchRoles.map((role) => role.location.split(', ').at(-1)))];
const oldestRole = [...experience].sort((a, b) => a.start.localeCompare(b.start))[0];
expect(experience.length === 4, 'experience lede assumes four positions');
expect(researchRoles.length === 3, 'experience lede assumes three research roles');
expect(researchCountries.join('|') === 'Spain|Switzerland', 'experience lede assumes Spain and Switzerland');
expect(
  otherRoles.length === 1 &&
    otherRoles[0].title === 'Machine Learning & Backend Engineer' &&
    otherRoles[0].organization === 'Wembley Studios',
  'experience lede assumes one ML and backend engineering role at Wembley Studios',
);

// ---------------------------------------------------------------------------------------------
// Papers (hosted PDFs)

const paperOut = (paper) => ({
  id: paper.id,
  title: paper.title,
  documentType: paper.document_type,
  authors: paper.authors,
  supervisor: paper.supervisor ?? null,
  director: paper.director ?? null,
  coDirector: paper.co_director ?? null,
  institution: paper.institution,
  date: paper.date,
  dateDisplay: paper.date_display,
  pages: paper.pages,
  pdf: paper.site_path,
  repository: paper.repository,
  abstract: paper.abstract ?? null,
  keywords: paper.keywords ?? [],
});

// ---------------------------------------------------------------------------------------------
// Education

const thesisDegree = upsa.degrees.find((degree) => degree.thesis_paper_id);
const thesisPaper = get(papers, thesisDegree.thesis_paper_id);
const thesisProject = featured.find((project) => project.paper_id === thesisPaper.id);
const thesisDetail = upsa.details.find((line) => line.startsWith('Thesis: '));
expect(thesisDetail?.startsWith(`Thesis: ${thesisPaper.title} — `), 'unexpected thesis detail format');
const upsaStatus = upsa.details.find((line) => !line.startsWith('Thesis: '));

const educationOut = educationList.map((entry) => ({
  id: entry.id,
  institution: entry.institution,
  location: entry.location,
  degreeType: entry.degree_type ?? null,
  program: entry.program,
  start: entry.start,
  end: entry.end ?? entry.end_expected ?? null,
  datesDisplay: entry.dates_display,
  startDisplay: rangeStart(entry.dates_display),
  endDisplay: rangeEnd(entry.dates_display),
  status: entry.id === upsa.id ? upsaStatus : null,
  degrees: (entry.degrees ?? []).map((degree) => ({
    name: degree.name,
    status: degree.status,
    completedDisplay: degree.completed_display ?? null,
  })),
  thesis:
    entry.id === upsa.id
      ? {
          ...paperOut(thesisPaper),
          description: upperFirst(thesisDetail.slice(`Thesis: ${thesisPaper.title} — `.length)),
          projectId: thesisProject.id,
          degree: thesisPaper.degree,
        }
      : null,
  relatedRole:
    entry.id === hslu.id
      ? (() => {
          const role = get(experienceById, 'exp-hslu-aai-lab');
          return { id: role.id, title: role.title, organization: role.organization, datesDisplay: role.dates_display };
        })()
      : null,
}));

// ---------------------------------------------------------------------------------------------
// Projects

const traceSource = get(byId(featured), 'trace-reimplementation');
const thesisSource = get(byId(featured), 'upsa-thesis-cancer-survival');
const reimplSource = get(byId(featured), 'paper-reimplementations');

const paperRef = (paper) => ({
  title: paper.title,
  authors: paper.authors,
  year: paper.year,
  arxivId: paper.arxiv_id,
  url: paper.url,
});

const repositoryOut = (repo) => ({
  url: repo.url,
  name: repoName(repo.url),
  license: repo.license ?? null,
  languages: repo.languages,
  created: repo.created,
});

const pdfOut = (paper) => ({ href: paper.site_path, pages: paper.pages, documentType: paper.document_type });

// TRACE reimplementation
const traceReport = get(papers, traceSource.paper_id);
const traceMetrics = traceSource.results.metrics_table;
const traceMain = traceMetrics[0];
expect(traceMain.model === 'TRACE (multi-task)', 'first TRACE metrics row should be TRACE (multi-task)');
const traceResultsScope = traceSource.results.description.replace(/ \(report Table 2\)$/, '');
expect(traceResultsScope === 'Average over the ATC, SAT and MAP tasks on the OTTO dataset', 'unexpected TRACE results description');

const trace = {
  id: traceSource.id,
  rank: traceSource.featured_rank,
  kind: 'trace',
  title: traceSource.title,
  summary: traceSource.summary,
  role: traceSource.role,
  date: traceSource.date,
  dateDisplay: traceSource.date_display,
  context: {
    organization: traceSource.context.organization,
    location: traceSource.context.location,
    position: traceSource.context.position,
    datesDisplay: traceSource.context.dates_display,
    supervisor: traceSource.context.supervisor,
    experienceId: traceSource.context.experience_id,
  },
  pdf: pdfOut(traceReport),
  repository: repositoryOut(traceSource.repository),
  originalPaper: paperRef(traceSource.original_paper),
  points: traceSource.description_points.map((point) => point.text),
  datasets: traceSource.datasets.map((dataset) => ({ name: dataset.name, role: dataset.role, url: dataset.url ?? null })),
  method: {
    architecture: traceSource.method.architecture,
    tasks: traceSource.method.tasks,
    loss: traceSource.method.loss,
    dataPreparation: traceSource.method.data_preparation,
    trainingModes: traceSource.method.training_modes,
  },
  results: {
    caption: traceSource.results.description,
    rows: traceMetrics.map((row) => ({
      model: row.model,
      values: [row.auroc, row.auprc, row.binary_f1, row.macro_f1, row.accuracy].map(String),
    })),
    columns: ['AUROC', 'AUPRC', 'Binary F1', 'Macro F1', 'Accuracy'],
    findings: traceSource.results.findings,
    limitations: traceSource.results.limitations,
  },
  abstract: traceReport.abstract,
  technologies: traceSource.technologies.items,
  highlight: {
    value: `AUROC ${traceMain.auroc} · AUPRC ${traceMain.auprc}`,
    note: `${traceMain.model}, ${lowerFirst(traceResultsScope)}`,
  },
};

// Thesis
const thesis = {
  id: thesisSource.id,
  rank: thesisSource.featured_rank,
  kind: 'thesis',
  title: thesisSource.title,
  summary: thesisSource.summary,
  role: thesisSource.role,
  date: thesisSource.date,
  dateDisplay: thesisSource.date_display,
  context: {
    organization: thesisSource.context.organization,
    documentType: thesisSource.context.document_type,
    degree: thesisSource.context.degree,
    director: thesisSource.context.director,
    coDirector: thesisSource.context.co_director,
    educationId: thesisSource.context.education_id,
  },
  pdf: pdfOut(thesisPaper),
  repository: repositoryOut(thesisSource.repository),
  researchQuestion: thesisSource.research_question.text,
  data: {
    dataset: thesisSource.data.dataset,
    datasetUrl: thesisSource.data.dataset_url,
    patients: thesisSource.data.patients_display,
    genes: `${formatInt(thesisSource.data.raw_genes)} raw; ${formatInt(thesisSource.data.genes_after_low_expression_filter)} after the low-expression filter; ${formatInt(thesisSource.data.selected_genes)} selected`,
    subtypes: thesisSource.data.molecular_subtypes,
    endpoint: thesisSource.data.survival_endpoint,
  },
  method: {
    featureSelection: thesisSource.method.feature_selection,
    models: thesisSource.method.models,
    validation: thesisSource.method.validation,
    evaluation: thesisSource.method.evaluation,
    interpretability: thesisSource.method.interpretability,
  },
  results: {
    findings: thesisSource.results.findings,
    limitations: thesisSource.results.limitations,
  },
  keywords: thesisPaper.keywords,
  technologies: thesisSource.technologies.items,
  highlight: {
    value: `Best model: ${thesisSource.results.best_model}, C-index ${thesisSource.results.best_model_c_index_display}`,
    note: thesisSource.data.patients_display,
  },
};

// Paper-Reimplementations
const statusKey = (status) =>
  ({ Completed: 'done', 'In progress': 'active', 'Planned/in progress': 'planned' })[status];
const implementations = reimplSource.implementations
  .filter((item) => item.list_on_site)
  .map((item) => {
    expect(statusKey(item.status), `unknown status "${item.status}"`);
    const verifiedNotes =
      item.verification?.result === 'verified' && item.verification.notes
        ? item.verification.notes.replace(/\bIt is trained\b/, 'The model is trained')
        : null;
    return {
      number: item.number,
      name: item.name,
      area: item.area,
      status: item.status,
      statusKey: statusKey(item.status),
      folderUrl: item.folder_url ?? null,
      papers: item.original_papers.map(paperRef),
      implementation: item.implementation ?? null,
      // For planned entries without code, the factual part of the data collector's display note.
      note: item.implementation ? null : sentences(item.display_note).at(-1),
      dataset: item.dataset ?? null,
      results: (item.reported_results ?? []).map((result) =>
        'value' in result
          ? { metric: result.metric, values: [result.value] }
          : { metric: result.metric, values: [result.baseline_seq2seq, result.seq2seq_with_attention] },
      ),
      resultColumns: (item.reported_results ?? []).some((result) => 'baseline_seq2seq' in result)
        ? ['Baseline Seq2Seq', 'Seq2Seq with attention']
        : ['Value'],
      caveat: verifiedNotes,
    };
  });
const countStatus = (status) => implementations.filter((item) => item.status === status).length;

const reimplementations = {
  id: reimplSource.id,
  rank: reimplSource.featured_rank,
  kind: 'reimplementations',
  title: reimplSource.title,
  summary: reimplSource.summary,
  role: reimplSource.role,
  repository: repositoryOut(reimplSource.repository),
  implementations,
  technologies: reimplSource.technologies.items,
  highlight: {
    value: `${implementations.length} papers listed`,
    note: `${countStatus('Completed')} completed, ${countStatus('In progress')} in progress, ${countStatus('Planned/in progress')} planned/in progress`,
  },
};

const projectCards = [trace, thesis, reimplementations].map((project) => ({
  id: project.id,
  rank: project.rank,
  title: project.title,
  summary: project.summary,
  dateDisplay: project.dateDisplay ?? null,
  date: project.date ?? null,
  highlight: project.highlight,
  technologies: project.technologies.slice(0, 5),
  repository: { url: project.repository.url, name: project.repository.name },
  pdf: project.pdf ?? null,
}));

// ---------------------------------------------------------------------------------------------
// Certifications

const certOut = (cert) => ({
  id: cert.id,
  title: cert.title,
  issuer: cert.issuer,
  platform: cert.platform ?? null,
  date: cert.date,
  dateDisplay: cert.date_display,
  url: cert.verification_url,
  notes: cert.notes ?? null,
  topics: cert.cv_note ?? null,
});

const certificationEntries = [
  ...specializations.map((spec) => ({
    kind: 'specialization',
    id: spec.id,
    title: spec.title,
    issuer: spec.issuer,
    platform: spec.platform,
    date: spec.date,
    dateDisplay: spec.date_display,
    url: spec.verification_url,
    topics: spec.cv_note ?? null,
    courseCount: spec.course_count,
    courses: spec.course_ids.map((id) => certOut(get(certificationsById, id))),
  })),
  ...certifications
    .filter((cert) => !cert.specialization_id)
    .map((cert) => ({ kind: 'certificate', ...certOut(cert), courseCount: null, courses: [] })),
].sort((a, b) => b.date.localeCompare(a.date));

const courseTotal = specializations.reduce((sum, spec) => sum + spec.course_ids.length, 0);
const issuers = [...new Set(certifications.flatMap((cert) => cert.issuer.split(' and ')))];
const certDates = [...certifications].sort((a, b) => a.date.localeCompare(b.date));
expect(certifications.length === 12, 'certifications lede assumes twelve certificates');
expect(courseTotal === 8 && specializations.length === 2, 'certifications lede assumes 8 courses in 2 specializations');
expect(
  issuers.join('|') === 'DeepLearning.AI|Amazon Web Services|Harvard University',
  `unexpected issuers ${issuers.join(', ')}`,
);
expect(
  specializations.every((spec) => spec.issuer === 'DeepLearning.AI' && spec.platform === 'Coursera'),
  'specializations lede assumes DeepLearning.AI on Coursera',
);
const standalone = certifications.filter((cert) => !cert.specialization_id);
const cs50 = standalone.filter((cert) => cert.issuer === 'Harvard University');
expect(cs50.length === 2, 'certifications lede assumes two Harvard University courses');

// ---------------------------------------------------------------------------------------------
// Recent activity timeline (newest first)

const paperProject = (paperId) => featured.find((project) => project.paper_id === paperId)?.id ?? null;
const timelineAll = [
  ...experience.map((role) => ({
    date: role.start,
    display: rangeStart(role.dates_display),
    kind: 'Role',
    group: 'role',
    title: role.title,
    detail: role.organization,
    route: '/experience',
    fragment: role.id,
  })),
  ...data.papers.map((paper) => ({
    date: paper.date,
    display: paper.date_display,
    kind: paper.document_type,
    group: 'document',
    title: paper.title,
    detail: paper.institution,
    route: '/projects',
    fragment: paperProject(paper.id),
  })),
  ...specializations.map((spec) => ({
    date: spec.date,
    display: spec.date_display,
    kind: 'Specialization',
    group: 'certification',
    title: spec.title,
    detail: spec.issuer,
    route: '/certifications',
    fragment: spec.id,
  })),
  ...standalone.map((cert) => ({
    date: cert.date,
    display: cert.date_display,
    kind: 'Certificate',
    group: 'certification',
    title: cert.title,
    detail: cert.issuer,
    route: '/certifications',
    fragment: cert.id,
  })),
  ...educationList.flatMap((entry) =>
    (entry.degrees ?? [])
      .filter((degree) => degree.status === 'completed')
      .map((degree) => ({
        date: degree.completed,
        display: degree.completed_display,
        kind: 'Degree completed',
        group: 'degree',
        title: degree.name,
        detail: entry.institution,
        route: '/education',
        fragment: entry.id,
      })),
  ),
].sort((a, b) => b.date.localeCompare(a.date));
const timeline = timelineAll.slice(0, 8);
const groupCount = (group) => timeline.filter((item) => item.group === group).length;
const pluralize = (n, singular, plural) => `${numberWord(n)} ${n === 1 ? singular : plural}`;
const activityParts = [
  [groupCount('role'), 'role', 'roles'],
  [groupCount('document'), 'research document', 'research documents'],
  [groupCount('degree'), 'completed degree', 'completed degrees'],
  [groupCount('certification'), 'certification', 'certifications'],
]
  .filter(([n]) => n > 0)
  .map(([n, singular, plural]) => pluralize(n, singular, plural));

// ---------------------------------------------------------------------------------------------
// Page metadata and section summaries

const pages = {
  home: {
    path: '/',
    title: `${person.name} — ${person.headline}`,
    description: `${person.name}, ${lowerFirst(person.headline)} in ${person.location}, specialising in Transformer architectures, NLP and large language models.`,
  },
  experience: {
    path: '/experience',
    title: `Experience — ${person.name}`,
    description: `Machine learning roles: ${experience.map((role) => role.organization).join('; ')}.`,
  },
  projects: {
    path: '/projects',
    title: `Projects — ${person.name}`,
    description:
      'PyTorch reimplementation of the TRACE clickstream Transformer, a cancer survival-analysis thesis on TCGA RNA-seq data, and PyTorch paper reimplementations.',
  },
  certifications: {
    path: '/certifications',
    title: `Certifications — ${person.name}`,
    description: `${standalone[0].title}, ${specializations.map((spec) => spec.title).join(', ')}, and two CS50 courses.`,
  },
  education: {
    path: '/education',
    title: `Education — ${person.name}`,
    description: `${upsa.degree_type}, ${upsa.program}, ${upsa.institution}; exchange at HSLU, Lucerne.`,
  },
  contact: {
    path: '/contact',
    title: `Contact — ${person.name}`,
    description: `Contact ${person.name}, ${lowerFirst(person.headline)} in ${person.location}, by email (${contact.email.value}), GitHub or LinkedIn.`,
  },
};

expect(person.summary.text.includes('specialising in Transformer architectures, NLP and large language models'), 'home description quotes the summary');
expect(standalone[0].id === 'cert-genai-llm', 'certifications description assumes the newest standalone certificate is GenAI');
expect(thesisSource.data.dataset.includes('TCGA breast cancer RNA-seq'), 'thesis wording assumes TCGA breast cancer RNA-seq data');
expect(traceSource.description_points[0].text.includes('PyTorch'), 'TRACE wording assumes a PyTorch reimplementation');
expect(reimplSource.summary.startsWith('PyTorch reimplementations'), 'reimplementations wording assumes PyTorch');
expect(hslu.program === 'Visiting Exchange Student, Computer Science', 'education wording assumes the HSLU exchange program');
expect(upsa.dates_display.endsWith('May 2027 (expected)'), 'education wording assumes May 2027 (expected)');

for (const [key, page] of Object.entries(pages)) {
  expect(page.description.length < 160, `${key} description is ${page.description.length} characters (must be < 160)`);
}

const ledes = {
  homeFeatured:
    "Three projects with public code: a PyTorch reimplementation of the TRACE clickstream model, a bachelor's thesis on survival modelling with TCGA breast cancer RNA-seq data, and a repository of PyTorch paper reimplementations.",
  homeActivity: `${upperFirst(listJoin(activityParts))} between ${timeline.at(-1).display} and ${timeline[0].display}, newest first.`,
  homeAbout: `${person.name}'s background, education, current work and interests, in his own words.`,
  experience: `Four positions since ${rangeStart(oldestRole.dates_display)}: three machine learning research roles in ${listJoin(researchCountries)}, and one machine learning and backend engineering role at ${otherRoles[0].organization}.`,
  skills: 'Programming languages, machine learning libraries, engineering tools and methods, plus spoken languages.',
  projects:
    "Three featured projects, each with a public GitHub repository: a PyTorch reimplementation of the TRACE clickstream model (HSLU), a bachelor's thesis on cancer survival analysis (UPSA), and PyTorch reimplementations of machine learning papers.",
  projectsMore: `Other public repositories are on ${person.name}'s GitHub profile.`,
  certifications: `Twelve course certificates dated ${certDates[0].date_display} to ${certDates.at(-1).date_display}, issued by ${listJoin(issuers)}. Eight of the DeepLearning.AI courses make up two Coursera specializations.`,
  education: `A dual bachelor's degree at the ${upsa.institution}, ${rangeEnd(upsa.dates_display).replace(/^(.*) \(expected\)$/, 'expected $1')}, and a visiting exchange in computer science at the ${hslu.institution}.`,
  contact: `${person.name} is based in ${person.location}. He can be reached by email, on GitHub or on LinkedIn.`,
};
expect(certDates[0].date_display === '2023' && certDates.at(-1).date_display === 'Aug 2026', 'certification date range changed');
expect(upsa.degree_type === 'Dual B.S.', 'education lede assumes a Dual B.S.');

// ---------------------------------------------------------------------------------------------
// JSON-LD

const personId = `${siteUrl}/#person`;
const knowsAbout = [];
for (const topic of [...person.interests.items, ...data.skills.methods]) {
  if (!knowsAbout.some((known) => known.toLowerCase() === topic.toLowerCase())) knowsAbout.push(topic);
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': personId,
  name: person.name,
  alternateName: person.alternate_name,
  url: `${siteUrl}/`,
  image: abs(photo.src),
  jobTitle: current.title,
  description: person.summary.text,
  email: contact.email.url,
  address: { '@type': 'PostalAddress', addressLocality: locality, addressCountry: country },
  worksFor: {
    '@type': 'Organization',
    name: current.organization,
    ...(current.organization_url ? { url: current.organization_url } : {}),
  },
  alumniOf: educationList.map((entry) => ({ '@type': 'CollegeOrUniversity', name: entry.institution })),
  knowsAbout,
  knowsLanguage: person.spoken_languages.items.map((item) => item.language),
  sameAs: contact.links.map((link) => link.url),
};

const author = { '@type': 'Person', '@id': personId, name: person.name };
const scholarly = (paper) => ({
  '@type': 'ScholarlyArticle',
  name: paper.title,
  url: paper.url,
  datePublished: String(paper.year),
  author: paper.authors.map((name) => ({ '@type': 'Person', name })),
});
const softwareSourceCode = (project, extra) => ({
  '@type': 'SoftwareSourceCode',
  '@id': abs(`/projects#${project.id}`),
  name: project.title,
  description: project.summary,
  url: abs(`/projects#${project.id}`),
  codeRepository: project.repository.url,
  programmingLanguage: 'Python',
  dateCreated: project.repository.created,
  keywords: project.technologies.join(', '),
  author,
  ...extra,
});
const projectsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    softwareSourceCode(trace, {
      isBasedOn: scholarly(trace.originalPaper),
      subjectOf: {
        '@type': 'Report',
        name: traceReport.title,
        url: abs(traceReport.site_path),
        datePublished: traceReport.date,
        author,
      },
    }),
    softwareSourceCode(thesis, {
      subjectOf: {
        '@type': 'Thesis',
        name: thesisPaper.title,
        url: abs(thesisPaper.site_path),
        datePublished: thesisPaper.date,
        inSupportOf: thesisPaper.degree,
        sourceOrganization: { '@type': 'CollegeOrUniversity', name: thesisPaper.institution },
        author,
      },
    }),
    softwareSourceCode(reimplementations, {
      isBasedOn: implementations.flatMap((item) => item.papers).map(scholarly),
    }),
  ],
};
for (const tech of [trace, thesis, reimplementations]) {
  expect(tech.technologies.includes('Python'), `${tech.id}: programmingLanguage assumes Python`);
}

// ---------------------------------------------------------------------------------------------
// Assemble the content files. `shared.json` is used by the app shell and SEO on every route;
// each page imports only its own file, so a route's JavaScript chunk carries only its content.

const contentFiles = {
  shared: {
    generatedFrom: 'data/data.json',
    site: { url: siteUrl, urlIsPlaceholder: Boolean(data.site.base_url_is_placeholder), language: data.site.language },
    pages,
    person: {
      name: person.name,
      alternateName: person.alternate_name,
      headline: person.headline,
      location: person.location,
      summary: person.summary.text,
      spokenLanguages: person.spoken_languages.items,
      photo,
    },
    links,
  },
  home: {
    ledes: { featured: ledes.homeFeatured, activity: ledes.homeActivity, about: ledes.homeAbout },
    currentRole: { id: current.id, title: current.title, organization: current.organization, datesDisplay: current.dates_display },
    education: { id: upsa.id, degreeType: upsa.degree_type, program: upsa.program, institution: upsa.institution, datesDisplay: upsa.dates_display },
    interests: person.interests.items,
    about: person.about.map((block) => ({ heading: block.heading, text: block.text })),
    projectCards,
    timeline: timeline.map(({ group, ...item }) => item),
    jsonLd: personJsonLd,
  },
  experience: {
    lede: ledes.experience,
    skillsLede: ledes.skills,
    roles: experienceOut,
    skills: [
      { label: 'Programming languages', items: data.skills.languages },
      { label: 'Machine learning', items: data.skills.machine_learning },
      { label: 'Engineering and infrastructure', items: data.skills.engineering_and_infrastructure },
      { label: 'Methods', items: data.skills.methods },
    ],
  },
  projects: {
    lede: ledes.projects,
    moreLede: ledes.projectsMore,
    githubProfile,
    trace,
    thesis,
    reimplementations,
    jsonLd: projectsJsonLd,
  },
  certifications: { lede: ledes.certifications, entries: certificationEntries },
  education: { lede: ledes.education, entries: educationOut },
  contact: { lede: ledes.contact },
};

// ---------------------------------------------------------------------------------------------
// Crawl files

const routeOrder = ['home', 'experience', 'projects', 'certifications', 'education', 'contact'];
const pageUrl = (key) => abs(pages[key].path);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routeOrder.map((key) => `  <url>\n    <loc>${pageUrl(key)}</loc>\n  </url>`).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${abs('/sitemap.xml')}
`;

const implementationLine = (item) => {
  const paper = item.papers[0];
  const what = item.implementation ?? item.note;
  return `  - ${item.number} ${item.name} (${item.status}). Based on "${paper.title}" (arXiv:${paper.arxivId}). ${what}`;
};

const llms = `# ${person.name}

> ${person.summary.text}

- Name: ${person.name} (full name: ${person.alternate_name})
- Location: ${person.location}
- Current role: ${current.title}, ${current.organization}, ${current.location}, ${current.dates_display}.
- Education: ${upsa.degree_type}, ${upsa.program}, ${upsa.institution}, ${upsa.dates_display}. ${hslu.program}, ${hslu.institution}, ${hslu.dates_display}.
- Interests: ${person.interests.items.join(', ')}.
- Spoken languages: ${person.spoken_languages.items.map((item) => `${item.language} (${item.level})`).join(', ')}.

## Projects

- [${trace.title}](${abs(`/projects#${trace.id}`)}): ${trace.summary} ${trace.points[0]} Result: ${trace.highlight.value} for ${trace.highlight.note}. Code: ${trace.repository.url}. ${trace.pdf.documentType} (PDF): ${abs(trace.pdf.href)}
- [${thesis.title}](${abs(`/projects#${thesis.id}`)}): ${thesis.context.documentType}, ${thesis.context.organization}, ${thesis.dateDisplay}. ${thesis.summary} Data: ${thesis.data.dataset}; ${thesis.data.patients}. Models: ${thesis.method.models.join(', ')}. ${thesis.results.findings[0]} Code: ${thesis.repository.url}. Thesis (PDF): ${abs(thesis.pdf.href)}
- [${reimplementations.title}](${abs(`/projects#${reimplementations.id}`)}): ${reimplementations.summary} Code: ${reimplementations.repository.url}. Papers:
${implementations.map(implementationLine).join('\n')}

## Experience

${experience.map((role) => `- ${role.title}, ${role.organization}, ${role.location}, ${role.dates_display}.`).join('\n')}

## Certifications

${certificationEntries
  .map((entry) =>
    entry.kind === 'specialization'
      ? `- ${entry.title}, ${entry.issuer} on ${entry.platform} (${entry.dateDisplay}), ${entry.courseCount} courses: ${entry.courses.map((course) => course.title).join('; ')}.`
      : `- ${entry.title}, ${entry.issuer} (${entry.dateDisplay}).`,
  )
  .join('\n')}

## Pages

${routeOrder.map((key) => `- [${pages[key].title}](${pageUrl(key)}): ${pages[key].description}`).join('\n')}

## Contact

- Email: ${contact.email.value}
${contact.links.map((link) => `- ${link.label}: ${link.url}`).join('\n')}
`;

// ---------------------------------------------------------------------------------------------
// Write

mkdirSync(outputs.contentDir, { recursive: true });
for (const [name, value] of Object.entries(contentFiles)) {
  writeFileSync(resolve(outputs.contentDir, `${name}.json`), `${JSON.stringify(value, null, 2)}\n`);
}
writeFileSync(outputs.sitemap, sitemap);
writeFileSync(outputs.robots, robots);
writeFileSync(outputs.llms, llms);

console.log(
  `sync-content: wrote src/app/content/*.json, sitemap.xml, robots.txt and llms.txt for ${siteUrl}` +
    (data.site.base_url_is_placeholder ? ' (placeholder URL: replace site.base_url in data/data.json before deploy)' : ''),
);
