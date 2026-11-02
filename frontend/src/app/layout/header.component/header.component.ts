import { Component, inject, input } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header.component',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly cartService = inject(CartService);

  readonly brandName = input<string>('Coffee Bar ADM');
  readonly logoUrl = input<string>('');
}
