import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from "../.././providers/af";


@Component({
  selector: 'app-users-confirm',
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

  // Array
  private selectedTeams;

  private user: any;
  private users: FirebaseListObservable<any[]>;
  private teams: FirebaseListObservable<any[]>;

// =====================

  constructor(private afService: AF) 
  {
    this.userSelected =  this.userConfirmed = this.chooseTeams = false;
    this.selectedTeams = [];
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
// Changing user permission to 0
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
  this.chooseTeams = true;
}

// =====================

saveTeamToAssociate(team)
  {
    var index = this.selectedTeams.indexOf(team);

    // pupil doesnt exist in array
    if (index == -1) 
    {
      this.selectedTeams.push(team); 
    }    
    else
    {
      this.selectedTeams.splice(index, 1);
    }

  }

  // ==============================

isChecked(team)
{
  var index = this.selectedTeams.indexOf(team);

  // team doesnt exist in array
  if (index == -1) 
    return false;
  
  return true;
}
  
// =====================

associateTeamsToUser()
{
  var length = this.selectedTeams.length;
    
  if (length == 0)
  {
    alert("אנא בחר לפחות קבוצה אחת");
    return;
  }

  // field to update inside the choosen team
  var field = this.userType + "ID";

  for (var i = 0; i < length; i++)
    this.teams.update(this.selectedTeams[i].name, { coachID : this.user.$key });

  alert(length +  " קבוצות שויכו בהצלחה!");

  // Updating user permission acording to his type
  this.updateUserPermission();
}

// =====================

updateUserPermission()
{
  var newPermission;

  if (this.userType == "coach")
    newPermission = 3;
  else
    newPermission = 2;

  this.users.update(this.user.$key, {permission: newPermission});
}

// =====================

resetAll()
{
    this.userSelected =  this.userConfirmed = this.chooseTeams = false;
    this.user = this.userType = null;
    this.selectedTeams = [];
}

// =====================

ngOnInit() { }

// =====================

}