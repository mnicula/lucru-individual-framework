import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookingComponent} from './booking.component';
import {DetailsComponent} from '@app/modules/booking/details/details.component';
import {BookRoomComponent} from '@app/modules/booking/book-room/book-room.component';


const routes: Routes = [
  {
    path: '', component: BookingComponent, children: [
      {path: '', component: DetailsComponent},
      {path: ':id', component: BookRoomComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {
}
