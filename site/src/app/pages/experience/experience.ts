import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, SPOKEN_LANGUAGES } from '../../content/content';
import experience from '../../content/experience.json';
import { LinkedText } from '../../linked-text';
import { Seo } from '../../seo';

@Component({
  selector: 'app-experience',
  imports: [RouterLink, LinkedText],
  templateUrl: './experience.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Experience {
  protected readonly page = experience;
  protected readonly languages = SPOKEN_LANGUAGES;

  constructor() {
    inject(Seo).apply(SITE.pages.experience);
  }
}
