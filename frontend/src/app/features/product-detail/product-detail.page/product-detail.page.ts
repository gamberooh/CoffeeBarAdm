import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, concat, distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';
import { HeaderComponent } from '../../../layout/header.component/header.component';
import { FooterComponent } from '../../../layout/footer.component/footer.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb.component/breadcrumb.component';
import { ProductGalleryComponent } from '../product-gallery.component/product-gallery.component';
import { ProductInfoComponent } from '../product-info.component/product-info.component';
import { IngredientListComponent } from '../ingredient-list.component/ingredient-list.component';
import { CartTrayComponent } from '../../../shared/components/cart-tray.component/cart-tray.component';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import type { ProductResponse } from '../../../core/models/product.model';

type ProductDetailState =
  | { status: 'loading' }
  | { status: 'loaded'; product: ProductResponse }
  | { status: 'not-found' }
  | { status: 'error' };

@Component({
  selector: 'app-product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    ProductGalleryComponent,
    ProductInfoComponent,
    IngredientListComponent,
    CartTrayComponent,
  ],
  templateUrl: './product-detail.page.html',
  styleUrl: './product-detail.page.css',
})
export class ProductDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly quantity = signal(1);
  // readonly isVirgin = signal(false);
  // readonly customizations = signal<Record<string, string>>({ milk: 'whole' });

  readonly state = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter((id): id is string => id !== null),
      distinctUntilChanged(),
      switchMap(id => concat(
        of({ status: 'loading' } as const),
        this.productService.getById(id).pipe(
          map(product => ({ status: 'loaded', product }) as const),
          catchError((error: unknown) =>
            of({
              status: error instanceof HttpErrorResponse && error.status === 404
                ? 'not-found'
                : 'error',
            } as const),
          ),
        ),
      )),
    ),
    { initialValue: { status: 'loading' } as const },
  );

  readonly product = computed(() => {
    const state = this.state();
    return state.status === 'loaded' ? state.product : null;
  });

  handleQuantityChange(delta: number): void {
    this.quantity.update(quantity => Math.max(1, quantity + delta));
  }

  addToCart(product: ProductResponse): void {
    this.cartService.addToCart(product, this.quantity());
  }

  // handleFavoriteToggle(isFavorite: boolean): void {
  //   this.product.update(current => current ? { ...current, isFavorite } : current);
  // }

  // handleOptionChange(event: { group: string; option: string }): void {
  //   this.customizations.update(options => ({ ...options, [event.group]: event.option }));
  // }
}
