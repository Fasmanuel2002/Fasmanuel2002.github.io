import { Routes } from '@angular/router';
import { PROJECT_PAGES } from './content/content';

// Keep these paths in sync with `pageList` in scripts/sync-content.mjs (used for the sitemap).
// Project paths come from data.json slugs, e.g. "/projects/trace-reimplementation".
const projectRoute = (path: string) => path.replace(/^\//, '');

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home') },
  { path: 'experience', loadComponent: () => import('./pages/experience/experience') },
  { path: 'projects', loadComponent: () => import('./pages/projects/projects') },
  {
    path: projectRoute(PROJECT_PAGES.trace.path),
    loadComponent: () => import('./pages/projects/trace-project'),
  },
  {
    path: projectRoute(PROJECT_PAGES.thesis.path),
    loadComponent: () => import('./pages/projects/thesis-project'),
  },
  {
    path: projectRoute(PROJECT_PAGES.reimplementations.path),
    loadComponent: () => import('./pages/projects/reimplementations-project'),
  },
  { path: 'certifications', loadComponent: () => import('./pages/certifications/certifications') },
  { path: 'education', loadComponent: () => import('./pages/education/education') },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact') },
];
