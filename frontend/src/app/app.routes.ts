import { Routes } from '@angular/router';
import { StorefrontPage } from './features/storefront/storefront.page/storefront.page';

export const routes: Routes = [
  { path: '', component: StorefrontPage },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product-detail/product-detail.page/product-detail.page')
        .then(module => module.ProductDetailPage),
  },
  { path: '**', redirectTo: '' },
];
