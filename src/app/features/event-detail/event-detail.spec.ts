import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventDetail } from './event-detail';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { EventService } from '../../core/services/event.service';
import { EventInfoService } from '../../core/services/event-info.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

describe('EventDetail', () => {
  let component: EventDetail;
  let fixture: ComponentFixture<EventDetail>;
  let cartService: CartService;
  let eventService: EventService;
  let eventInfoService: EventInfoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetail],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => (key === 'id' ? '1' : null) }),
          },
        },
        CartService,
        EventService,
        EventInfoService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetail);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    eventService = TestBed.inject(EventService);
    eventInfoService = TestBed.inject(EventInfoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call increment and add to cart', () => {
    spyOn(cartService, 'addToCart');
    spyOn(component, 'selected').and.returnValue(0);

    component['eventId'].set('1');

    spyOn(component, 'eventInfo').and.returnValue({
      id: '1',
      title: 'Test Event',
      subtitle: '',
      image: '',
      place: '',
      startDate: '',
      endDate: '',
      description: '',
    });
    const session = { sessionId: 's1', date: new Date(), availability: 2 };
    component.increment(session as any);
    expect(cartService.addToCart).toHaveBeenCalledWith(
      '1',
      'Test Event',
      session
    );
  });

  it('should not increment if selected >= availability', () => {
    spyOn(cartService, 'addToCart');
    spyOn(component, 'selected').and.returnValue(2);
    const session = { sessionId: 's1', date: new Date(), availability: 2 };
    component.increment(session as any);
    expect(cartService.addToCart).not.toHaveBeenCalled();
  });

  it('should call decrement and remove from cart', () => {
    spyOn(cartService, 'removeOneFromSession');
    spyOn(component, 'selected').and.returnValue(1);

    component['eventId'].set('1');
    const session = { sessionId: 's1', date: new Date(), availability: 2 };
    component.decrement(session as any);
    expect(cartService.removeOneFromSession).toHaveBeenCalledWith('1', 's1');
  });

  it('should not decrement if selected is 0', () => {
    spyOn(cartService, 'removeOneFromSession');
    spyOn(component, 'selected').and.returnValue(0);
    const session = { sessionId: 's1', date: new Date(), availability: 2 };
    component.decrement(session as any);
    expect(cartService.removeOneFromSession).not.toHaveBeenCalled();
  });

  it('should return selected from cartService', () => {
    spyOn(cartService, 'getSelectedForSession').and.returnValue(3);

    component['eventId'].set('1');
    const result = component.selected('s1');
    expect(result).toBe(3);
    expect(cartService.getSelectedForSession).toHaveBeenCalledWith('1', 's1');
  });

  it('should compute eventInfo correctly', () => {
    const mockEvents = [
      {
        id: '1',
        title: 'Event 1',
        subtitle: '',
        image: '',
        place: '',
        startDate: '',
        endDate: '',
        description: '',
      },
      {
        id: '2',
        title: 'Event 2',
        subtitle: '',
        image: '',
        place: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ];
    Object.defineProperty(eventService, 'events', {
      configurable: true,
      get: () => signal(mockEvents),
    });

    fixture = TestBed.createComponent(EventDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.eventId.set('1');
    expect(component.eventInfo()?.title).toBe('Event 1');
  });
  it('should sort sessions by date in sortedSessions', () => {
    const mockSessions = [
      { sessionId: '1', date: new Date(200), availability: 1 },
      { sessionId: '2', date: new Date(100), availability: 1 },
      { sessionId: '3', date: new Date(150), availability: 1 },
    ];
    Object.defineProperty(eventInfoService, 'sessions', {
      configurable: true,
      get: () => signal(mockSessions),
    });
    fixture = TestBed.createComponent(EventDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const sorted = component.sortedSessions();
    expect(sorted[0].date.getTime()).toBe(100);
    expect(sorted[1].date.getTime()).toBe(150);
    expect(sorted[2].date.getTime()).toBe(200);
  });
  it('should use empty string as event title if eventInfo is undefined in increment', () => {
    spyOn(cartService, 'addToCart');
    spyOn(component, 'selected').and.returnValue(0);
    component['eventId'].set('1');
    spyOn(component, 'eventInfo').and.returnValue(undefined);
    const session = { sessionId: 's1', date: new Date(), availability: 2 };
    component.increment(session as any);
    expect(cartService.addToCart).toHaveBeenCalledWith('1', '', session);
  });
});
