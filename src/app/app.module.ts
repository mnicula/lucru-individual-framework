import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './core/interceptors/error.interceptor';
import {JwtInterceptor} from './core/interceptors/jwt.interceptor';
import {RequestInterceptor} from '@app/core/interceptors/request.interceptor';
import {MessageService} from 'primeng';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
