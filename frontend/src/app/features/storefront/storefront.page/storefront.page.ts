import { Component, inject, input, output, signal } from '@angular/core';
import { HeaderComponent } from '../../../layout/header.component/header.component';
import { FooterComponent } from '../../../layout/footer.component/footer.component';
import { HeroBannerComponent } from '../hero-banner.component/hero-banner.component';
import { FilterBarComponent } from '../filter-bar.component/filter-bar.component';
import { CartTrayComponent } from '../../../shared/components/cart-tray.component/cart-tray.component';
import { CartService } from '../../../core/services/cart.service';
import { ProductResponse, CategoryFilter, CategoryId } from '../../../core/models/product.model';

@Component({
  selector: 'app-storefront.page',
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroBannerComponent,
    FilterBarComponent,
    CartTrayComponent,
  ],
  templateUrl: './storefront.page.html',
  styleUrl: './storefront.page.css',
})
export class StorefrontPage {
  readonly cartService = inject(CartService);

  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<CategoryId>('all');
  readonly nonAlcoohlicOnly = signal<boolean>(false);

  readonly allProducts = 
}
