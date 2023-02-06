import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsComponent} from '@app/modules/admin/events/events.component';
import {EventsTableComponent} from '@app/modules/admin/events/events-table/events-table.component';
import {EventsUpdateComponent} from '@app/modules/admin/events/events-update/events-update.component';
import {EventsCreateComponent} from '@app/modules/admin/events/events-create/events-create.component';
import {ViewComponent} from '@app/modules/admin/events/view/view.component';


const routes: Routes = [
  {path: '', component: EventsComponent, children: [
      {path: '', redirectTo: 'page/1', pathMatch: 'full'},
      {path: 'page/:page', component: EventsTableComponent},
      {path: 'view/:id', component: ViewComponent},
      {path: 'update/:id', component: EventsUpdateComponent},
      {path: 'add', component: EventsCreateComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
