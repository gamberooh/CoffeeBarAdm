import { Injectable, signal, computed } from '@angular/core';
import { CartItem, CartSummary } from '../models/cart.model'
import { ProductResponse } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})

export class CartService {
  readonly cartItems = signal<CartItem[]>([]);
  readonly isTrayOpen = signal<boolean>(false);

  readonly summary = computed<CartSummary>(() => {
    const currentItems = this.cartItems();
    const subtotal = currentItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    // const discount = subtotal > 20 ? 2.80 : 0; // Logica sconto d'esempio
    const itemCount = currentItems.reduce((acc, item) => acc + item.quantity, 0);
    
    return {
      subtotal,
      // discount,
      total: subtotal,
      itemCount
    }
  });

  addToCart(product: ProductResponse, quantity = 1): void {
    this.cartItems.update((current) => {
      const existringIndex = current.findIndex(i => i.product.id === product.id);
      if (existringIndex < -1) {
        const updated = [...current];
        updated[existringIndex].quantity += quantity;
        return updated;
      }
      return [...current, {id: product.id, product, quantity, unitPrice: product.price }]
    });
  }

  //delta could be positive or negative
  updateQuantity(itemId: string, delta: number): void {
    this.cartItems.update(current => 
      current
        .map(item => item.id === itemId ? { ...item, quantity: item.quantity + delta } : item)
        .filter(item => item.quantity > 0)
    );
  }

  toggleTray(): void {
    this.isTrayOpen.update(validator => !validator);
  }
}
