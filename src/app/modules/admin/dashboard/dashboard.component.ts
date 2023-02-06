import {Component, OnInit} from '@angular/core';
import {UtilityService} from '@app/core/services/utility.service';
import {DashboardService} from '@app/core/services/dashboard.service';
import {environment} from '@environments/environment';
import {DashboardModel, Metrics} from '@app/core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public isOpen: boolean;
  public amount: any;
  public pie: any;
  public sum: any;
  public monthNumber: number;
  public dashboardData: DashboardModel;
  public graphMetrics: Metrics;
  public date: string[] = [];
  public registeredUsers: number[] = [];
  public bookings: number[] = [];
  public usersWhoBooked: number[] = [];

  constructor(private utilityService: UtilityService,
              private dashboardService: DashboardService) {
    this.monthNumber = environment.numberOfMonths;
    this.isOpen = false;
    this.utilityService.getOpen.subscribe((response) => this.isOpen = response);
    this.dashboardService.getDashboardData(this.monthNumber).subscribe((response) => {
      this.dashboardData = response;
      response.metrics.forEach((item) => {
        this.graphMetrics = item;
        this.date.push(this.graphMetrics.date.substr(5, this.graphMetrics.date.length));
        this.registeredUsers.push(this.graphMetrics.registeredUsers);
        this.usersWhoBooked.push(this.graphMetrics.userWhoBooked);
        this.bookings.push(this.graphMetrics.bookings);
        this.amount = {
          labels: [...this.date],
          datasets: [
            {
              label: 'Bookings',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [...this.bookings]
            },
            {
              label: 'Users',
              backgroundColor: '#fdb200',
              borderColor: '#fdb200',
              data: [...this.usersWhoBooked]
            }
          ]
        };
        this.sum = {
          labels: [...this.date],
          datasets: [
            {
              label: 'Registered users',
              backgroundColor: '#30a0a0',
              borderColor: '#30a0a0',
              data: [...this.registeredUsers]
            }
          ]
        };
      });
      this.pie = {
        labels: ['Events', 'Articles'],
        datasets: [
          {
            data: [this.dashboardData.events, this.dashboardData.articles],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
            ]
          }]
      };
    });
  }

  public ngOnInit(): void {
  }

}
