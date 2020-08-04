// import { HttpClient } from '@angular/common/';
import { Injectable } from '@angular/core';
/*
  Generated class for the ModalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ModalProvider {

  constructor() {
    console.log('Hello ModalProvider Provider');
  }

  bookingData: any = {
    'slotStartTime':'',
    'slotEndTime':'',
    'golfPlayers':'',
    'playingHoles':'',
    'bookForSomeone': null,
    'playerName': '',
    'mg2uId': '',
    'buggies':'',
    'caddies':'',
    'buggieSeating':'',
    'driver':'',
    'caddieParing':'',
    'favoriteCaddy':'',
    'paymentMethod':'',
    'paymentAmmount':'',
    'checkInPlayers':'',
    'arrived': null,
    'autoCheckin': null,

  }

}
