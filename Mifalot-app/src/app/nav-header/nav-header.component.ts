import { Component, OnInit } from '@angular/core';
import { AF } from "../providers/af";

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit 
{
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
