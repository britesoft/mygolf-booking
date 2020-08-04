import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { chartPage } from './chart';

@NgModule({
  declarations: [
    chartPage,
  ],
  imports: [
    IonicPageModule.forChild(chartPage),
  ],
})
export class ChartPageModule {}
