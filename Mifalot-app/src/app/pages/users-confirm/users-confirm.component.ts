import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from "../.././providers/af";


@Component({
  templateUrl: './users-confirm.component.html',
  styleUrls: ['./users-confirm.component.css']
})

export class UsersConfirmComponent implements OnInit 
{
  private header = 
  { 
     title: "אישור משתמשים", 
     subTitle: "עבור על המשתמשים הממתינים לאישורך",
     icon: "fa-users" 
  }

  // Flags
  private userSelected: boolean;
  private userConfirmed: boolean;
  private chooseTeams: boolean;

  // String
  private userType: string;

  // Int
  private userNewPermission: number;

  // Trasnfer user details to 'associate-teams' component
  private userDetails: any;
  private user: any;

  // Observers to DB
  private users: FirebaseListObservable<any[]>;
  private teams: FirebaseListObservable<any[]>;

  // =====================

  constructor(private afService: AF) 
  {
    this.userDetails = [];
    this.userNewPermission = null;

    this.userSelected =  this.userConfirmed = this.chooseTeams = false;
    this.users = this.afService.af.database.list('registeredUsers');
    this.teams = this.afService.af.database.list('teams');
  }

  // =====================

  showUserDetails(user)
  {
    this.user = user;
    this.userSelected = true;
  }

  // =====================
  // Changing user permission to 5
  // Next when user is loggin next time, he will be deleted

  blockUser()
  {
    this.users.update(this.user.$key, { permission: 5 }).then(()  => 
    {
      alert("המשתמש נחסם")
      this.userSelected = false;
      this.user = null;
    });
  }

  // =====================

  confirmUser()
  {
    this.userConfirmed = true;
  }

  // =====================

  showTeams(type)
  {
    this.userType = type;

    this.userDetails[0] = this.user;
    this.userDetails[1] = "users-confirm";
    
    if (type == 'manager')
      this.userDetails[2] = 2;
    else if (type == 'coach')
      this.userDetails[2] = 3;

    this.chooseTeams = true;
  }

  // =====================

  resetAll()
  {
      this.userSelected =  this.userConfirmed = this.chooseTeams = false;
      this.user = this.userType = null;
  }

  // =====================

  userAssociatedTeams(userNewPermission)
  {
    this.userNewPermission = userNewPermission;
  }

  ngOnInit() { }

  // =====================

}