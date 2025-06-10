export interface CartSession {
  sessionId: string;
  date: string;
  selected: number;
}

export interface CartEvent {
  eventId: string;
  eventTitle: string;
  sessions: CartSession[];
}