import { Routes } from '@angular/router';

// Keep these paths in sync with `pages` in scripts/sync-content.mjs (used for the sitemap).
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home') },
  { path: 'experience', loadComponent: () => import('./pages/experience/experience') },
  { path: 'projects', loadComponent: () => import('./pages/projects/projects') },
  { path: 'certifications', loadComponent: () => import('./pages/certifications/certifications') },
  { path: 'education', loadComponent: () => import('./pages/education/education') },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact') },
];
