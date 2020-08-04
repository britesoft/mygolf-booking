import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { ModalProvider } from '../../providers/modal/modal';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  @ViewChild(Nav) nav: Nav;
  amountPaid: string;
  paymentMethod: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalService: ModalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  openPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(this.modalService.bookingData)
    console.log()
    let page = this.modalService.bookingData.autoCheckin ? 'CalendarPage': 'CheckInPage';
    localStorage.setItem('bookingData',JSON.stringify(this.modalService.bookingData));
    this.navCtrl.push(page);
  }

  groupChanged(ev:any){
   this.paymentMethod = ev;
   this.modalService.bookingData.paymentMethod = this.paymentMethod;
   console.log(this.paymentMethod)
  }
  
  amountSegmentChanged(event){
    console.log(event.value)
    this.modalService.bookingData.paymentAmmount = this.amountPaid;
  }

  back() {
    // this.slides.lockSwipes(false);
    // console.log('next');
    // this.slides.slidePrev();
    this.navCtrl.pop();
  }
}
