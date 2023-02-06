import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ArticlesComponent} from './articles.component';
import {ReadMoreComponent} from '@app/shared/components/read-more/read-more.component';
import {ArticleComponent} from '@app/modules/articles/article/article.component';
import {FilteredArticleComponent} from '@app/modules/articles/filtered-article/filtered-article.component';


const routes: Routes = [
  {
    path: '', component: ArticlesComponent, children: [
      {path: '', redirectTo: 'page/1', pathMatch: 'full'},
      {path: 'page/:page', component: ArticleComponent},
      {path: 'filter/page/:page', component: FilteredArticleComponent},
      {path: 'id/:id', component: ReadMoreComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {
}
