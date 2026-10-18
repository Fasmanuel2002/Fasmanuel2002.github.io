import { RenderMode, ServerRoute } from '@angular/ssr';

// Every route is prerendered at build time (static site generation, outputMode "static").
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
