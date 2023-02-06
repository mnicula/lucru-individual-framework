import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookingRoutingModule} from './booking-routing.module';
import {BookingComponent} from '@app/modules/admin/booking/booking.component';
import {BookingCreateComponent} from '@app/modules/admin/booking/booking-create/booking-create.component';
import {BookingTableComponent} from '@app/modules/admin/booking/booking-table/booking-table.component';
import {BookingUpdateComponent} from '@app/modules/admin/booking/booking-update/booking-update.component';
import {SharedModule} from '@app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [BookingComponent, BookingCreateComponent, BookingTableComponent, BookingUpdateComponent, ViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    BookingRoutingModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class BookingModule {
}
