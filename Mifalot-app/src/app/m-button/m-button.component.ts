import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-m-button',
  templateUrl: './m-button.component.html',
  styleUrls: ['./m-button.component.css']
})
export class MButtonComponent implements OnInit {
@Input() item;
  constructor() { }

  ngOnInit() {
  }

}
