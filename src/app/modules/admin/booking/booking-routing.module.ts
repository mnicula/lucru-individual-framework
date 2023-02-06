import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookingComponent} from '@app/modules/admin/booking/booking.component';
import {BookingTableComponent} from '@app/modules/admin/booking/booking-table/booking-table.component';
import {BookingUpdateComponent} from '@app/modules/admin/booking/booking-update/booking-update.component';
import {BookingCreateComponent} from '@app/modules/admin/booking/booking-create/booking-create.component';
import {ViewComponent} from '@app/modules/admin/booking/view/view.component';


const routes: Routes = [
  {path: '', component: BookingComponent, children: [
      {path: '', redirectTo: 'page/1', pathMatch: 'full'},
      {path: 'page/:page', component: BookingTableComponent},
      {path: 'view/:id', component: ViewComponent},
      {path: 'update/:id', component: BookingUpdateComponent},
      {path: 'add', component: BookingCreateComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
