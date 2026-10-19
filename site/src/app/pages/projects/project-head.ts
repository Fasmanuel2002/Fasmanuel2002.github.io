import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArchitectureFigure, FigureData } from '../../architecture-figure';

export interface ProjectHeadData {
  title: string;
  summary: string;
  role: string;
  date?: string | null;
  dateDisplay?: string | null;
  highlight: { value: string; note: string };
}

/**
 * Title block of a project page: breadcrumb, date and role, h1, plain-text summary, headline
 * result and the projected links. The project's architecture figure, when there is one, closes
 * the block (near the top of the page, so it is not lazy-loaded and not animated).
 */
@Component({
  selector: 'app-project-head',
  imports: [RouterLink, ArchitectureFigure],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/projects">Projects</a></li>
          <li>
            <span class="breadcrumb__current" aria-current="page">{{ project().title }}</span>
          </li>
        </ol>
      </nav>
      <p class="page-meta reveal" style="--i: 0">
        @if (project().dateDisplay) {
          <time [attr.datetime]="project().date">{{ project().dateDisplay }}</time>
        }
        <span>Role: {{ project().role }}</span>
      </p>
      <h1 class="page-title page-title--project reveal" style="--i: 1">{{ project().title }}</h1>
      <p class="lede reveal" style="--i: 2">{{ project().summary }}</p>
      <p class="result reveal" style="--i: 3">
        <strong>{{ project().highlight.value }}</strong>
        <span>{{ project().highlight.note }}</span>
      </p>
      <ng-content />
      @if (figure(); as fig) {
        <app-architecture-figure [figure]="fig" [priority]="true" />
      }
    </header>
  `,
})
export class ProjectHead {
  readonly project = input.required<ProjectHeadData>();
  readonly figure = input<FigureData | null>(null);
}
