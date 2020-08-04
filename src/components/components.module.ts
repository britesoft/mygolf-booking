import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlayerOptionModalComponent } from './player-option-modal/player-option-modal';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { BookingDetailModalComponent } from './booking-detail-modal/booking-detail-modal';
import { SlotsDetailComponent } from './slots-detail/slots-detail';
@NgModule({
	declarations: [PlayerOptionModalComponent,
    BookingDetailModalComponent,
    SlotsDetailComponent],
	imports: [
		CommonModule,
		IonicModule,
	],
	entryComponents:[ PlayerOptionModalComponent,
    BookingDetailModalComponent,
    SlotsDetailComponent],
	exports: [PlayerOptionModalComponent,
    BookingDetailModalComponent,
	SlotsDetailComponent],
	schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
