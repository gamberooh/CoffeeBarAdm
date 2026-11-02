import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { HeaderComponent } from '../../../layout/header.component/header.component';
import { FooterComponent } from '../../../layout/footer.component/footer.component';
import { HeroBannerComponent } from '../hero-banner.component/hero-banner.component';
import { FilterBarComponent } from '../filter-bar.component/filter-bar.component';
import { CartTrayComponent } from '../../../shared/components/cart-tray.component/cart-tray.component';
import { ProductCardComponent } from '../../../shared/components/product-card.component/product-card.component';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import type { ProductResponse, CategoryFilter, CategoryId } from '../../../core/models/product.model';

@Component({
  selector: 'app-storefront.page',
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroBannerComponent,
    FilterBarComponent,
    CartTrayComponent,
    ProductCardComponent,
  ],
  templateUrl: './storefront.page.html',
  styleUrl: './storefront.page.css',
})
export class StorefrontPage {
  readonly cartService = inject(CartService);
  readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  readonly isLoading = signal(true);

  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<CategoryId>('all');
  // readonly nonAlcoohlicOnly = signal<boolean>(false);

  readonly allProducts = toSignal(
    this.productService.getAll().pipe(
      finalize(() => this.isLoading.set(false)),
    ),
    { initialValue: [] as ProductResponse[] },
  );

  readonly categories = computed<CategoryFilter[]>(() => {
    const products = this.allProducts();

    return [
      { id: 'all', label: 'Tutti', icon: 'local_cafe', count: products.length },
      {
        id: 'beverages',
        label: 'Beverages',
        icon: 'coffee',
        count: products.filter(product => product.category === 'beverages').length,
      },
      {
        id: 'cakes',
        label: 'Cakes & Pastries',
        icon: 'cake',
        count: products.filter(product => product.category === 'cakes').length,
      },
      {
        id: 'cookies',
        label: 'Cookies',
        icon: 'cookie',
        count: products.filter(product => product.category === 'cookies').length,
      },
      {
        id: 'sandwiches',
        label: 'Sandwiches',
        icon: 'lunch_dining',
        count: products.filter(product => product.category === 'sandwiches').length,
      },
    ];
  });

  readonly filteredProducts = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();
    const category = this.selectedCategory();

    return this.allProducts().filter(product => {
      const matchesQuery = product.title.toLocaleLowerCase().includes(query);
      const matchesCategory = category === 'all' || product.category === category;

      return matchesQuery && matchesCategory;
    });
  });

  onAddToCart(product: ProductResponse): void {
    this.cartService.addToCart(product);
  }

  onViewDetails(product: ProductResponse): void {
    void this.router.navigate(['product', product.id]);
  }
}
