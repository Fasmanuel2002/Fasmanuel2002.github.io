import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArchitectureFigure, FigureData } from '../../architecture-figure';
import { AttentionMask } from '../../attention-mask';

export interface ProjectHeadData {
  rank: number;
  title: string;
  summary: string;
  role: string;
  date?: string | null;
  dateDisplay?: string | null;
  highlight: { value: string; note: string };
}

/**
 * Title block of a project page: breadcrumb, h1, plain-text summary, headline result, actions.
 * The right column shows the project's architecture figure when there is one (above the fold, so
 * not lazy-loaded and not animated); otherwise the decorative attention mask.
 */
@Component({
  selector: 'app-project-head',
  imports: [RouterLink, AttentionMask, ArchitectureFigure],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head page-head--project" [class.page-head--figure]="figure()">
      <div class="wrap page-head__grid">
        <div class="page-head__text">
          <nav class="breadcrumb reveal" style="--i: 0" aria-label="Breadcrumb">
            <ol class="breadcrumb__list">
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/projects">Projects</a></li>
              <li>
                <span class="breadcrumb__current" aria-current="page">{{ project().title }}</span>
              </li>
            </ol>
          </nav>
          <p class="project__meta reveal" style="--i: 1">
            <span class="project__idx">0{{ project().rank }}</span>
            @if (project().dateDisplay) {
              <time [attr.datetime]="project().date">{{ project().dateDisplay }}</time>
            }
            <span>Role: {{ project().role }}</span>
          </p>
          <h1 class="page-title page-title--project reveal" style="--i: 2">{{ project().title }}</h1>
          <p class="lede lede--head reveal" style="--i: 3">{{ project().summary }}</p>
          <p class="result reveal" style="--i: 4">
            <strong>{{ project().highlight.value }}</strong>
            <span>{{ project().highlight.note }}</span>
          </p>
          <ng-content />
        </div>
        @if (figure(); as fig) {
          <app-architecture-figure class="hero-figure" [figure]="fig" [priority]="true" />
        } @else {
          <app-attention-mask class="page-mask" [size]="7" />
        }
      </div>
    </header>
  `,
})
export class ProjectHead {
  readonly project = input.required<ProjectHeadData>();
  readonly figure = input<FigureData | null>(null);
}
