import { Component, OnInit } from '@angular/core';
import { AF } from "../.././providers/af";

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

  constructor(private afService: AF) 
  { 
    
  }

  ngOnInit() {
  }

}
