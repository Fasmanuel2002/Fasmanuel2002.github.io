import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { SITE } from './content/content';
import { ScrollEffects } from './scroll-effects';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly site = SITE;
  protected readonly nav = [
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/certifications', label: 'Certifications' },
    { path: '/education', label: 'Education' },
    { path: '/contact', label: 'Contact' },
  ];

  private readonly currentPath = toSignal(
    inject(Router).events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split(/[?#]/)[0]),
    ),
    { initialValue: '/' },
  );

  private readonly document = inject(DOCUMENT);

  protected readonly scroll = inject(ScrollEffects);

  constructor() {
    afterNextRender(() => this.scroll.start());
  }

  /** Back to the top of the page, with focus on <main> for keyboard and screen reader users. */
  protected toTop(): void {
    this.document.defaultView?.scrollTo({ top: 0 });
    this.document.getElementById('main')?.focus({ preventScroll: true });
  }

  /** Mobile menu state. Below 48rem the nav collapses behind a toggle (only when JavaScript runs). */
  protected readonly menuOpen = signal(false);

  protected closeMenu(toggle: HTMLButtonElement): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    toggle.focus();
  }

  // The skip link needs the current path: with <base href="/">, a bare "#main" would resolve
  // to the home page. Computed during prerendering, so it also works without JavaScript.
  protected readonly skipHref = computed(() => `${this.currentPath()}#main`);

  /**
   * With JavaScript, move focus to <main> without a navigation. GitHub Pages serves each page
   * at "/<route>/" (with a trailing slash), so following "/<route>#main" would reload the page.
   */
  protected skipToMain(event: Event): void {
    const main = this.document.getElementById('main');
    if (!main) return;
    event.preventDefault();
    main.focus();
  }

  /** "page" on the exact page, "true" on its subpages (for example a project under /projects). */
  protected ariaCurrent(path: string): 'page' | 'true' | null {
    const current = this.currentPath();
    if (current === path) return 'page';
    return current.startsWith(`${path}/`) ? 'true' : null;
  }
}
