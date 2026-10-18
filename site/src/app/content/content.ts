// Content shared by every route. All *.json files in this folder are generated from
// data/data.json by scripts/sync-content.mjs. Do not edit them by hand.
import shared from './shared.json';

export const SITE = shared;

/** Title, description and path of one route (used for head tags). */
export interface PageMeta {
  path: string;
  title: string;
  description: string;
}

/** Project detail pages, keyed by kind. Paths are /projects/<slug> with slugs from data.json. */
export const PROJECT_PAGES = shared.projectPages;

/** Absolute URL on the public site. The origin comes from data/data.json `site.base_url`. */
export function absoluteUrl(path: string): string {
  return `${shared.site.url}${path}`;
}

/** "Spanish (native), English (professional working proficiency)" */
export const SPOKEN_LANGUAGES = shared.person.spokenLanguages
  .map((item) => `${item.language} (${item.level})`)
  .join(', ');

/** Short author list for citations: "A, B and C" or "A et al." for longer lists. */
export function citeAuthors(authors: readonly string[]): string {
  if (authors.length > 3) return `${authors[0]} et al.`;
  if (authors.length === 1) return authors[0];
  return `${authors.slice(0, -1).join(', ')} and ${authors[authors.length - 1]}`;
}
