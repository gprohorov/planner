import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CategoriesComponent } from './view/categories/categories.component';
import {DataHandlerService} from './service/data-handler.service';
import { TasksComponent } from './view/tasks/tasks.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule

  ],
  providers: [DataHandlerService],
  entryComponents: [EditTaskDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
