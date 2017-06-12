import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AF } from "../providers/af";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit 
{
  // Get info from father
  @Input() button;

  // To alert father component
  @Output() onUserAssociateTeamsToUser: EventEmitter<any> = new EventEmitter();

  // ====================================

  constructor(private afService: AF) { }

  // ====================================

  logout() 
  {
    if (confirm("האם אתה בטוח שברצונך להתנתק?"))
      this.afService.logout();
  }

  // ====================================

  ngOnInit() { }

  // ====================================

}
