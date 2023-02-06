import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarModule} from 'primeng/sidebar';
import {HttpClientModule} from '@angular/common/http';
import {ClickOutsideModule} from 'ng-click-outside';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {ReadMoreComponent} from './components/read-more/read-more.component';
import {LoaderModule} from '@app/shared/components/loader/loader.module';
import {AdminHeaderComponent} from './components/admin-header/admin-header.component';
import {AdminSidebarComponent} from './components/admin-sidebar/admin-sidebar.component';
import {ToastModule} from 'primeng';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, CarouselComponent,
    ReadMoreComponent, AdminHeaderComponent, AdminSidebarComponent],
    imports: [
        CommonModule,
        SidebarModule,
        FormsModule,
        HttpClientModule,
        ToastModule,
        ClickOutsideModule,
        RouterModule,
        ReactiveFormsModule,
        ScrollingModule
    ],
  exports: [HeaderComponent, SidebarComponent,
    CarouselComponent, ReadMoreComponent, LoaderModule, AdminHeaderComponent, AdminSidebarComponent]
})
export class SharedModule {
}
