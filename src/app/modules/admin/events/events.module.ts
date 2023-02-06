import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {SharedModule} from '@app/shared/shared.module';
import {EventsComponent} from '@app/modules/admin/events/events.component';
import {EventsTableComponent} from './events-table/events-table.component';
import {EventsUpdateComponent} from './events-update/events-update.component';
import {EventsCreateComponent} from './events-create/events-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import { ViewComponent } from './view/view.component';
import {CoreModule} from '@app/core/core.module';
import {ToastModule} from 'primeng';


@NgModule({
  declarations: [EventsComponent, EventsTableComponent, EventsUpdateComponent, EventsCreateComponent, ViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule,
    CalendarModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule
  ],
  providers: [DatePipe]
})
export class EventsModule {
}
