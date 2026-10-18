import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AttentionMask } from '../../attention-mask';
import { SPOKEN_LANGUAGES } from '../../content/content';
import experience from '../../content/experience.json';
import { Seo } from '../../seo';

@Component({
  selector: 'app-experience',
  imports: [RouterLink, AttentionMask],
  templateUrl: './experience.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Experience {
  protected readonly page = experience;
  protected readonly languages = SPOKEN_LANGUAGES;

  constructor() {
    inject(Seo).apply('experience');
  }
}
