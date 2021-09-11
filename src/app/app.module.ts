import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollectionsComponent } from './collections/collections.component';
import { StatechangesComponent } from './statechanges/statechanges.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DocumentsComponent } from './documents/documents.component';
import { ShirtService } from './services/shirt.service';
import { CodeBlockComponent } from './code-block/code-block.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';

@NgModule({
  declarations: [
    AppComponent,
    CollectionsComponent,
    StatechangesComponent,
    NavbarComponent,
    DocumentsComponent,
    CodeBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HighlightModule,
    HighlightPlusModule
  ],
  providers: [
    ShirtService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        //lineNumbersLoader: () => import("highlightjs-line-numbers.js"), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml')
        }
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
