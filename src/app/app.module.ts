import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CategoriesComponent } from './view/categories/categories.component';
import {DataHandlerService} from './service/data-handler.service';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DataHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
