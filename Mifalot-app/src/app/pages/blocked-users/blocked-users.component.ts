import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent implements OnInit 
{
  private header = 
  { 
     title: "משתמשים חסומים", 
     subTitle: "צפייה ועריכת המשתמשים החסומים",
     icon: "fa-user-times" 
  }

  constructor() { }

  ngOnInit() {
  }

}
