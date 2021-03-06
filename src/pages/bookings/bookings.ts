import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Slides, ViewController, ModalController } from 'ionic-angular';
import { PlayerOptionModalComponent } from '../../components/player-option-modal/player-option-modal';
import { ModalProvider } from '../../providers/modal/modal';

/**
 * Generated class for the BookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class BookingsPage {
  @ViewChild(Slides) slides: Slides;
  togglebtn: boolean = true;
  event: any;
  index: any = null;
  bookForOthers: boolean = true;
  golfHoles: any;
  playerName: any;
  mg2uId: any;
  constructor(public viewCtrl: ViewController, private modalService: ModalProvider,
    public navCtrl: NavController, public modalCtrl: ModalController,
    private params: NavParams) {
    this.event = this.params.data;
    console.log('all data----', this.event)
   
    // this.modalService.bookingData.slotEndTime = this.event.endTime;

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad HomePage');
  }

  ngOnInit() {
    // this.modalService.bookingData.slotStartTime = this.event.eventData.selectedTime? this.event.eventData.selectedTime: null;

    // this.slides.lockSwipes(true);
    // let currentIndex = this.slides.getActiveIndex();
    // console.log(currentIndex)
  }
  //booking
  bookings: any = 0;
  caddies: any = 0;
  buggies: any = 0;

  remove(item: any) {
    item == 'caddies' ? this.caddies == this.caddies-- : item == 'booking' ? this.bookings == this.bookings-- : item == 'buggies' ? this.buggies == this.buggies-- : null;
  }

  add(item: any) {
    item == 'caddies' ? this.caddies == this.caddies++ : item == 'booking' ? this.bookings == this.bookings++ : item == 'buggies' ? this.buggies == this.buggies++ : null;
  }



  segmentChanged(event) {
    console.log(event.value)
  }

  toggle(event) {
    console.log(event.value)
  }
  addPlayerToggle() {
    this.togglebtn = !this.togglebtn;
    this.modalService.bookingData.golfHoles = this.golfHoles;
    this.modalService.bookingData.playerName = this.playerName;
  }
  toggleCancel() {
    this.playerName = '';
    this.mg2uId = '';
    this.togglebtn = !this.togglebtn;
  }
  dismiss() {
    this.viewCtrl.dismiss(this.event);
  }

  slideChanged() {
    this.index = this.slides.getActiveIndex();
    console.log('Current index is', this.index);
  }
  submit() {
    this.modalService.bookingData.golfPlayers = this.bookings;
    this.modalService.bookingData.bookForSomeone = this.bookForOthers;
    this.modalService.bookingData.golfHoles = this.golfHoles;
    this.modalService.bookingData.playerName = this.playerName;
    this.modalService.bookingData.mg2uId = this.mg2uId;
    this.modalService.bookingData.caddies = this.caddies;
    this.modalService.bookingData.buggies = this.buggies;
    console.log(this.modalService.bookingData);
  }
  nextPage() {
    this.submit();
    console.log(this.modalService.bookingData)
    this.openPage('PaymentPage')
  }
  back() {
    // this.slides.lockSwipes(false);
    // console.log('next');
    // this.slides.slidePrev();
    this.navCtrl.popToRoot();
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page)
    this.navCtrl.push(page);
  }
  driverValue: any;
  openModal() {
    let playerModal = this.modalCtrl.create(PlayerOptionModalComponent, { userId: 8675309 }, {
      showBackdrop: false,
      enableBackdropDismiss: false,
      enterAnimation: '',
      leaveAnimation: '',
      cssClass: 'my-modal'
    });
    playerModal.onDidDismiss(data => {
      console.log(data)
      this.driverValue = data;
    });
    playerModal.present();
  }

}
