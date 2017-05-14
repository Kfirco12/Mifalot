import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '.././home/home.component';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AF } from "../.././providers/af";


@Component({
  selector: 'app-users-confirm',
  templateUrl: './users-confirm.component.html',
  styleUrls: ['./users-confirm.component.css']
})
export class UsersConfirmComponent implements OnInit 
{

  header = 
  { 
     title: "אישור משתמשים", 
     subTitle: "עבור על המשתמשים הממתינים לאישורך",
     icon: "fa-users" 
  }

  private permission;
  users: FirebaseListObservable<any[]>;

  constructor(private afService: AF, private hc: HomeComponent) 
  {
    this.permission = hc.getPermission();
    this.users = afService.af.database.list('registeredUsers');
  }


  ngOnInit() {
  }

}
