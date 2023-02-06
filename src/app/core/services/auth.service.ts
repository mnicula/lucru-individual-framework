import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {environment} from '@environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected apiUrl = environment.apiUrl;
  protected endpointUrl = environment.endpointUrl;
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser$: Observable<UserModel>;
  public userId: BehaviorSubject<any>;
  public getUserId: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.userId = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userId')));
    this.getUserId = this.userId.asObservable();
  }

  public get currentUserValue(): UserModel {
    let user: UserModel;
    this.currentUser$.subscribe((response) => {
      return user = response;
    });
    return user;
  }

  public login(body): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}${this.endpointUrl}auth/sign-up`, body)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.getUserByUserName();
        return user;
      }));
  }

  public register(body): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}${this.endpointUrl}auth/sign-in`, body);
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId');
    this.currentUserSubject.next(null);
    this.userId.next(null);
  }

  public getUserByUserName(): void {
    const currentUserObject = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get(this.apiUrl + this.endpointUrl + `users/${currentUserObject.username}`)
      .subscribe((user) => {
        localStorage.setItem('userId', JSON.stringify(user));
        this.userId.next(JSON.parse(localStorage.getItem('userId')));
      });
  }
}
