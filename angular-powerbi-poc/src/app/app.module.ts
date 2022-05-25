import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PowerBIEmbedModule } from 'powerbi-client-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PowerBIEmbedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
