import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { DateTransformPipe } from './pipes/date-transform.pipe';


@NgModule({
  declarations: [DateTransformPipe],
  exports: [
    DateTransformPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [DateTransformPipe]
})
export class CoreModule {
}
