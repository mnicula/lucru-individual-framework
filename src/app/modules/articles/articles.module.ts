import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '@app/shared/shared.module';
import { ArticleComponent } from './article/article.component';
import { FilteredArticleComponent } from './filtered-article/filtered-article.component';


@NgModule({
  declarations: [ArticlesComponent, ArticleComponent, FilteredArticleComponent],
  imports: [
    CommonModule,
    SharedModule,
    ArticlesRoutingModule,
    FormsModule
  ]
})
export class ArticlesModule { }
