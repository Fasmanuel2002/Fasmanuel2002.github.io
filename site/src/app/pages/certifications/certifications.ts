import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AttentionMask } from '../../attention-mask';
import certifications from '../../content/certifications.json';
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
    inject(Seo).apply('certifications');
  }
}
