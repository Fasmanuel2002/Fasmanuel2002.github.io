import { DefaultUrlSerializer, UrlTree } from '@angular/router';

/**
 * GitHub Pages serves each prerendered page at "/<route>/" and answers "/<route>" with a 301.
 * Writing every router link with the trailing slash makes hrefs match the canonical URLs and
 * avoids that redirect for crawlers and for readers without JavaScript.
 */
export class TrailingSlashUrlSerializer extends DefaultUrlSerializer {
  override serialize(tree: UrlTree): string {
    const url = super.serialize(tree);
    const end = url.search(/[?#]/);
    const path = end === -1 ? url : url.slice(0, end);
    const rest = end === -1 ? '' : url.slice(end);
    return (path.endsWith('/') ? path : `${path}/`) + rest;
  }
}
