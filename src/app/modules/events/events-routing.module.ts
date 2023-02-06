import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { EventsComponent } from './events.component';
import {EventComponent} from '@app/modules/events/event/event.component';
import {PaymentComponent} from '@app/modules/events/payment/payment.component';
import {ViewComponent} from '@app/modules/events/view/view.component';


const routes: Routes = [
  {path: '', component: EventsComponent, children: [
      {path: '' , component: EventComponent},
      {path: 'payment/:id', component: PaymentComponent},
      {path: ':id', component: ViewComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
