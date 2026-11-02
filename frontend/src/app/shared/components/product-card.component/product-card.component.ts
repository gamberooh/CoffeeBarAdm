import { Component, input, output } from '@angular/core';
import { ProductResponse } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card.component',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  readonly product = input.required<ProductResponse>();

  // events emitted to the father-component
  readonly addToCart = output<ProductResponse>();
  readonly viewDetails = output<ProductResponse>();
}
