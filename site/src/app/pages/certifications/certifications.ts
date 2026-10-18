import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AttentionMask } from '../../attention-mask';
import certifications from '../../content/certifications.json';
import { SITE } from '../../content/content';
import { Seo } from '../../seo';

@Component({
  selector: 'app-certifications',
  imports: [AttentionMask],
  templateUrl: './certifications.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Certifications {
  protected readonly page = certifications;

  constructor() {
    inject(Seo).apply(SITE.pages.certifications);
  }
}
