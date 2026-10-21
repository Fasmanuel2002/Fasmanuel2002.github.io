import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import certifications from '../../content/certifications.json';
import { SITE } from '../../content/content';
import { Seo } from '../../seo';

/**
 * Twelve certificates in three groups: one per specialization, then the certificates taken on
 * their own. Each group carries its id as the anchor (Home links to #spec-deep-learning) and each
 * row its certificate id (Home links to #cert-genai-llm).
 */
@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Certifications {
  protected readonly page = certifications;

  constructor() {
    inject(Seo).apply(SITE.pages.certifications);
  }
}
