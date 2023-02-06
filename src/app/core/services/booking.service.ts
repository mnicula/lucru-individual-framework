import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoomModel} from '@app/core/models/room.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  protected apiUrl = environment.apiUrl;
  protected endpointUrl = environment.endpointUrl;

  constructor(private http: HttpClient) {
  }


  public postRoom(room: FormData): Observable<RoomModel> {
    return this.http.post<RoomModel>(this.apiUrl + this.endpointUrl + 'rooms', room);
  }

  public getRooms(): Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(this.apiUrl + this.endpointUrl + 'rooms');
  }

  public getRoomById(roomId: number): Observable<RoomModel> {
    return this.http.get<RoomModel>(this.apiUrl + this.endpointUrl + 'rooms/' + roomId);
  }

  public deleteRoom(id: number): Observable<RoomModel> {
    return this.http.delete<RoomModel>(this.apiUrl + this.endpointUrl + 'rooms/' + id);
  }

  public patchRoom(data, roomId: number): Observable<RoomModel> {
    return this.http.patch<RoomModel>(this.apiUrl + this.endpointUrl + 'rooms/' + roomId, data);
  }
}
