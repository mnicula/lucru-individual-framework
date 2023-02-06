import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventDetails, PaymentModel} from '@app/core/models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  protected apiUrl = environment.apiUrl;
  protected endpointUrl = environment.endpointUrl;

  constructor(private http: HttpClient) {
  }

  public postPaymentDetails(data: PaymentModel): Observable<EventDetails> {
    return this.http.post<EventDetails>(this.apiUrl + this.endpointUrl + 'payment', data);
  }
}
