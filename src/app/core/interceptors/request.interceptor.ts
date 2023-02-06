import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {catchError, finalize, map} from 'rxjs/operators';
import {LoaderService} from '../services/loader.service';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showPreloader();
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          if (event.status === 400) {
          }
        }
        return event;
      }),
      catchError(err => {
        if (err instanceof HttpResponse) {
        }
        return ErrorObservable.create(err);
      }),
      finalize(() => {
          this.loaderService.hidePreloader();
        }
      ));
  }
}


