import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECT_PAGES } from '../../content/content';
import project from '../../content/project-thesis.json';
import { Seo } from '../../seo';
import { ProjectHead } from './project-head';

@Component({
  selector: 'app-thesis-project',
  imports: [RouterLink, ProjectHead],
  templateUrl: './thesis-project.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ThesisProject {
  protected readonly project = project;

  constructor() {
    inject(Seo).apply(PROJECT_PAGES.thesis, project.jsonLd);
  }
}
