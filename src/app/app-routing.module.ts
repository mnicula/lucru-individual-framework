import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '@app/core/guards/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: './modules/home/home.module#HomeModule'},
  {path: 'articles', loadChildren: './modules/articles/articles.module#ArticlesModule'},
  {path: 'events', loadChildren: './modules/events/events.module#EventsModule'},
  {path: 'booking', loadChildren: './modules/booking/booking.module#BookingModule'},
  {path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
