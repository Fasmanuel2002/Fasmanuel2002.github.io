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
import { ContactIcon } from './contact-icon';
import { SITE } from './content/content';
import { ScrollEffects } from './scroll-effects';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ContactIcon],
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
      // Without the trailing slash the serializer adds, so "/experience/" compares as "/experience"
      map((event) => event.urlAfterRedirects.split(/[?#]/)[0].replace(/(.)\/$/, '$1')),
    ),
    { initialValue: '/' },
  );

  private readonly document = inject(DOCUMENT);

  protected readonly scroll = inject(ScrollEffects);

  /** True when the dark theme is in effect: the saved choice, otherwise the system setting. */
  protected readonly darkTheme = signal(false);

  constructor() {
    afterNextRender(() => {
      this.scroll.start();
      this.followTheme();
    });
  }

  /** Keeps `darkTheme` (the toggle's label) in step with the theme in effect. */
  private followTheme(): void {
    const root = this.document.documentElement;
    const system = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      const saved = root.getAttribute('data-theme');
      this.darkTheme.set(saved ? saved === 'dark' : Boolean(system?.matches));
    };
    sync();
    system?.addEventListener('change', sync);
  }

  /** Switches to the other theme and remembers the choice (read back in index.html before paint). */
  protected toggleTheme(): void {
    const theme = this.darkTheme() ? 'light' : 'dark';
    this.document.documentElement.setAttribute('data-theme', theme);
    this.darkTheme.set(theme === 'dark');
    try {
      this.document.defaultView?.localStorage.setItem('theme', theme);
    } catch {
      // Storage can be unavailable (private browsing, blocked storage); the theme then lasts until reload.
    }
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
  protected readonly skipHref = computed(() => `${this.currentPath().replace(/\/?$/, '/')}#main`);

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
