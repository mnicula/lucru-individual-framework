import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DashboardModel} from '@app/core/models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  protected apiUrl = environment.apiUrl;
  protected endpointUrl = environment.endpointUrl;

  constructor(private http: HttpClient) {
  }

  public getDashboardData(numberOfMonth: number): Observable<DashboardModel> {
    return this.http.get<DashboardModel>(this.apiUrl + this.endpointUrl + `metrics/dashboard/${numberOfMonth}`);
  }
}
