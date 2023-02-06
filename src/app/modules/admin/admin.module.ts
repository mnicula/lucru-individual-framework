import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {SharedModule} from '@app/shared/shared.module';
import {ChartModule} from 'primeng';
import {DashboardComponent} from '@app/modules/admin/dashboard/dashboard.component';


@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChartModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
