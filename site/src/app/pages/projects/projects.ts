import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AttentionMask } from '../../attention-mask';
import { citeAuthors } from '../../content/content';
import projects from '../../content/projects.json';
import { Seo } from '../../seo';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, AttentionMask],
  templateUrl: './projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Projects {
  protected readonly page = projects;
  protected readonly trace = projects.trace;
  protected readonly thesis = projects.thesis;
  protected readonly reimpl = projects.reimplementations;
  protected readonly cite = citeAuthors;

  constructor() {
    inject(Seo).apply('projects', projects.jsonLd);
  }
}
