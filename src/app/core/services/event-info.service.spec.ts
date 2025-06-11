import { TestBed } from '@angular/core/testing';
import { EventInfoService } from './event-info.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
describe('EventInfoService', () => {
  let service: EventInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventInfoService, provideZonelessChangeDetection()],
    });
    service = TestBed.inject(EventInfoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set sessions and clear error on getEventInfo success', () => {
    service.getEventInfo('123');
    const req = httpMock.expectOne('/assets/data/event-info-123.json');
    req.flush({
      sessions: [
        { date: '1717977600000', availability: '10' },
        { date: '1718064000000', availability: '5' },
      ],
    });
    const sessions = service.sessions();
    expect(sessions.length).toBe(2);
    expect(sessions[0].availability).toBe(10);
    expect(service.error()).toBeNull();
  });

  it('should set error and empty sessions on getEventInfo error', () => {
    service.getEventInfo('999');
    const req = httpMock.expectOne('/assets/data/event-info-999.json');
    req.error(new ProgressEvent('error'));
    expect(service.sessions().length).toBe(0);
    expect(service.error()).toBe(
      'No se han encontrado sesiones para este evento.'
    );
  });

  it('should handle missing sessions property in response', () => {
    service.getEventInfo('456');
    const req = httpMock.expectOne('/assets/data/event-info-456.json');
    req.flush({});
    expect(service.sessions()).toEqual([]);
    expect(service.error()).toBeNull();
  });
});
