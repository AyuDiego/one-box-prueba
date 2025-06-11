import { CartService } from './cart.service';
import { CartEvent } from '../models/cart.model';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    service = new CartService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty cart initially', () => {
    expect(service.getCartGroupedByEvent()).toEqual([]);
  });

  it('should add a session to the cart', () => {
    service.addToCart('1', 'Event 1', {
      sessionId: 's1',
      date: new Date('2024-01-01'),
      availability: 5,
    });
    const cart = service.getCartGroupedByEvent();
    expect(cart.length).toBe(1);
    expect(cart[0].sessions.length).toBe(1);
    expect(cart[0].sessions[0].selected).toBe(1);
  });

  it('should increment selected if session already exists', () => {
    service.addToCart('1', 'Event 1', {
      sessionId: 's1',
      date: new Date('2024-01-01'),
      availability: 5,
    });
    service.addToCart('1', 'Event 1', {
      sessionId: 's1',
      date: new Date('2024-01-01'),
      availability: 5,
    });
    const cart = service.getCartGroupedByEvent();
    expect(cart[0].sessions[0].selected).toBe(2);
  });

  it('should add multiple sessions and events', () => {
    service.addToCart('1', 'Event 1', {
      sessionId: 's1',
      date: new Date('2024-01-01'),
      availability: 5,
    });
    service.addToCart('1', 'Event 1', {
      sessionId: 's2',
      date: new Date('2024-01-02'),
      availability: 5,
    });
    service.addToCart('2', 'Event 2', {
      sessionId: 's3',
      date: new Date('2024-01-03'),
      availability: 5,
    });
    const cart = service.getCartGroupedByEvent();
    expect(cart.length).toBe(2);
    expect(cart[0].sessions.length).toBe(2);
    expect(cart[1].sessions.length).toBe(1);
  });

  it('should get selected for session', () => {
    service.addToCart('1', 'Event 1', {
      sessionId: 's1',
      date: new Date('2024-01-01'),
      availability: 5,
    });
    expect(service.getSelectedForSession('1', 's1')).toBe(1);
    expect(service.getSelectedForSession('1', 's2')).toBe(0);
    expect(service.getSelectedForSession('2', 's1')).toBe(0);
  });

  it('should remove one from session and remove session if selected is zero', () => {
    service.addToCart('1', 'Event 1', {
      sessionId: 's1',
      date: new Date('2024-01-01'),
      availability: 5,
    });
    service.addToCart('1', 'Event 1', {
      sessionId: 's1',
      date: new Date('2024-01-01'),
      availability: 5,
    });
    service.removeOneFromSession('1', 's1');
    let cart = service.getCartGroupedByEvent();
    expect(cart[0].sessions[0].selected).toBe(1);
    service.removeOneFromSession('1', 's1');
    cart = service.getCartGroupedByEvent();
    expect(cart.length).toBe(0);
  });

  it('should remove event if no sessions remain', () => {
    service.addToCart('1', 'Event 1', {
      sessionId: 's1',
      date: new Date('2024-01-01'),
      availability: 5,
    });
    service.removeOneFromSession('1', 's1');
    let cart = service.getCartGroupedByEvent();
    expect(cart.length).toBe(0);
  });

  it('should do nothing if removing from non-existent event or session', () => {
    service.removeOneFromSession('no-event', 'no-session');
    expect(service.getCartGroupedByEvent()).toEqual([]);
    service.addToCart('1', 'Event 1', {
      sessionId: 's1',
      date: new Date('2024-01-01'),
      availability: 5,
    });
    service.removeOneFromSession('1', 'no-session');
    expect(service.getCartGroupedByEvent()[0].sessions.length).toBe(1);
  });
});
