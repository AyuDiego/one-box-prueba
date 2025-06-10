import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private eventsSignal = signal<Event[]>([]);
  readonly events = this.eventsSignal.asReadonly();

  constructor(private http: HttpClient) {
    this.getEvents();
  }

  getEvents() {
    this.http.get<Event[]>('/assets/data/events.json').subscribe(events => {
      events.sort((a, b) => Number(a.endDate) - Number(b.endDate));
      this.eventsSignal.set(events);
    });
  }
}