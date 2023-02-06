import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LoaderModel} from '@app/core/models/loader.model';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader = new BehaviorSubject<LoaderModel>({id: '', status: false});
  loaderStatus$ = this.loader.asObservable();

  constructor() {
  }

  public showLoader(id: string = 'global'): void {
    this.loader.next({id, status: true});
  }

  public showPreloader(id: string = 'secondary'): void {
    this.loader.next({id, status: true});
  }

  public hideLoader(id: string = 'global'): void {
    this.loader.next({id, status: false});
  }

  public hidePreloader(id: string = 'secondary'): void {
    this.loader.next({id, status: false});
  }
}
