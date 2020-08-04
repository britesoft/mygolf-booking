import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { ModalProvider } from '../../providers/modal/modal';

/**
 * Generated class for the CheckInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-in',
  templateUrl: 'check-in.html',
})
export class CheckInPage {
  @ViewChild(Nav) nav: Nav;
  arrived: any;
  checkin: any = 1;
  autoCheckin:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalService: ModalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInPage');
  }

  groupChanged(ev:any){
    console.log(ev)
   }

   remove(){
    this.checkin == this.checkin--;
  }

   add(){
    this.checkin == this.checkin++;
  }

  checkinAuto(ev:any){
   console.log(this.autoCheckin)
  }

  amountSegmentChanged(event){
    console.log(event.value)
  }

  openPage(page){
    this.modalService.bookingData.checkInPlayers = this.checkin;
    this.modalService.bookingData.arrived = this.arrived;
    this.modalService.bookingData.autoCheckin = this.autoCheckin;
    this.storeDataLocalStorage();
    this.navCtrl.setRoot(page)
}

 storeDataLocalStorage() {
   localStorage.setItem('bookingData',JSON.stringify(this.modalService.bookingData));
 }

 back() {
  // this.slides.lockSwipes(false);
  // console.log('next');
  // this.slides.slidePrev();
  this.navCtrl.pop();
}

}
