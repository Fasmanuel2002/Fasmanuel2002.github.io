import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface Highlight {
  value: string;
  note: string;
  /** `value` split for display: figures large, the words between them small. */
  parts: { text: string; figure: boolean }[];
}

/**
 * A project's headline result: the figures as the visual anchor, the explanatory note below.
 * The visually hidden ". " keeps value and note apart in text read without CSS (S24).
 */
@Component({
  selector: 'app-result',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="result">
      <span class="result__value"
        >@for (part of highlight().parts; track $index) {@if (part.figure) {<span class="result__figure">{{
          part.text
        }}</span>} @else {{{ part.text }}}}</span
      ><span class="visually-hidden">. </span
      ><span class="result__note">{{ highlight().note }}</span>
    </p>
  `,
})
export class Result {
  readonly highlight = input.required<Highlight>();
}
