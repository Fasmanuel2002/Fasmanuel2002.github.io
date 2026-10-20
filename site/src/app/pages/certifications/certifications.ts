import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import certifications from '../../content/certifications.json';
import { SITE } from '../../content/content';
import { Seo } from '../../seo';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  platform: string | null;
  date: string;
  dateDisplay: string;
  url: string;
  notes?: string | null;
  topics?: string | null;
  /** The specialization this course belongs to, if any. */
  part: { title: string; url: string } | null;
  specAnchor: string | null;
}

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Certifications {
  protected readonly page = certifications;

  /**
   * All twelve certificates as one list, newest first. A course inside a specialization keeps a
   * link to it, and the course that completed the specialization also carries its anchor
   * (Home links to #spec-deep-learning).
   */
  protected readonly certificates = certifications.entries
    .flatMap((entry): Certificate[] =>
      entry.kind === 'specialization'
        ? entry.courses.map((course) => ({
            ...course,
            part: { title: entry.title, url: entry.url },
            specAnchor: course.date === entry.date ? entry.id : null,
          }))
        : [{ ...entry, part: null, specAnchor: null }],
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  constructor() {
    inject(Seo).apply(SITE.pages.certifications);
  }
}
