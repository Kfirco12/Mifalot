import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
myList = [
  {
    id:1,
    txt:'נוכחות'
  },
  {
    id:2,
    txt:'דו"חות'
  },
  {
    id:3,
    txt:'הודעות'
  },
  {
    id:4,
    txt:'פרופיל'
  },
  {
    id:5,
    txt: 'התנתקות'
  }
];
  constructor() { }

  ngOnInit() {
  }

}
