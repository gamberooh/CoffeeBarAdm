import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
@Component({
  selector: 'app-cart-tray.component',
  imports: [],
  templateUrl: './cart-tray.component.html',
  styleUrl: './cart-tray.component.css',
})
export class CartTrayComponent {
  readonly cartService = inject(CartService);
}
