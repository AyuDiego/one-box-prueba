import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCart } from './shopping-cart';
import { provideZonelessChangeDetection } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
describe('ShoppingCart', () => {
  let component: ShoppingCart;
  let fixture: ComponentFixture<ShoppingCart>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCart],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCart);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cartService.removeOneFromSession when removeFromCart is called', () => {
    spyOn(cartService, 'removeOneFromSession');
    component.removeFromCart('event1', 'session1');
    expect(cartService.removeOneFromSession).toHaveBeenCalledWith(
      'event1',
      'session1'
    );
  });

  it('should return cartItems from cartService', () => {
    const mockCart = [{ eventId: '1', eventTitle: 'Test Event', sessions: [] }];
    spyOn(cartService, 'getCartGroupedByEvent').and.returnValue(mockCart);

    fixture = TestBed.createComponent(ShoppingCart);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.cartItems()).toEqual(mockCart);
  });
});
