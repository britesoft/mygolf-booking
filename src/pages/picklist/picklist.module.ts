import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PicklistPage } from './picklist';

@NgModule({
  declarations: [
    PicklistPage,
  ],
  imports: [
    IonicPageModule.forChild(PicklistPage),
  ],
})
export class PicklistPageModule {}
