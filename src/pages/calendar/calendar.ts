import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, ModalController, AlertController } from 'ionic-angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { BookingDetailModalComponent } from '../../components/booking-detail-modal/booking-detail-modal';
/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage implements OnInit {
  @ViewChild(Nav) nav: Nav;
  search: any;
  constructor( public alrtCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams, private mdlctrl: ModalController) {
   
  }

  @HostListener('ionSlideDidChange') slideChanged() {
   
      // this.timeout();
   
    console.log('Host Element Clicked');
}
  calendarDates = {
    dateFormatter: {

      formatWeekViewHourColumn: function (date: Date) {
        date = new Date(date.setMinutes(date.getMinutes() + 5 ))
        return date.toLocaleTimeString().replace(/:\d+ /, ' ');
        // return date.toLocaleTimeString();
      },
      formatDayViewHourColumn: function (date: Date) {
        date = new Date(date.setMinutes(date.getMinutes() + 5 ))
        return date.toLocaleTimeString().replace(/:\d+ /, ' ');
        // return date.toLocaleTimeString();
      },
    }
  };
  calendarDatesweeks = {
    dateFormatter: {

      formatWeekViewHourColumn: function (date: Date) {
        date = new Date(date.setMinutes(date.getMinutes() + 3 ))
        return date.toLocaleTimeString().replace(/:\d+ /, ' ');
        // return date.toLocaleTimeString();
      },
      formatDayViewHourColumn: function (date: Date) {
        date = new Date(date.setMinutes(date.getMinutes() + 3 ))
        return date.toLocaleTimeString().replace(/:\d+ /, ' ');
        // return date.toLocaleTimeString();
      },
    }
  };


  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
  viewClass = "Week View";
  minDate = new Date().toISOString();
  date = new Date();
  eventSource: any[] = [];
  viewTitle;

  calendar = {
    mode: 'week',
    currentDate: new Date(),
  };
  duration: any = 'month'
  @ViewChild(CalendarComponent, null) myCal: CalendarComponent;
  eventBookingData:any;

  ngOnInit() {
    this.eventBookingData = JSON.parse(localStorage.getItem('bookingData'));
    if(this.eventBookingData){
    this.addEvents();
  }  else
  {
    this.resetEvent();
    this.createRandomEvents();
    this.formatAMPM();
  }
  }

 ionViewWillEnter(){
  
 }

 initSlides(){
 let actin = false;
  setTimeout(() => {
    actin = true;
  
  }, 1000);
  actin = false;
}
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
  minute: any;
  timearr: any;
  formatAMPM() {
    var hours = this.date.getHours();
    var minutes = this.date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    this.minute = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    console.log(strTime)
    return strTime;
  }

  title = 'Booking Slots';
  filterTitle = '';
  course = 'east';
  courseTitle = 'East Course';
  courseSelected(value: any) {
    this.timeout();
    this.openModal = false;
    this.course = value;
    value == 'east' ? this.courseTitle = 'East Course' : value == 'west' ? this.courseTitle = 'West Course' : value == 'north' ? this.courseTitle = 'North Course' : value == 'other' ? this.courseTitle = 'Other Course' : ''
    // this.createRandomEvents();
  }
  // Create the right event format and reload source
  addEvents() {
    // this.timeout();
    this.resetEvent();

    let eventCopy = {
      title: this.eventBookingData.playerName? this.eventBookingData.playerName:'Name',
      startTime:  new Date(this.eventBookingData.slotStartTime),
      endTime:   new Date(this.eventBookingData.slotStartTime),
      allDay: this.event.allDay,
      desc:  this.eventBookingData.arrived,
    }

    // if (eventCopy.allDay) {
    //   let start = eventCopy.startTime;
    //   let end = eventCopy.endTime;

    //   eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
    //   eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    // }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
  }

  option(value: any) {
    this.timeout();
    this.createRandomEvents(value);
  }
  //ramdom event
  createRandomEvents(item?) {
    this.timeout();
    this.removeEvents();
    this.resetEvent();
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var maxplayer = Math.floor(Math.random() * 8);
      var minPlayer = Math.floor(Math.random() * 6);
      var normalPrice = Math.floor(Math.random() * 3);
      var promotionPrice = Math.floor(Math.random() * 7);
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(

            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
       
        item == 'book' ? this.title = 'Booked Slots' : item == 'player' ? this.title = 'Selected Players' : item == 'option' ? this.title = 'Player Option' : item == 'caddies' ? this.title = 'Caddies' : item == 'buggies' ? this.title = 'Buggies' : 'Slots'
        i >=1 && i <= 18 ? this.title = `${i} Slots`: i >=20 && i<=30 ? this.title = 'Sold Out':  '';
        this.filterTitle = this.title;

        events.push({
          title: this.filterTitle,
          startTime: startTime,
          endTime: endTime,
          walkingAllowed: 'yes',
          maxplayer: maxplayer,
          minPlayer: minPlayer,
          normalPrice: normalPrice,
          promotionPrice: promotionPrice
        });
      }
      else {
        var startMinute = Math.floor(Math.random() * 2 * 70);
        var endMinute = Math.floor(Math.random() * 780) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: this.filterTitle,
          startTime: startTime,
          endTime: endTime,
          walkingAllowed: 'No',
          maxplayer: maxplayer,
          minPlayer: minPlayer,
          normalPrice: normalPrice,
          promotionPrice: promotionPrice
        });
      }
    }
    this.eventSource = events;
  }

  filteredEvents = [];
  searchList(value) {
    this.filteredEvents = [];
    if (value) {
      let filteredProperty = this.eventSource.filter((item) => {
        return item.title.toLowerCase().trim().includes(value.toLowerCase());
      });
      this.filteredEvents = filteredProperty;
      console.log('filterevent', this.filteredEvents);
    } else {
      this.filteredEvents = this.eventSource;
      console.log('final', this.filteredEvents);
    }
  }

  removeEvents() {
    this.eventSource = [];
  }

  next() {
    this.timeout();
    let swiper: any = document.querySelectorAll('.swiper-container');
    swiper[0].swiper.slideNext();
    swiper[1].swiper.slideNext();
  }

  back() {
    this.timeout();
    let swiper: any = document.querySelectorAll('.swiper-container');
    swiper[0].swiper.slidePrev();
    swiper[1].swiper.slidePrev();
  }

 
  
  // Change between month/week/day
  openModal: boolean = true;
  changeMode(mode: any) {
     this.timeout();
    console.log(mode)
    this.openModal = false;
    this.calendar.mode = mode;
    mode == 'day' ? this.viewClass = "Day View" : mode == 'week' ? this.viewClass = "Week View" : mode == 'month' ? this.viewClass = "Month View" : '';
  }

  timeout(){
    this.openModal = false;
    setTimeout(() => {
      this.openModal = true;
    }, 1000);
  }
  daview = '';
  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  openEvent(event) {
    // this.onEventSelected(event);
    console.log('open----------------') 
    this.onTimeSelected(event);
  }
  onSelect() {
    this.search = '';
  }
 
 
  // Calendar event was clicked
  async onEventSelected(event?) {
    // this.openModal = true;
    this.search = '';
    // Use Angular date pipe for conversion
    // let start = event.startTime;
    // let end = event.endTime
    console.log('oneventselect', event)
    // let bookModal = this.mdlctrl.create(BookingDetailModalComponent, { event }, {
    //   cssClass: 'my-book-modal',
    //   enableBackdropDismiss: false,
    //   enterAnimation: '',
    //   leaveAnimation: '',
    //   showBackdrop: false
    // });
    // bookModal.onDidDismiss(data => {
    //   console.log(data);
    // });
    // bookModal.present();
  }

  // Time slot was clicked
  ele: any;
  slectedTime: any;
  onTimeSelected(ev?: any, item = '') {
    this.ele = ev;
    // this.openModal = true;
    this.search = '';
    console.log('seldeted', ev);
    this.slectedTime = new Date(ev.selectedTime);
    console.log('selected full time', this.slectedTime)
    this.event.startTime = this.slectedTime.toLocaleTimeString();
    var startTime = this.event.startTime;
    console.log('slectedTime startTime',this.event.startTime)
    this.slectedTime.setMinutes(this.slectedTime.getMinutes() + 10);
    this.event.endTime = (this.slectedTime.toLocaleTimeString());
    var endTime = this.event.endTime;
    console.log('slectedTime endTime',this.event.endTime);
    let component;
    let evt;
    if(this.eventBookingData){
    let arived = this.eventBookingData.arrived;
    arived == 'arrived' || arived == 'ontheway' ? (component = BookingDetailModalComponent, evt = this.eventBookingData) : (component = BookingDetailModalComponent, evt = ev);
    } else{
      component = BookingDetailModalComponent, evt = ev
    }
    let bookModal = this.mdlctrl.create(component, {evt,endTime,}, {
      cssClass: 'my-book-modal',
      enableBackdropDismiss: false,
      enterAnimation: '',
      leaveAnimation: '',
      showBackdrop: false
    });
    bookModal.onDidDismiss(data => {
      console.log(data);
    });
    if(this.openModal){
      ev.events.length > 0 ?  bookModal.present() : this.openPage('BookingsPage');
  }
 }

 openPage(page) {
  // localStorage.clear();
  console.log(this.eventBookingData)
  console.log(page)
  this.navCtrl.push(page,{
   eventData: this.ele,
   selected: this.slectedTime
  });
}
}
