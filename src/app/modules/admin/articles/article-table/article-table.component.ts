import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleModel} from '@app/core/models/article.model';
import {UtilityService} from '@app/core/services/utility.service';
import {ArticleService} from '@app/core/services/article.service';
import {PaginationModel} from '@app/core/models/pagination.model';
import * as _ from 'underscore';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '@app/core/services/toast.service';

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.scss']
})
export class ArticleTableComponent implements OnInit, OnDestroy {
  public articles: ArticleModel[];
  public isOpen: boolean;
  public index: number;
  public id: number;
  public startPage: number;
  public endPage: number;
  public currentPage: number;
  public pagination: PaginationModel;
  public totalPages = 0;
  public pages = [];
  public subscriptionArticle: Subscription;
  public subscriptionLoad: Subscription;
  public subscriptionDelete: Subscription;
  public routeCurrent: number;
  public data: boolean;

  constructor(private utilityService: UtilityService, private article: ArticleService,
              private route: ActivatedRoute, private router: Router, private toastService: ToastService) {
    this.isOpen = false;
    this.data = false;
    this.routeCurrent = 1;
    this.subscriptionArticle = this.route.params.subscribe((params) => {
      const start = params['page'];
      this.currentPage = Number(start - 1);
    });
    this.loadPage(this.currentPage);
  }


  public ngOnInit(): void {
    this.utilityService.getOpen.subscribe((response) => this.isOpen = response);

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
            this.data = true;
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

  public ngOnDestroy() {
    if (this.subscriptionArticle) {
      this.subscriptionArticle.unsubscribe();
    }
    if (this.subscriptionLoad) {
      this.subscriptionLoad.unsubscribe();
    }
    if (this.subscriptionDelete) {
      this.subscriptionDelete.unsubscribe();
    }
  }

  public onRead(id): void {
    this.utilityService.setArticleId(id);
  }

  public onDelete(id, index): void {
    this.subscriptionDelete = this.article.deleteArticle(id).subscribe((response) => {
      this.articles.splice(index, 1);
      if (this.articles.length === 0) {
        this.route.params.subscribe((params) => {
          const start = params['page'];
          this.loadPage(Number(start - 1));
        });
        this.data = false;
        setTimeout(() => {
          this.router.navigate([`/admin/articles/page/${Number(this.routeCurrent - 1)}`]);
          this.toastService.toastSuccess('You have deleted an article!');
        }, 0);
      } else {
        this.route.params.subscribe((params) => {
          const start = params['page'];
          this.loadPage(Number(start - 1));
          this.toastService.toastSuccess('You have deleted an article!');
        });
      }
    });
  }

  public onUpdate(object): void {
    this.utilityService.setObject(object);
  }

  public onOpen(id, index): void {
    this.id = id;
    this.index = index;
  }
}
