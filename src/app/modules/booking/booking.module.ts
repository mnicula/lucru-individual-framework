import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import {SharedModule} from '@app/shared/shared.module';
import { BookRoomComponent } from './book-room/book-room.component';
import { DetailsComponent } from './details/details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CalendarModule, ToastModule} from 'primeng';


@NgModule({
  declarations: [BookingComponent, BookRoomComponent, DetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    BookingRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    ToastModule
  ],
  providers: [DatePipe]
})
export class BookingModule { }
