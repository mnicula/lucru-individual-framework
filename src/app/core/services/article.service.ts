import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ArticleModel} from '@app/core/models/article.model';
import {environment} from '@environments/environment';
import {CommentModel} from '@app/core/models/comment.model';
import {CategoryModel} from '@app/core/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  protected apiUrl = environment.apiUrl;
  protected endpointUrl = environment.endpointUrl;

  constructor(private http: HttpClient) {
  }

  public postArticle(data: FormData): Observable<ArticleModel> {
    return this.http.post<ArticleModel>(this.apiUrl + this.endpointUrl + 'articles', data);
  }

  public patchArticle(data, articleId): Observable<ArticleModel> {
    return this.http.patch<ArticleModel>(this.apiUrl + this.endpointUrl + `articles/${articleId}`, data);
  }

  public getArticlesCount(): Observable<number> {
    return this.http.get<number>(this.apiUrl + this.endpointUrl + `articles/count`);
  }

  public postComment(body): Observable<CommentModel> {
    return this.http.post<CommentModel>(this.apiUrl + this.endpointUrl + 'comments', body);
  }

  public getArticlesPerPage(page): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + this.endpointUrl + `articles?page=${page}`, {params: {size: '5'}});
  }

  public getFilteredArticlesPerPage(page, category): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + this.endpointUrl +
      `article-categories/${category}/articles?page=${page}`, {params: {size: '5'}});
  }

  public deleteArticle(articleId): Observable<ArticleModel> {
    return this.http.delete<ArticleModel>(this.apiUrl + this.endpointUrl + `articles/${articleId}`);
  }

  public getArticleById(articleId): Observable<ArticleModel> {
    return this.http.get<ArticleModel>(this.apiUrl + this.endpointUrl + `articles/${articleId}`);
  }

  public deleteComment(commendId: number): Observable<CommentModel> {
    return this.http.delete<CommentModel>(this.apiUrl + this.endpointUrl + `comments/${commendId}`);
  }

  public getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.apiUrl + this.endpointUrl + 'article-categories');
  }

  public getByCategory(category: string, page: number): Observable<ArticleModel[]> {
    return this.http.get<ArticleModel[]>(this.apiUrl + this.endpointUrl + 'article-categories/' + category + `/articles?page=${page}`
      , {params: {size: '5'}});
  }

  public getArticleCategoriesCount(category: string): Observable<number> {
    return this.http.get<number>(this.apiUrl + this.endpointUrl + 'article-categories/' + category + '/articles/count');
  }
}
