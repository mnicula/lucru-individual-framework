import {Component, OnInit} from '@angular/core';
import {EventsService} from '@app/core/services/events.service';
import {EventModel} from '@app/core/models/event.model';
import {UtilityService} from '@app/core/services/utility.service';
import {PaginationModel} from '@app/core/models/pagination.model';
import {Subscription} from 'rxjs';
import * as _ from 'underscore';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '@app/core/services/toast.service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss']
})
export class EventsTableComponent implements OnInit {
  public events: EventModel[] = [];
  public data: boolean;
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

  constructor(private eventsService: EventsService, private utilityService: UtilityService, private route: ActivatedRoute,
              private toast: ToastService, private router: Router) {
    this.data = false;
    this.isOpen = false;
    this.utilityService.getOpen.subscribe((open) => this.isOpen = open);
    this.subscriptionArticle = this.route.params.subscribe((params) => {
      const start = params['page'];
      this.currentPage = Number(start - 1);
    });
    this.loadPage(this.currentPage);
  }

  ngOnInit() {
  }

  public loadPage(page): void {
    this.subscriptionLoad = this.eventsService.getEventsCount().subscribe((res) => {
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
        this.subscriptionArticle = this.eventsService.getEventsPerPage(page).subscribe(x => {
          if (x) {
            this.events = x;
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

  public onUpdate(object): void {
    this.utilityService.setObject(object);
  }

  public onOpen(id, index): void {
    this.id = id;
    this.index = index;
  }

  public onDelete(id: number, index: number) {
    this.subscriptionDelete = this.eventsService.deleteEvent(id).subscribe((response) => {
      this.events.splice(index, 1);
      this.toast.toastSuccess('You have deleted an event!');
      if (this.events.length === 0) {
        this.route.params.subscribe((params) => {
          const start = params['page'];
          this.loadPage(Number(start - 1));
        });
        this.data = false;
        setTimeout(() => {
          this.router.navigate([`/admin/events/page/${Number(this.routeCurrent - 1)}`]);
        }, 0);
      } else {
        this.route.params.subscribe((params) => {
          const start = params['page'];
          this.loadPage(Number(start - 1));
        });
      }
    });
  }

  public parseDate(value) {
    return new Date(value);
  }
}
