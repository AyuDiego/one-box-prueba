import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss',
})
export class ShoppingCart {
  private cartService = inject(CartService);

  readonly cartItems = computed(() => this.cartService.getCartGroupedByEvent());

  constructor() {}

  removeFromCart(eventId: string, sessionId: string) {
    this.cartService.removeOneFromSession(eventId, sessionId);
  }
}
