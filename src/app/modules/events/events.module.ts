import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import {SharedModule} from '@app/shared/shared.module';
import { EventComponent } from './event/event.component';
import { PaymentComponent } from './payment/payment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng';
import {ViewComponent} from '@app/modules/events/view/view.component';


@NgModule({
  declarations: [EventsComponent, EventComponent, PaymentComponent, ViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule,
    CheckboxModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule
  ]
})
export class EventsModule { }
