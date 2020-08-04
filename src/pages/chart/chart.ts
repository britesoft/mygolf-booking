import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { Nav, IonicPage } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class chartPage implements OnInit {
  @ViewChild(Nav) nav: Nav;
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("booking") doughnutCanvas: ElementRef;
  @ViewChild("totalPax") totalPax: ElementRef;
  @ViewChild("courses") courses: ElementRef;
  @ViewChild("caddies") caddies: ElementRef;
  @ViewChild("members") members: ElementRef;
  @ViewChild("male") male: ElementRef;

  public barChart: Chart;
  public bookingchart: Chart;
  public Pax: Chart;
  public coursesCharts: Chart;
  public caddiesChart: Chart;
  public membersChart: Chart;
  public maleChart: Chart;

  type: any = "line";
  lessThanOrGreaterThan = "lessThan";
  filterLimit = 100;
  thisweek: any = [];
  doughnutChart: any;
  activeClass: any = 'today';
  typeBooking: any = 'pie';
  typeRevenue: any = 'bar';
  typePax: any = 'pie';
  typeCaddies: any = 'doughnut';
  typeCourse: any = 'bar';
  typeMembers: any = 'bar';
  typeMale: any = 'pie';

  date = new Date();

  paxStats: any[] = [{name:'Players(Pax)'},{name:'Paid'},{name:'Pending'},{name:'Checked In'},{name:'In-Play'},{name:'Finished'}];
  paxFlight: any[] = [{value: 400},{value: 100},{value: 200},{value: 100},{value: 40},{value: 10},];
  paxPercentage: any[] = [{value: null},{value: 10},{value: 20},{value: 10},{value: 15},{value: 5},];

  bookingStats: any[] = [{name:'Total Slots'},{name:'Slots Available'},{name:'Total Slots Booked'},{name:'Morning'},{name:'Afternoon'}];
  revenueStats: any[] = [{name:'Total Revenue'},{name:'Morning'},{name:'Afternoon'},{name:'Projected Revenue'}];
  memberStats: any[] = [{name:'Members'},{name:'Guests'},{name:'Total'}];
  maleStats: any[] = [{name:'Male'},{name:'Female'},{name:'Total'}];
  caddiesStats: any[] = [{name:'Male'},{name:'Female'},{name:'Total Buggies'},{name:'Food'}];
  coursesStats: any[] = [{name:'East 1'},{name:'East 2'},{name:'West'},{name:'Total'}];

  constructor() {}

  ngOnInit() {
    this.createtotalpaxChart();
    this.bookingChart();
    this.createChart();
    this.createCoursesChart();
    this.createCaddiesChart();
    this.createMembersChart();
    this.createMaleChart();
    this.maletodayData();
    this.membertodayData();
    this.caddiestodayData();
    this.coursetodayData();
  }
  createtotalpaxChart() {
    let yAxis = this.typePax == 'pie' || this.typePax == 'doughnut' ? false : true;
    this.Pax = new Chart(this.totalPax.nativeElement, {
      type: this.typePax,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Total Players (PAX)",
        },
        scales: {
          yAxes: [
            {
              display: yAxis,
              scaleLabel: {
                display: true,
              },
              ticks: {
                min: 0,
                stepSize: 50,
              },
            },
          ],
        },
      },
      data: {
        labels: [
          "Total Pending",
          "Total Checked In",
          "Total In-Play",
          "Total Finished",
        ],
        datasets: [
          {
            fill: true,
            label: "Pax",
            data: [300, 100, 40, 10],
            backgroundColor: [
              "rgba(153, 102, 255, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(75, 192, 192, 0.8)",
            ],
            spanGaps: false,
          },
        ],
      },
    });
  }

  createMaleChart() {
    let yAxis = this.typeMale == 'pie' || this.typeMale == 'doughnut' ? false : true;
    let chartText = this.verifyMaleName == 'today'? "Today's Male vs Female": this.verifyMaleName == "week"? "This Week's Male vs Female": this.verifyMaleName == "month"? "This Month's Male vs Female":" Future Male vs Female";
    let malechartData = this.verifyMaleName == 'today'? [400,100]: this.verifyMaleName == 'week'?[340,100]: this.verifyMaleName == 'month'? [400,400]: [200,200];
    this.maleChart = new Chart(this.male.nativeElement, {
      type: this.typeMale,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: chartText,
        },
        scales: {
          yAxes: [
            {
              display: yAxis,
              scaleLabel: {
                display: true,
              },
              ticks: {
                min: 0,
                stepSize: 50,
              },
            },
          ],
        },
      },
      data: {
        labels: ["Male", "Female"],
        datasets: [
          {
            fill: true,
            label: "male vs female",
            data: malechartData,
            backgroundColor: [
              "rgba(75, 192, 192, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(255, 99, 132, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(54, 162, 235, 0.8)",
            ],
            spanGaps: true,
          },
        ],
      },
    });
  }

  createMembersChart() {
    let yAxis = this.typeMembers == 'pie' || this.typeMembers == 'doughnut' ? false : true;
    let chartText = this.verifyMemberName == 'today'? "Today's Member": this.verifyMemberName == "week"? "This Week's Members": this.verifyMemberName == "month"? "This Month's Members":" Future Members";
    let memberchartData = this.verifyMemberName == 'today'? [200,300]: this.verifyMemberName == 'week'?[100,100]: this.verifyMemberName == 'month'? [340,100]: [400,400];
    this.membersChart = new Chart(this.members.nativeElement, {
      type: this.typeMembers,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: chartText,
        },
        scales: {
          yAxes: [
            {
              display: yAxis,
              scaleLabel: {
                display: true,
              },
              ticks: {
                min: 0,
                stepSize: 50,
              },
            },
          ],
        },
      },
      data: {
        labels: ["Members", "Guests"],
        datasets: [
          {
            fill: true,
            label: "member vs guest",
            data: memberchartData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(54, 162, 235, 0.8)",
            ],
            spanGaps: true,
          },
        ],
      },
    });
  }

  createCaddiesChart() {
    let yAxis = this.typeCaddies == 'pie' || this.typeCaddies == 'doughnut' ? false : true;
    let chartText = this.verifyCaddiesName == 'today'? "Today's Caddies": this.verifyCaddiesName == "week"? "This Week's Caddies": this.verifyCaddiesName == "month"? "This Month's Caddies":" Future Caddies";
    let caddieschartData = this.verifyCaddiesName == 'today'? [30,170]: this.verifyCaddiesName == 'week'?[300,200]: this.verifyCaddiesName == 'month'? [600,100]: [300,600];
    this.caddiesChart = new Chart(this.caddies.nativeElement, {
      type: this.typeCaddies,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: chartText,
        },
        scales: {
          yAxes: [
            {
              display: yAxis,
              scaleLabel: {
                display: true,
              },
              ticks: {
                min: 0,
                stepSize: 50,
              },
            },
          ],
        },
      },
      data: {
        labels: ["Male", "Female"],
        datasets: [
          {
            fill: true,
            label: "caddies & buggies",
            data: caddieschartData,
            backgroundColor: [
              "rgba(153, 102, 255, 0.8)",
              "rgba(255, 99, 132, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(75, 192, 192, 0.8)",
            ],
            spanGaps: true,
          },
        ],
      },
    });
  }
  createCoursesChart() {
    let yAxis = this.typeCourse == 'pie' || this.typeCourse == 'doughnut' ? false : true;
    let chartText = this.verifyCourseName == 'today'? "Today's Courses": this.verifyCourseName == "week"? "This Week's Courses": this.verifyCourseName == "month"? "This Month's Courses":" Future Courses";
    let coursechartData = this.verifyCourseName == 'today'? [170,30,200]: this.verifyCourseName == 'week'?[50,200,30]: this.verifyCourseName == 'month'? [200,300,100]: [300,100,50];
    this.coursesCharts = new Chart(this.courses.nativeElement, {
      type: this.typeCourse,
      options: {
        legend: {
          display: false,
          hidden:true,
      },
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: chartText,
        },
        scales: {
          yAxes: [
            {
              display: yAxis,
              scaleLabel: {
                display: true,
              },
              ticks: {
                min: 0,
                stepSize: 50,
              },
            },
          ],
        },
      },
      data: {
        labels: ["East 1", "East 2", "West"],
        datasets: [
          {
            fill: true,
            label: "course utilization",
            data: coursechartData,
            backgroundColor: [
              "rgb(126, 198, 34, 0.8)",
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
            ],
            spanGaps: true,
          },
        ],
      },
    });
  }

  bookingChart() {
    let yAxis = this.typeBooking == 'pie' || this.typeBooking == 'doughnut' ? false : true;
   let chartText = this.verifyBookingName == 'today'? "Today's Booking": this.verifyBookingName == "week"? "This Week's Bookings": this.verifyBookingName == "month"? "This Month's Bookings":" Future Bookings";
   let bookingchartData = this.verifyBookingName == "today"? [100,50,50,20,30]: this.verifyBookingName == "week"?[200,100,100,60,40]: this.verifyBookingName == "month"? [300,150,150,60,90]: [400,200,200,120,80];
   let bookedslot = this.verifyBookingName == "today" || this.verifyBookingName == "week" || this.verifyBookingName == "month"? "Total Booked Slots": "Total Future Bookings"
    this.bookingchart = new Chart(this.doughnutCanvas.nativeElement, {
      type: this.typeBooking,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: chartText,
        },
        scales: {
          yAxes: [
            {
              display: yAxis,
              scaleLabel: {
                display: true,
              },
              ticks: {
                min: 0,
                stepSize: 100,
              },
            },
          ],
        },
      },
      data: {
        labels: ["Total Slots","Slots Available", bookedslot ,"Morning", "Afternoon"],
        datasets: [
          {
            fill: true,
            type: this.typeBooking,
            label: "Bookings",
            data: bookingchartData,
            backgroundColor: [
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 99, 132, 0.8)",
            ],
            spanGaps: true,
          },
        ],
      },
    });
  }

  createChart() {
    let yAxis = this.typeRevenue == 'pie' || this.typeRevenue == 'doughnut' ? false : true;
    let chartText = this.verifyRevenueName == 'today'? "Today's Revenue": this.verifyRevenueName == "week"? "This Week's Revenue": this.verifyRevenueName == "month"? "This Month's Revenue":" Future Revenue";
    let revenuechartData1 = this.verifyRevenueName == "today"?[.5,2,2]: this.verifyRevenueName == "week"? [1,3.4,4.6]: this.verifyRevenueName == "month"?[2.7,5,3.5]:[1.5,2.5,3.5];
    let revenuechartData2 = this.verifyRevenueName == "today"? [1,3.4,4.6]: this.verifyRevenueName == "week"?[.5,2,2]: this.verifyRevenueName == "month"? [1.5,2.5,3.5]:[2.7,5,3.5];
    // let bookedslot = this.verifyRevenueName == "today"? "Total Revenue": "Projected Revenue"
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: this.typeRevenue,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: chartText,
        },
        scales: {
          yAxes: [
            {
              display: yAxis,
              scaleLabel: {
                display: true,
              },
              ticks: {
                min: 0,
                stepSize: .5,
              },
            },
          ],
        },
      },
      data: {
        labels: [
          'Monday' , 'Tuesday', 'Wednesday'
        ],
        datasets: [
          {
            showLine: true,
            fill: true,
            label: "AM",
            data: revenuechartData1,
            backgroundColor: [
              "rgb(126, 198, 34, 0.9)",
              "rgb(126, 198, 34, 0.9)",
              "rgb(126, 198, 34, 0.9)",
            ],
              spanGaps: true,
          },
          {
            
            showLine: true,
            fill: true,
            label: "PM",
            data: revenuechartData2,
            backgroundColor: [
              "rgb(126, 198, 34, 0.6)",
              "rgb(126, 198, 34, 0.6)",
              "rgb(126, 198, 34, 0.6)",
            ],
            spanGaps: true,
          },
        ],
      },
    });
  }

   // globally changes Type of chart
   select(value) {
    this.typeBooking = value;
    this.typeCaddies = value;
    this.typeCourse = value;
    this.typePax= value;
    this.typeRevenue = value;
    this.typeMembers = value;
    this.typeMale = value;
    this.selectTypeBooking();
    this.selectTypeCaddies();
    this.selectTypeCourse();
    this.selectTypeMale();
    this.selectTypeMembers();
    this.selectTypePax();
    this.selectTypeRevenue();
  }

  // chart type Functions
  selectRevenueBookingSlotFuture() {
    this.barChart.destroy();
    this.createChart();
  }

  selectTypeRevenue(){
    this.barChart.destroy();
    this.createChart();
  }


  selectTypeBooking(){
    this.bookingchart.destroy();
    this.bookingChart();
  }

  selectTypeCaddies(){
    this.caddiesChart.destroy();
    this.createCaddiesChart();
  }

  selectTypeMembers(){
    this.membersChart.destroy();
    this.createMembersChart();
  }

  selectTypeMale(){
    this.maleChart.destroy();
    this.createMaleChart();
  }

  selectTypePax(){
    this.Pax.destroy();
    this.createtotalpaxChart();
  }

  selectTypeCourse(){
    this.coursesCharts.destroy();
    this.createCoursesChart();
  }

