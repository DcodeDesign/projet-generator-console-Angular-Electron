import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActionsWindowComponent } from './shared/components/ActionTopBar/actions-window.component';
import { NavigationsComponent } from './shared/components/navigations/navigations.component';
import { NihiiComponent } from './pages/nihii/nihii.component';
import { SsinComponent } from './pages/ssin/ssin.component';
import { UuidComponent } from './pages/uuid/uuid.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    ActionsWindowComponent,
    NavigationsComponent,
    NihiiComponent,
    SsinComponent,
    UuidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
