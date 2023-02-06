import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '@app/core/services/auth.service';
import {ToastService} from '@app/core/services/toast.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private toast: ToastService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authenticationService.logout();
        location.reload(true);
      }
      if (err.status === 500) {
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
