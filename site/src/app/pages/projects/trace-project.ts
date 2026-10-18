import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECT_PAGES } from '../../content/content';
import project from '../../content/project-trace.json';
import { Seo } from '../../seo';
import { ProjectHead } from './project-head';

@Component({
  selector: 'app-trace-project',
  imports: [RouterLink, ProjectHead],
  templateUrl: './trace-project.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TraceProject {
  protected readonly project = project;

  constructor() {
    inject(Seo).apply(PROJECT_PAGES.trace, project.jsonLd);
  }
}
