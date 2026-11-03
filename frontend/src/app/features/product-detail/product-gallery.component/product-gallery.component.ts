import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-product-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.css',
})
export class ProductGalleryComponent {
  // readonly isAlcoholic = input<boolean>(false);
  readonly isFavorite = input<boolean>(false);
  readonly mainImage = input.required<string>();
  readonly imageAlt = input('Product image');
  // readonly thumbnails = input<string[]>([]);

  readonly favoriteToggled = output<boolean>();

  readonly selectedImage = computed(() => this.mainImage());
}
