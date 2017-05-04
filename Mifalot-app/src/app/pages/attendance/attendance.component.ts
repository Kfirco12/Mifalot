import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

 pupils = [
  {
    name: 'כפיר כהן'
  },
  {
    name: 'דודי חקקיאן'
  },
  {
    name:'מתן אנקונה'
  },
  {
    name:'בנימין חורי'
  }
];

  constructor() { }
 date =  new Date().toLocaleString()
  ngOnInit() {
  }

}
