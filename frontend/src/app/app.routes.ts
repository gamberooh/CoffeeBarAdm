import { Routes } from '@angular/router';
import { StorefrontPage } from './features/storefront/storefront.page/storefront.page';

export const routes: Routes = [
    { path: '', component: StorefrontPage },
    // { path: "product/:id ", component: ProductDetailComponent}
    { path: '**', redirectTo: '' }
];
