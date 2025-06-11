import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventService } from '../../core/services/event.service';
import { Catalog } from './catalog';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('Catalog', () => {
  let component: Catalog;
  let fixture: ComponentFixture<Catalog>;
  let eventService: EventService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Catalog],
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalog);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have events as a signal', () => {
    expect(typeof component.events).toBe('function');
  });

  it('should have hasEvents as a computed signal', () => {
    expect(typeof component.hasEvents).toBe('function');
  });
});
