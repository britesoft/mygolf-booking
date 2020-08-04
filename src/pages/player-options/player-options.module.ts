import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerOptionsPage } from './player-options';

@NgModule({
  declarations: [
    PlayerOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerOptionsPage),
  ],
})
export class PlayerOptionsPageModule {}
