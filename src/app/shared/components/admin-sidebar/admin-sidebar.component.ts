import {Component, OnInit} from '@angular/core';
import {MenusModel} from '@app/core/models/menus.model';
import {UtilityService} from '@app/core/services/utility.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  public menus: MenusModel[];
  public isOpen: boolean;

  constructor(private utilityService: UtilityService, public router: Router) {
    this.isOpen = false;
    this.utilityService.getOpen.subscribe((response) => this.isOpen = response);
    this.menus = [
      {
        label: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        route: './dashboard'
      },
      {
        label: 'Articles',
        icon: 'far fa-newspaper',
        route: './articles'
      },
      {
        label: 'Events',
        icon: 'fas fa-calendar-alt',
        route: './events'
      },
      {
        label: 'Booking',
        icon: 'fas fa-tasks',
        route: './booking'
      }
    ];
  }

  ngOnInit() {
  }

}
