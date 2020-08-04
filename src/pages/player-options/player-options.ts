import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, ModalController } from 'ionic-angular';
import { PlayerOptionModalComponent } from '../../components/player-option-modal/player-option-modal';

/**
 * Generated class for the PlayerOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-options',
  templateUrl: 'player-options.html',
})
export class PlayerOptionsPage {
  @ViewChild(Nav) nav: Nav;
  covidMessage: boolean = true;
  caddies: number = 1;
  buggies: number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerOptionsPage');
  }

  remove(item: any){
    item == 'caddies' ? this.caddies == this.caddies-- : this.buggies == this.buggies--;
  }

  add(item: any){
    item == 'caddies'? this.caddies == this.caddies++ : this.buggies == this.buggies++;
  }

  segmentChanged(event){
    console.log(event.value)
  }

  toggle(event) {
  console.log(event.value)
  }

  openModal() {
    let playerModal = this.modalCtrl.create(PlayerOptionModalComponent, { userId: 8675309 }, {
      showBackdrop: false,
      enableBackdropDismiss: false,
      enterAnimation: '',
      leaveAnimation: '',
      cssClass: 'my-modal'});
      playerModal.onDidDismiss(data => {
      console.log(data);
    });
    playerModal.present();
  }
 
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page)
    this.navCtrl.push(page);
  }

}
