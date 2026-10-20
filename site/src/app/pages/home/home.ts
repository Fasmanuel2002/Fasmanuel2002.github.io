import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECT_PAGES, SITE, SPOKEN_LANGUAGES } from '../../content/content';
import certifications from '../../content/certifications.json';
import experience from '../../content/experience.json';
import home from '../../content/home.json';
import reimplementations from '../../content/project-reimplementations.json';
import projects from '../../content/projects.json';
import { Seo } from '../../seo';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  protected readonly site = SITE;
  protected readonly page = home;
  protected readonly languages = SPOKEN_LANGUAGES;

  /** Counted from the content, never typed in. They count up from 0 when scrolled into view. */
  protected readonly stats = [
    { value: experience.roles.length, label: 'Roles', path: '/experience' },
    { value: projects.cards.length, label: 'Projects', path: '/projects' },
    {
      value: reimplementations.implementations.filter((i) => i.statusKey === 'done').length,
      label: 'Papers reimplemented',
      path: PROJECT_PAGES.reimplementations.path,
    },
    { value: certifications.entries.length, label: 'Certifications', path: '/certifications' },
  ];

  constructor() {
    inject(Seo).apply(SITE.pages.home, home.jsonLd);
  }
}
