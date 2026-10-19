import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import education from '../../content/education.json';
import { SITE } from '../../content/content';
import { Seo } from '../../seo';

@Component({
  selector: 'app-education',
  imports: [RouterLink],
  templateUrl: './education.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Education {
  protected readonly page = education;

  constructor() {
    inject(Seo).apply(SITE.pages.education);
  }
}
