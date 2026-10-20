import { DOCUMENT, Injectable, Injector, afterNextRender, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/** Blocks that rise in the first time they scroll into view. Nested matches are skipped. */
const REVEAL = '.entry, .impl, .section, .glance, .figure';

/**
 * Browser-only scroll effects: the reading progress line, the back-to-top button, blocks that
 * rise in, the marker on the entry being read, and the count-up numbers on the home page.
 * The prerendered HTML is complete without any of this; motion is skipped when the reader
 * prefers reduced motion.
 */
@Injectable({ providedIn: 'root' })
export class ScrollEffects {
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly router = inject(Router);

  /** Scroll position as a fraction of the scrollable height, 0 to 1. */
  readonly progress = signal(0);
  /** True once the reader is more than one screen down the page. */
  readonly showTop = signal(false);

  private observers: IntersectionObserver[] = [];

  start(): void {
    const win = this.document.defaultView;
    if (!win) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const root = this.document.documentElement;
      const scrollable = root.scrollHeight - win.innerHeight;
      this.progress.set(scrollable > 0 ? Math.min(win.scrollY / scrollable, 1) : 0);
      this.showTop.set(win.scrollY > win.innerHeight);
    };
    const schedule = () => (frame ||= win.requestAnimationFrame(update));
    win.addEventListener('scroll', schedule, { passive: true });
    win.addEventListener('resize', schedule, { passive: true });

    const scan = () => {
      this.observe(win);
      update();
    };
    scan();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => afterNextRender(scan, { injector: this.injector }));
  }

  private observe(win: Window): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    const main = this.document.getElementById('main');
    if (!main || !('IntersectionObserver' in win)) return;
    const motion = !win.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Rise in: only blocks that start below the fold get hidden, so nothing visible flickers.
    if (motion) {
      const blocks = [...main.querySelectorAll<HTMLElement>(REVEAL)].filter(
        (el) => !el.parentElement?.closest(REVEAL) && el.getBoundingClientRect().top > win.innerHeight,
      );
      const reveal = this.watch((el) => el.classList.add('is-in'), { rootMargin: '0px 0px -8% 0px' });
      for (const el of blocks) {
        el.classList.add('scroll-reveal');
        reveal.observe(el);
      }
    }

    // Marker on the entry crossing the middle of the screen (Experience, Projects and so on).
    const current = new IntersectionObserver(
      (records) => records.forEach((r) => r.target.classList.toggle('is-current', r.isIntersecting)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    main.querySelectorAll('.entries > .entry').forEach((el) => current.observe(el));
    this.observers.push(current);

    // Count-up numbers: the final value is already in the HTML; animate from 0 once in view.
    if (motion) {
      const count = this.watch((el) => countUp(el, win), { threshold: 0.6 });
      main.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => count.observe(el));
    }
  }

  /** An observer that runs `action` once per element, the first time it comes into view. */
  private watch(action: (el: HTMLElement) => void, options: IntersectionObserverInit) {
    const observer = new IntersectionObserver((records, self) => {
      for (const r of records) {
        if (!r.isIntersecting) continue;
        self.unobserve(r.target);
        action(r.target as HTMLElement);
      }
    }, options);
    this.observers.push(observer);
    return observer;
  }
}

function countUp(el: HTMLElement, win: Window): void {
  const target = Number(el.dataset['count']);
  const duration = 900;
  const start = win.performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = String(Math.round(target * (1 - (1 - t) ** 3)));
    if (t < 1) win.requestAnimationFrame(tick);
  };
  win.requestAnimationFrame(tick);
}
