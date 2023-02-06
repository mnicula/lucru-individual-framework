import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from '@app/modules/admin/admin.component';
import {DashboardComponent} from '@app/modules/admin/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', component: AdminComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard' , component: DashboardComponent},
      {path: 'articles' , loadChildren: './articles/articles.module#ArticlesModule'},
      {path: 'events' , loadChildren: './events/events.module#EventsModule'},
      {path: 'booking' , loadChildren: './booking/booking.module#BookingModule'}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
