import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Session } from '../models/session.model';

@Injectable({ providedIn: 'root' })
export class EventInfoService {
  private sessionsSignal = signal<Session[]>([]);
  readonly sessions = this.sessionsSignal.asReadonly();

  private errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor(private http: HttpClient) {}

  getEventInfo(eventId: string) {
    this.errorSignal.set(null);
    this.http.get<any>(`/assets/data/event-info-${eventId}.json`).subscribe({
      next: (data) => {
        const sessions: Session[] = (data.sessions || []).map((s: any, idx: number) => ({
          sessionId: String(idx),
          date: new Date(Number(s.date)),
          availability: Number(s.availability)
        }));
        this.sessionsSignal.set(sessions);
      },
      error: () => {
        this.sessionsSignal.set([]);
        this.errorSignal.set('No se han encontrado sesiones para este evento.');
      }
    });
  }
}