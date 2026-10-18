import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AttentionMask } from '../../attention-mask';
import { SITE, SPOKEN_LANGUAGES } from '../../content/content';
import home from '../../content/home.json';
import { Seo } from '../../seo';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AttentionMask],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  protected readonly site = SITE;
  protected readonly page = home;
  protected readonly languages = SPOKEN_LANGUAGES;

  constructor() {
    inject(Seo).apply(SITE.pages.home, home.jsonLd);
  }
}
