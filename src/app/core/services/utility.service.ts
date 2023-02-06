import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ArticleModel} from '@app/core/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  public display: BehaviorSubject<boolean>;
  public getDisplay: Observable<boolean>;
  public subscribe: BehaviorSubject<boolean>;
  public getSubscribe: Observable<boolean>;
  public element: BehaviorSubject<any>;
  public getElement: Observable<any>;
  private open: BehaviorSubject<boolean>;
  public getOpen: Observable<boolean>;
  private object: BehaviorSubject<ArticleModel>;
  public getObject: Observable<ArticleModel>;
  private articleId: BehaviorSubject<number>;
  public getArticleId: Observable<number>;
  private articleLength: BehaviorSubject<number>;
  public getArticleLength: Observable<number>;

  constructor() {
    this.display = new BehaviorSubject<boolean>(false);
    this.getDisplay = this.display.asObservable();
    this.subscribe = new BehaviorSubject<boolean>(false);
    this.getSubscribe = this.subscribe.asObservable();
    this.element = new BehaviorSubject<any>(null);
    this.getElement = this.element.asObservable();
    this.open = new BehaviorSubject<boolean>(false);
    this.getOpen = this.open.asObservable();
    this.object = new BehaviorSubject<ArticleModel>({
      content: '',
      title: '',
      id: 0,
      commentDtos: [],
      imageUrl: '',
      image2: '',
      category: ''
    });
    this.getObject = this.object.asObservable();
    this.articleId = new BehaviorSubject<number>(null);
    this.getArticleId = this.articleId.asObservable();
    this.articleLength = new BehaviorSubject<number>(null);
    this.getArticleLength = this.articleLength.asObservable();
  }

  public setDisplay(value): void {
    this.display.next(value);
  }

  public setSubscribe(value): void {
    this.subscribe.next(value);
  }

  public setElement(value): void {
    this.element.next(value);
  }

  public setOpen(value): void {
    this.open.next(value);
  }

  public setObject(value): void {
    this.object.next(value);
  }

  public setArticleId(id): void {
    this.articleId.next(id);
  }

  public setArticleLength(value: number): void {
    this.articleLength.next(value);
  }

}
