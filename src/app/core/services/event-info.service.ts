import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Session } from '../models/session.model';

/**
 * Servicio encargado de obtener y gestionar la información de sesiones para un evento concreto.
 * Expone signals reactivos para sesiones y errores.
 */
@Injectable({ providedIn: 'root' })
export class EventInfoService {
  // Signal reactivo con la lista de sesiones del evento actual
  private sessionsSignal = signal<Session[]>([]);
  readonly sessions = this.sessionsSignal.asReadonly();

  // Signal reactivo para el mensaje de error (si ocurre)
  private errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la información de sesiones para un evento dado.
   * Si hay error en la petición, actualiza el signal de error.
   */
  getEventInfo(eventId: string) {
    this.errorSignal.set(null);
    this.http.get<any>(`/assets/data/event-info-${eventId}.json`).subscribe({
      next: (data) => {
        // Mapea la respuesta a objetos Session
        const sessions: Session[] = (data.sessions || []).map(
          (s: any, idx: number) => ({
            sessionId: String(idx),
            date: new Date(Number(s.date)),
            availability: Number(s.availability),
          })
        );
        this.sessionsSignal.set(sessions);
      },
      error: () => {
        this.sessionsSignal.set([]);
        this.errorSignal.set('No se han encontrado sesiones para este evento.');
      },
    });
  }
}
