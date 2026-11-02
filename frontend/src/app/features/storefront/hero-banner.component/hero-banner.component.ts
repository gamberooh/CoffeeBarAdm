import { Component, input, output } from '@angular/core';
import type { ProductResponse } from '../../../core/models/product.model';

@Component({
  selector: 'app-hero-banner',
  imports: [],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.css',
})
export class HeroBannerComponent {
  readonly title = input<string>('Beveroni giganteschi fatti a mano con amore dai nostri ADM');
  readonly subtitle = input<string>('Prendi una sedia e unisciti assieme ai tuoi amici a gustare un magnifico caffettino o un paninazzo gigantesco!');
  readonly featuredProduct = input<ProductResponse>();

  readonly orderFeatured = output<ProductResponse>();

}
