import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { PageMeta, SITE, absoluteUrl } from './content/content';

/**
 * Sets the per-route head tags: title, meta description, canonical URL, Open Graph tags and
 * JSON-LD. Runs during prerendering, so the tags are in the static HTML of every route.
 */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  apply(page: PageMeta, jsonLd?: object): void {
    const url = page.url;
    const photo = SITE.person.photo;

    this.title.setTitle(page.title);
    const tags: MetaDefinition[] = [
      { name: 'description', content: page.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE.person.name },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: absoluteUrl(photo.src) },
      { property: 'og:image:width', content: String(photo.width) },
      { property: 'og:image:height', content: String(photo.height) },
      { property: 'og:image:alt', content: photo.alt },
      { name: 'twitter:card', content: 'summary' },
    ];
    for (const tag of tags) {
      this.meta.updateTag(tag);
    }
    this.setCanonical(url);
    this.setJsonLd(jsonLd);
  }

  private setCanonical(href: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private setJsonLd(data: object | undefined): void {
    const head = this.document.head;
    head.querySelectorAll('script[type="application/ld+json"]').forEach((node) => node.remove());
    if (!data) return;
    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    // Escape "<" so no string value can close the script element early.
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
    head.appendChild(script);
  }
}
