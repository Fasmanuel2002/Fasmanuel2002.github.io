import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

interface Cell {
  x: number;
  y: number;
  weight: number;
  row: number;
  accent: boolean;
}

const CELL = 10;
const GAP = 2;
const STEP = CELL + GAP;

/** Deterministic weight in [0.14, 1]: a strong diagonal, a first-token "sink" and sparse links. */
function weight(row: number, col: number): number {
  const local = Math.exp(-(row - col) / 1.6);
  const sink = col === 0 ? 0.5 : 0;
  const hash = (Math.imul(row + 3, 2654435761) ^ Math.imul(col + 11, 40503)) >>> 0;
  const noise = (hash % 1000) / 1000;
  const sparse = noise > 0.86 ? 0.62 : noise * 0.22;
  return Math.round(Math.min(1, 0.14 + Math.max(local, sink, sparse)) * 100) / 100;
}

/**
 * Decorative causal attention mask: the lower-triangular weight matrix of a decoder-only
 * Transformer. Each row may only attend to earlier positions; masked positions are dots.
 */
@Component({
  selector: 'app-attention-mask',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mask', 'aria-hidden': 'true' },
  template: `
    <svg [attr.viewBox]="viewBox()" focusable="false" aria-hidden="true">
      @for (cell of cells(); track $index) {
        <rect
          class="mask__cell"
          [class.mask__cell--accent]="cell.accent"
          [attr.x]="cell.x"
          [attr.y]="cell.y"
          width="10"
          height="10"
          rx="1.5"
          [attr.fill-opacity]="cell.weight"
          [style.animation-delay.ms]="120 + cell.row * 38"
        />
      }
      @for (dot of dots(); track $index) {
        <circle class="mask__dot" [attr.cx]="dot.x" [attr.cy]="dot.y" r="1.2" />
      }
    </svg>
  `,
})
export class AttentionMask {
  /** Number of tokens (rows and columns). */
  readonly size = input(12);

  protected readonly viewBox = computed(() => {
    const side = this.size() * STEP - GAP;
    return `0 0 ${side} ${side}`;
  });

  protected readonly cells = computed<Cell[]>(() => {
    const n = this.size();
    const cells: Cell[] = [];
    for (let row = 0; row < n; row++) {
      for (let col = 0; col <= row; col++) {
        cells.push({
          x: col * STEP,
          y: row * STEP,
          weight: row === col ? 1 : weight(row, col),
          row,
          accent: row === n - 1 && col === n - 1,
        });
      }
    }
    return cells;
  });

  protected readonly dots = computed(() => {
    const n = this.size();
    const dots: { x: number; y: number }[] = [];
    for (let row = 0; row < n; row++) {
      for (let col = row + 1; col < n; col++) {
        dots.push({ x: col * STEP + CELL / 2, y: row * STEP + CELL / 2 });
      }
    }
    return dots;
  });
}
