import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskComponent,
  ],
  imports: [
    QRCodeModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    {provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
