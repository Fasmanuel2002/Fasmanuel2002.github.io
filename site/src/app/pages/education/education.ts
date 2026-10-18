import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AttentionMask } from '../../attention-mask';
import education from '../../content/education.json';
import { Seo } from '../../seo';

@Component({
  selector: 'app-education',
  imports: [RouterLink, AttentionMask],
  templateUrl: './education.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Education {
  protected readonly page = education;

  constructor() {
    inject(Seo).apply('education');
  }
}
