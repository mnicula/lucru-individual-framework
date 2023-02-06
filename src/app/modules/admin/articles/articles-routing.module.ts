import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticlesComponent} from '@app/modules/admin/articles/articles.component';
import {ArticleTableComponent} from '@app/modules/admin/articles/article-table/article-table.component';
import {UpdateComponent} from '@app/modules/admin/articles/update/update.component';
import {CreateComponent} from '@app/modules/admin/articles/create/create.component';
import {ReadMoreComponent} from '@app/shared/components/read-more/read-more.component';


const routes: Routes = [
  {path: '' , component: ArticlesComponent, children: [
      {path: '', redirectTo: 'page/1', pathMatch: 'full'},
      {path: 'page/:page', component: ArticleTableComponent},
      {path: 'view/:id', component: ReadMoreComponent},
      {path: 'update/:id', component: UpdateComponent},
      {path: 'add', component: CreateComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
