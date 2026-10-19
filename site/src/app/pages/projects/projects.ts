import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../content/content';
import projects from '../../content/projects.json';
import { Seo } from '../../seo';

/** Project catalog: one entry per featured project, each linking to its own page. */
@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Projects {
  protected readonly page = projects;

  constructor() {
    inject(Seo).apply(SITE.pages.projects, projects.jsonLd);
  }
}
