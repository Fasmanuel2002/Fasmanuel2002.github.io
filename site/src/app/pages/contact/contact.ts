import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContactIcon } from '../../contact-icon';
import { SITE, SPOKEN_LANGUAGES } from '../../content/content';
import contact from '../../content/contact.json';
import { Seo } from '../../seo';

@Component({
  selector: 'app-contact',
  imports: [ContactIcon],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Contact {
  protected readonly site = SITE;
  protected readonly page = contact;
  protected readonly languages = SPOKEN_LANGUAGES;

  constructor() {
    inject(Seo).apply(SITE.pages.contact);
  }
}
