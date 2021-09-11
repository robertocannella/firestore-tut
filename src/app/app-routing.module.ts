import { CodeBlockComponent } from './code-block/code-block.component';
import { DocumentsComponent } from './documents/documents.component';
import { CollectionsComponent } from './collections/collections.component';
import { StatechangesComponent } from './statechanges/statechanges.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
      {
        path: 'statechanges',
        component: StatechangesComponent
      },
      {
        path: 'collections',
        component: CollectionsComponent
       },
      {
        path: 'documents',
        component: DocumentsComponent
      },
      {
        path: 'code-block',
        component: CodeBlockComponent
      },
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
