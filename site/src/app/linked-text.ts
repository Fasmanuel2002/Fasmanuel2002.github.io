import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** "github.com/user/repo" (with or without https://) and "arXiv:2409.12972" inside plain text. */
const REFERENCE = /(?:https?:\/\/)?github\.com\/[\w.-]+(?:\/[\w.-]+)*|arXiv:\s?\d{4}\.\d{4,5}/g;

interface Segment {
  text: string;
  href: string | null;
}

/** Plain text from data.json with its GitHub and arXiv references turned into links. */
@Component({
  selector: 'app-linked-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@for (s of segments(); track $index) {@if (s.href) {<a [href]="s.href">{{ s.text }}</a>} @else {{{ s.text }}}}`,
})
export class LinkedText {
  readonly text = input.required<string>();

  protected readonly segments = computed(() => {
    const text = this.text();
    const out: Segment[] = [];
    let last = 0;
    for (const match of text.matchAll(REFERENCE)) {
      // A sentence-ending full stop is not part of a repository name
      const ref = match[0].replace(/\.+$/, '');
      out.push({ text: text.slice(last, match.index), href: null });
      out.push({ text: ref, href: toUrl(ref) });
      last = match.index + ref.length;
    }
    out.push({ text: text.slice(last), href: null });
    return out.filter((s) => s.text);
  });
}

function toUrl(ref: string): string {
  if (ref.startsWith('arXiv')) return `https://arxiv.org/abs/${ref.replace(/^arXiv:\s?/, '')}`;
  return ref.startsWith('http') ? ref : `https://${ref}`;
}
