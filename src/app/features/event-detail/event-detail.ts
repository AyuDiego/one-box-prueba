import { Component, computed, inject, signal } from '@angular/core';
import { ShoppingCart } from '../../shared/components/shopping-cart/shopping-cart';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { EventService } from '../../core/services/event.service';
import { EventInfoService } from '../../core/services/event-info.service';
interface Session {
  sessionId: string;
  date: Date;
  availability: number;
}

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, ShoppingCart, RouterModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss',
})
export class EventDetail {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);
  private cartService = inject(CartService);
  private eventInfoService = inject(EventInfoService);

  readonly eventId = signal<string | null>(null);
  readonly eventInfo = computed(() =>
    this.eventService.events().find((e) => e.id === this.eventId())
  );
  readonly error = computed(() => this.eventInfoService.error());
  readonly sessions = computed(() => this.eventInfoService.sessions());
  readonly sortedSessions = computed(() =>
    this.sessions()
      .slice()
      .sort((a, b) => +a.date - +b.date)
  );

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.eventId.set(id);
      if (id) {
        this.eventInfoService.getEventInfo(id);
      }
    });
  }

  selected(sessionId: string) {
    return this.cartService.getSelectedForSession(this.eventId()!, sessionId);
  }

  increment(session: Session) {
    if (this.selected(session.sessionId) < session.availability) {
      this.cartService.addToCart(
        this.eventId()!,
        this.eventInfo()?.title ?? '',
        session
      );
    }
  }

  decrement(session: Session) {
    if (this.selected(session.sessionId) > 0) {
      this.cartService.removeOneFromSession(this.eventId()!, session.sessionId);
    }
  }
}
