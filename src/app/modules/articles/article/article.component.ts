import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleModel} from '@app/core/models/article.model';
import {ArticleService} from '@app/core/services/article.service';
import {UtilityService} from '@app/core/services/utility.service';
import * as _ from 'underscore';
import {PaginationModel} from '@app/core/models/pagination.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {fadeIn} from '../../../../../animation';
import {trigger} from '@angular/animations';
import {CategoryModel} from '@app/core/models/category.model';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class ArticleComponent implements OnInit, AfterViewInit, OnDestroy {
  public articles: ArticleModel[] = [];
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

  constructor(private article: ArticleService,
              private utilityService: UtilityService,
              private route: ActivatedRoute) {
    this.dataLoaded = false;
    this.routeCurrent = 1;
    this.subscriptionArticle = this.route.params.subscribe((params) => {
      const start = params['page'];
      this.currentPage = Number(start - 1);
    });
    this.loadPage(this.currentPage);
    this.article.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  public ngOnDestroy() {
    this.subscriptionArticle.unsubscribe();
    this.subscriptionLoad.unsubscribe();
  }

  public loadPage(page): void {
    this.subscriptionLoad = this.article.getArticlesCount().subscribe((res) => {
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
        this.subscriptionArticle = this.article.getArticlesPerPage(page).subscribe(x => {
          if (x) {
            this.articles = x;
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


  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    if (this.articles.length > 0) {
      this.articles.forEach((item) => {
        const el = document.getElementById(item.id);
        const wordArray = el.innerHTML.split(' ');
        while (el.scrollHeight > el.offsetHeight) {
          wordArray.pop();
          el.innerHTML = wordArray.join(' ') + '...';
        }
      });
    }
  }

  public onRead(id): void {
    this.utilityService.setArticleId(id);
  }

}
