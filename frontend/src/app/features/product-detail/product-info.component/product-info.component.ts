import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-product-info',
  imports: [],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent {
  readonly title = input.required<string>();
  readonly price = input.required<number>();
  // readonly rating = input.required<number>();
  // readonly reviewCount = input.required<number>();
  readonly description = input.required<string>();
  // readonly isAlcoholic = input<boolean>(false);
  readonly quantity = input<number>(1);
  
  readonly quantityChange = output<number>();
  // readonly virginToggle = output<boolean>();
}
