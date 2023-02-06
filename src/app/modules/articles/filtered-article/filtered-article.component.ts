import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticleModel} from '@app/core/models/article.model';
import {ArticleService} from '@app/core/services/article.service';
import {CategoryModel} from '@app/core/models/category.model';
import {PaginationModel} from '@app/core/models/pagination.model';
import {Subscription} from 'rxjs';
import * as _ from 'underscore';
import {UtilityService} from '@app/core/services/utility.service';
import {trigger} from '@angular/animations';
import {fadeIn} from '../../../../../animation';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-filtered-article',
  templateUrl: './filtered-article.component.html',
  styleUrls: ['./filtered-article.component.scss'], animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class FilteredArticleComponent implements OnInit, OnDestroy {
  public categories: CategoryModel[];
  public startPage: number;
  public endPage: number;
  public currentPage: number;
  public pagination: PaginationModel;
  public totalPages = 0;
  public pages = [];
  public subscriptionArticle: Subscription;
  public subscriptionLoad: Subscription;
  public routeCurrent: number;
  public dataLoaded: boolean;
  public filteredArticles: ArticleModel[];
  public categoryActive: string;

  constructor(private route: ActivatedRoute, private article: ArticleService, private utilityService: UtilityService) {
    this.dataLoaded = false;
    this.routeCurrent = 1;
    this.subscriptionArticle = this.route.params.subscribe((params) => {
      const start = params['page'];
      this.currentPage = Number(start - 1);
    });
    this.article.getCategories().subscribe((response) => {
      this.categories = response;
    });
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.categoryActive = params.category;
      this.loadPage(this.currentPage, params.category);
    });
  }

  public init(category): void {
    this.categoryActive = category;
    if (this.filteredArticles) {
      this.loadPage(0, category);
      this.dataLoaded = true;
    } else {
      this.dataLoaded = false;
    }

  }

  ngOnInit() {
  }

  public ngOnDestroy() {
    this.subscriptionArticle.unsubscribe();
    this.subscriptionLoad.unsubscribe();
  }

  public loadPage(page, params): void {
    this.subscriptionLoad = this.article.getArticleCategoriesCount(params).subscribe((res) => {
      if (res !== null) {
        this.totalPages = Math.ceil(res / 5);
        if (this.totalPages <= 9) {
          this.startPage = 0;
          this.endPage = this.totalPages;
        } else {
          if (this.currentPage <= 6) {
            this.startPage = 0;
            this.endPage = 9;
          } else if (this.currentPage + 4 >= this.totalPages) {
            this.startPage = this.totalPages - 9;
            this.endPage = this.totalPages;
          } else {
            this.startPage = this.currentPage - 5;
            this.endPage = this.currentPage + 4;
          }
        }
        if (this.totalPages === 1) {
          this.pages = [0];
        } else {
          this.pages = _.range(this.startPage, this.endPage);
        }
        this.subscriptionArticle = this.article.getFilteredArticlesPerPage(page, params).subscribe(x => {
          if (x) {
            this.filteredArticles = x;
            this.dataLoaded = true;
            this.currentPage = page;
            this.routeCurrent = this.currentPage + 1;
            const startIndex = this.currentPage * 5;
            const endIndex = Math.min(startIndex + 5 - 1, x.length - 1);
            this.pagination = {
              endPage: this.endPage,
              startPage: this.startPage,
              currentPage: this.currentPage,
              startIndex,
              endIndex,
              pages: this.pages,
              totalPages: this.totalPages
            };
          }
        });
      }
    });
  }

  public onRead(id): void {
    this.utilityService.setArticleId(id);
  }

}
