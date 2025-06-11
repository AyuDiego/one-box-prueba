import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/event.model';

/**
 * Servicio encargado de cargar y exponer la lista de eventos disponibles.
 * Utiliza un signal para que los componentes puedan reaccionar a los cambios.
 */
@Injectable({ providedIn: 'root' })
export class EventService {
  // Signal reactivo con la lista de eventos
  private eventsSignal = signal<Event[]>([]);
  readonly events = this.eventsSignal.asReadonly();

  constructor(private http: HttpClient) {
    // Carga los eventos al inicializar el servicio
    this.getEvents();
  }
  
  /**
   * Obtiene los eventos desde el archivo local y los ordena por fecha de finalización.
   */
  getEvents() {
    this.http.get<Event[]>('/assets/data/events.json').subscribe((events) => {
      // Ordena los eventos por fecha de finalización ascendente
      events.sort((a, b) => Number(a.endDate) - Number(b.endDate));
      this.eventsSignal.set(events);
    });
  }
}
