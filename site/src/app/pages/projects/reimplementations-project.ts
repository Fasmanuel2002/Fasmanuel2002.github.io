import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArchitectureFigure } from '../../architecture-figure';
import { PROJECT_PAGES, citeAuthors } from '../../content/content';
import project from '../../content/project-reimplementations.json';
import { Seo } from '../../seo';
import { ProjectHead } from './project-head';

@Component({
  selector: 'app-reimplementations-project',
  imports: [RouterLink, ProjectHead, ArchitectureFigure],
  templateUrl: './reimplementations-project.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReimplementationsProject {
  protected readonly project = project;
  protected readonly cite = citeAuthors;

  constructor() {
    inject(Seo).apply(PROJECT_PAGES.reimplementations, project.jsonLd);
  }
}
