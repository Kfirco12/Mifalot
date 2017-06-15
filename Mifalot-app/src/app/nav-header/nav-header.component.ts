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
  @Input() backButton;

  // To alert father component
  @Output() onUserClicked: EventEmitter<any> = new EventEmitter();

  // ====================================

  constructor(private afService: AF) { }

  // ====================================

  backButtonClicked()
  {
    // Alert to father component
    this.onUserClicked.emit();
  }

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
