import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CategoriesComponent } from './view/categories/categories.component';
import {DataHandlerService} from './service/data-handler.service';
import { TasksComponent } from './view/tasks/tasks.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule


  ],
  providers: [DataHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
