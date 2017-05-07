import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  date: string;
  
  constructor() 
  {
     this.date =  new Date().toLocaleString();
  }

  ngOnInit() {
  }

}
