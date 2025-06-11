import { Injectable, signal } from '@angular/core';
import { CartEvent } from '../models/cart.model';

/**
 * Servicio para gestionar el carrito de compra de sesiones.
 * Permite añadir, quitar y consultar sesiones agrupadas por evento.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  // Signal reactivo con el estado actual del carrito
  private cartSignal = signal<CartEvent[]>([]);

  /**
   * Devuelve el carrito agrupado por evento.
   */
  getCartGroupedByEvent() {
    return this.cartSignal();
  }

  /**
   * Devuelve cuántas localidades han sido seleccionadas para una sesión concreta.
   */
  getSelectedForSession(eventId: string, sessionId: string): number {
    const event = this.cartSignal().find((e) => e.eventId === eventId);
    if (!event) return 0;
    const session = event.sessions.find((s) => s.sessionId === sessionId);
    return session ? session.selected : 0;
  }

  /**
   * Añade una localidad de una sesión al carrito.
   * Si el evento o la sesión no existen, los crea.
   */
  addToCart(
    eventId: string,
    eventTitle: string,
    session: { sessionId: string; date: Date; availability: number }
  ) {
    const cart = this.cartSignal().slice();
    let event = cart.find((e) => e.eventId === eventId);

    if (!event) {
      event = {
        eventId,
        eventTitle,
        sessions: [],
      };
      cart.push(event);
    }

    let cartSession = event.sessions.find(
      (s) => s.sessionId === session.sessionId
    );
    if (!cartSession) {
      cartSession = {
        sessionId: session.sessionId,
        date: session.date.toISOString(),
        selected: 0,
      };
      event.sessions.push(cartSession);
    }

    cartSession.selected += 1;

    this.cartSignal.set(cart);
  }

  /**
   * Quita una localidad de una sesión del carrito.
   * Si la cantidad llega a cero, elimina la sesión (y el evento si queda vacío).
   */
  removeOneFromSession(eventId: string, sessionId: string) {
    const cart = this.cartSignal().slice();
    const eventIdx = cart.findIndex((e) => e.eventId === eventId);
    if (eventIdx === -1) return;

    const event = cart[eventIdx];
    const sessionIdx = event.sessions.findIndex(
      (s) => s.sessionId === sessionId
    );
    if (sessionIdx === -1) return;

    const session = event.sessions[sessionIdx];
    session.selected -= 1;

    if (session.selected <= 0) {
      event.sessions.splice(sessionIdx, 1);
    }

    if (event.sessions.length === 0) {
      cart.splice(eventIdx, 1);
    }

    this.cartSignal.set(cart);
  }
}
