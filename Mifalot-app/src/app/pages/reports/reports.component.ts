import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit 
{
 
  header = 
  { 
     title: 'דו"חות נוכחות', 
     subTitle: "צפייה בהיסטוריית נוכחות החניכים",
     icon: "fa-bar-chart" 
  }

  constructor() { }

  ngOnInit() {
  }

}
