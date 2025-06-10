import { Component, computed, effect, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss'
})
export class ShoppingCart {
  private cartService = inject(CartService);

  readonly cartItems = computed(() => this.cartService.getCartGroupedByEvent());

  constructor() {
    effect(() => {
      console.log('Cart updated:', this.cartItems());
    });
  }

  removeFromCart(eventId: string, sessionId: string) {
    this.cartService.removeOneFromSession(eventId, sessionId);
  }
}