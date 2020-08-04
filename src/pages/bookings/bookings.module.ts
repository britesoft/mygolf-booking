import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingsPage } from './bookings';

@NgModule({
  declarations: [
    BookingsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingsPage),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BookingsPageModule {}
