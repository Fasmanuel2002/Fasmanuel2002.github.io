import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LinkedText } from './linked-text';

export interface FigureData {
  src: string;
  width: number;
  height: number;
  orientation: string;
  alt: string;
  caption: string;
  credit: string;
}

/**
 * Architecture diagram from data.json: the image links to the full-size file, and the caption is
 * followed by the visible credit line (required attribution). `priority` is for an image above the
 * fold (eager, high fetch priority); otherwise the image is lazy-loaded.
 */
@Component({
  selector: 'app-architecture-figure',
  imports: [LinkedText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="figure" [class.figure--portrait]="figure().orientation === 'portrait'">
      <a class="figure__link" [href]="figure().src">
        <img
          class="figure__img"
          [src]="figure().src"
          [width]="figure().width"
          [height]="figure().height"
          [alt]="figure().alt"
          [attr.loading]="priority() ? null : 'lazy'"
          [attr.fetchpriority]="priority() ? 'high' : null"
          decoding="async"
        />
        <span class="visually-hidden">(opens the full-size image)</span>
      </a>
      <figcaption class="figure__caption">
        {{ figure().caption }}
        <span class="figure__credit">Credit: <app-linked-text [text]="figure().credit" /></span>
      </figcaption>
    </figure>
  `,
})
export class ArchitectureFigure {
  readonly figure = input.required<FigureData>();
  readonly priority = input(false);
}
