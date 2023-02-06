import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {GetInTouchComponent} from './blocks/get-in-touch/get-in-touch.component';
import {HeadingSectionComponent} from './blocks/heading-section/heading-section.component';
import {PartnersComponent} from './blocks/partners/partners.component';
import {PhotosComponent} from './blocks/photos/photos.component';
import {ServicesComponent} from './blocks/services/services.component';
import {TestimonialsComponent} from './blocks/testimonials/testimonials.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@app/shared/shared.module';
import {ToastModule} from 'primeng';


@NgModule({
  declarations: [HomeComponent, GetInTouchComponent, HeadingSectionComponent,
    PartnersComponent, PhotosComponent, ServicesComponent, TestimonialsComponent],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        ToastModule
    ]
})
export class HomeModule {
}
