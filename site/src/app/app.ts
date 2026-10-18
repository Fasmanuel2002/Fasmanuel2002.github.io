import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { SITE } from './content/content';

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

  // The skip link needs the current path: with <base href="/">, a bare "#main" would resolve
  // to the home page. Computed during prerendering, so it also works without JavaScript.
  protected readonly skipHref = computed(() => `${this.currentPath()}#main`);

  /** "page" on the exact page, "true" on its subpages (for example a project under /projects). */
  protected ariaCurrent(path: string): 'page' | 'true' | null {
    const current = this.currentPath();
    if (current === path) return 'page';
    return current.startsWith(`${path}/`) ? 'true' : null;
  }
}
