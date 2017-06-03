import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from "../.././providers/af";

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit 
{
  private header = 
  { 
     title: "ניהול משתמשים פעילים", 
     subTitle: "שינוי וחסימת משתמשים פעילים",
     icon: "fa-users" 
  }

  // Flags
  private userSelected: boolean;
  private showUserTeams: boolean;

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
    this.userSelected = this.showUserTeams = false;
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
  // Changing user permission to 5 to block him 
  // Release all teams that he had owned

  blockUser()
  {
    this.users.update(this.user.$key, { permission: 5 }).then(()  => 
    {
      this.teams.subscribe((snapshots) => 
      {
        snapshots.forEach((snapshot) => 
        { 
          // Coach
          if (this.user.permission == 3)
          {
            if (this.user.$key == snapshot.coachID)
              this.teams.update(snapshot.$key, {coachID: ''});
          }
          // Manager
          else if (this.user.permission == 2)
          {
            if (this.user.$key == snapshot.managerID)
              this.teams.update(snapshot.$key, {managerID: ''});
          }
        })
      })
      alert("המשתמש נחסם וכל הקבוצות שהיו תחתיו התפנו")
      this.userSelected = false;
    });
  }

  // =====================

  showTeams()
  {
    // Save user details
    this.userDetails[0] = this.user;
    this.userDetails[1] = 'users-management';
    this.userDetails[2] = this.user.permission;

    this.showUserTeams = true;
  }

  // =====================

  backToUserInfo()
  {
    this.showUserTeams = false;
  }
    
  // =====================

  backToUsersList()
  {
    this.userDetails = [];
    this.userSelected = this.showUserTeams = false;
  }

  // =====================

  ngOnInit() { }

}
