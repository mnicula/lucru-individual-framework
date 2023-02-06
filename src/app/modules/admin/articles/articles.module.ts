import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArticlesRoutingModule} from './articles-routing.module';
import {SharedModule} from '@app/shared/shared.module';
import {ArticlesComponent} from '@app/modules/admin/articles/articles.component';
import {ArticleTableComponent} from '@app/modules/admin/articles/article-table/article-table.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MessageService, ToastModule} from 'primeng';

@NgModule({
  declarations: [ArticlesComponent, ArticleTableComponent, UpdateComponent, CreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    ToastModule,
    ArticlesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ArticlesModule {
}