//booking
  verifyBookingName = 'today';
  bookingName:string = "Today's Booking";
  bookingData:any =[{value:100},{value:100},{value:50},{value:20},{value:30}];
  bookingsData(verifyname:string, name:string, data:any){
    this.verifyBookingName = verifyname;
    this.bookingName = name;
    this.bookingData = data;
    this.selectTypeBooking();
  }
  bookingtodayData(value) {
    let data = [{value:100},{value:50},{value:50},{value:20},{value:30}];
    this.bookingsData("today","Today's Booking",data);
  }
   
  bookingthisWeekData(value) {
    let data = [{value:200},{value:100},{value:100},{value:60},{value:40}];
    this.bookingsData("week","This Week's Bookings",data);
  }

  bookingthisMonthData(value) {
    let data = [{value:300},{value:150},{value:150},{value:60},{value:90}];
    this.bookingsData("month","This Month's Bookings",data);
  }

  bookingfutureData(value){
    let data = [{value:400},{value:200},{value:200},{value:120},{value:80}];
    this.bookingsData("future","Future Bookings",data);
  }

  //revenue
  verifyRevenueName = 'today';
  revenueData: any =[{value:123456},{value:90000},{value:33456},{value:1234567}];
  revenueName: any = "Today's Revenue";
  RevenueData(verifyname:string, name:string, data:any){
    this.verifyRevenueName = verifyname;
    this.revenueName = name;
    this.revenueData = data;
    this.selectTypeRevenue();
  }
  revenuetodayData(value) {
    let data = [{value:123456},{value:90000},{value:33456},{value:1234567}];
    this.RevenueData("today", "Today's Revenue", data);
  }
   
  revenuethisWeekData(value) {
    let data = [{vale:456345},{value:5000},{value:356},{value:567566}];
    this.RevenueData("week", "This Week's Revenue", data)
  }

  revenuethisMonthData(value) {
    let data = [{value:13456},{value:6000},{value:336},{value:4567666}];
    this.RevenueData("month", "This Month's Revenue", data)
  }

  revenuefutureData() {
    let data = [{value:15657},{value:6733},{value:3547},{value:14567}];
    this.RevenueData("future", "Future Revenue", data)
  }

 //members
 verifyMemberName = 'today';
 membersData: any =[{value:200},{value:300},{value:500}];
 MemberName: any = "Today's Member";
 memberlastItem: any = '';

 memberData(verifyname:string, name:string, data:any){
  this.verifyMemberName = verifyname;
  this.MemberName = name;
  this.membersData = data;
  this.memberlastItem = this.membersData.pop();
  this.membersData.push(this.memberlastItem);
  this.selectTypeMembers();
 }
  membertodayData() {
     let data = [{value:200},{value:300},{value:500}];
    this.memberData('today', "Today's Member", data)
  }
   
  memberthisWeekData(value) {
    let data = [{value:100},{value:100},{value:200}];
    this.memberData('week', "This Week's Member", data)
  }

  memberthisMonthData(value) {
    let data = [{value:340},{value:100},{value:440}];
    this.memberData('month', "This Month's Member", data);
  }

  memberfutureData(value){
    let data = [{value:400},{value:400},{value:800}];
    this.memberData('future', "Future Member", data);
  }

  //male
  verifyMaleName = 'today';
  maleData: any =[{value:400},{value:100},{value:500}];
  MaleName: any = "Today's Male/Female";
  malelastItem: any = '';
  maledata(verifyname:string, name:string, data:any){
    this.verifyMaleName = verifyname;
    this.MaleName = name;
    this.maleData = data;
    this.malelastItem = this.maleData.pop();
    this.maleData.push(this.malelastItem);
    this.selectTypeMale();
  }
  maletodayData() {
    let data = [{value:400},{value:100},{value:500}];
    this.maledata('today', "Today's Male/Female", data);
  }
   
  malethisWeekData(value) {
    let data = [{value:340},{value:100},{value:440}];
    this.maledata('week', "This Week's Male/Female", data);
  }

  malethisMonthData(value) {
    let data = [{value:400},{value:400},{value:800}];
    this.maledata('month', "This Month's Male/Female", data);
  }

  malefutureData(value){
    let data = [{value:200},{value:200},{value:400}];
    this.maledata('future', "Future Male/Female", data);
  }

  //caddies
  verifyCaddiesName = 'today';  
  caddiesData: any =[{value:30},{value:170},{value:200}];
  CaddiesName: any = "Today's Caddies";
  caddieslastItem: any = '';
  caddieData(verifyname:string, name:string, data:any){
    this.verifyCaddiesName = verifyname;
    this.CaddiesName = name;
    this.caddiesData = data;
    this.caddieslastItem = this.caddiesData.pop();
    this.caddiesData.push(this.caddieslastItem);
    this.selectTypeCaddies();
  }
  caddiestodayData() {
    let data = [{value:30},{value:170},{value:200}];
    this.caddieData('today', "Today's Caddies", data);
  }
   
  caddiesthisWeekData(value) {
    let data =[{value:300},{value:200},{value:500}];
    this.caddieData('week', "This Week's Caddies", data);
  }

  caddiesthisMonthData(value) {
    let data =[{value:600},{value:100},{value:700}];
    this.caddieData('month', "This Month's Caddies", data);
  }

  caddiesfutureData(value){
    let data =[{value:300},{value:600},{value:900}];
    this.caddieData('future', "Future Caddies", data);
  }

  //course
  verifyCourseName = 'today';
  courseData: any =[{value:30},{value:170},{value:200},{value:400}];
  CourseName: any = "Today's Courses";
  courselastItem: any = '';
  coursesData(verifyname:string, name:string, data:any) {
    this.verifyCourseName = verifyname;
    this.CourseName = name;
    this.courseData = data;
    this.courselastItem = this.courseData.pop();
    this.courseData.push(this.courselastItem);
    this.selectTypeCourse();
  }
  coursetodayData() {
    let data =[{value:170},{value:30},{value:200},{value:400}];
    this.coursesData('today', "Today's Courses", data);
  }
   
  coursethisWeekData(value) {
    let data =[{value:50},{value:200},{value:30},{value:280}];
    this.coursesData('week', "This Week's Courses", data);
  }

  coursethisMonthData(value) {
    let data =[{value:200},{value:300},{value:100},{value:600}];
    this.coursesData('month', "This Month's Courses", data);
  }

  coursefutureData(value){
    let data =[{value:300},{value:100},{value:50},{value:450}];
    this.coursesData('future', "Future Courses", data);
  }

}
