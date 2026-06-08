import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    BrowserModule,
    SharedModule
  ],
  exports:[
    SharedModule,
    BrowserModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
