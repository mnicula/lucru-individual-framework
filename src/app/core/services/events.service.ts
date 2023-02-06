import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventModel} from '@app/core/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  protected apiUrl = environment.apiUrl;
  protected endpointUrl = environment.endpointUrl;

  constructor(private http: HttpClient) {
  }

  public postEvent(data: FormData): Observable<EventModel> {
    return this.http.post<EventModel>(this.apiUrl + this.endpointUrl + 'events', data);
  }

  public patchEvent(data, eventId: number): Observable<EventModel> {
    return this.http.patch<EventModel>(this.apiUrl + this.endpointUrl + `events/${eventId}`, data);
  }

  public getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiUrl + this.endpointUrl + `events`);
  }

  public deleteEvent(eventId: number): Observable<EventModel> {
    return this.http.delete<EventModel>(this.apiUrl + this.endpointUrl + `events/${eventId}`);
  }

  public getEventById(eventId: number): Observable<EventModel> {
    return this.http.get<EventModel>(this.apiUrl + this.endpointUrl + `events/${eventId}`);
  }

  public getEventsCount(): Observable<number> {
    return this.http.get<number>(this.apiUrl + this.endpointUrl + `events/count`);
  }

  public getEventsPerPage(page): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + this.endpointUrl + `events?page=${page}`, {params: {size: '5'}});
  }

  public getPastEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiUrl + this.endpointUrl + `events/past?sort=startTime`);
  }
  public getUpcomingEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiUrl + this.endpointUrl + `events/upcoming?sort=startTime&page=0&size=1`);
  }
}
