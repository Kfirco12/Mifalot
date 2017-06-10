import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from ".././providers/af";
import {Output}       from '@angular/core'
import {EventEmitter} from '@angular/core'

@Component({
  selector: 'app-associate-teams',
  templateUrl: './associate-teams.component.html',
  styleUrls: ['./associate-teams.component.css']
})

export class AssociateTeamsComponent implements OnInit 
{
  // userDetails[0] = user object
  // userDetails[1] = the name of the component who activated this selector
  // userDetails[2] = user permission
  @Input() userDetails;

  // To alert father component
  @Output() onUserAssociateTeamsToUser: EventEmitter<any> = new EventEmitter();

  // Array
  private selectedTeams;

  // Observer to teams in DB 
  private teams: FirebaseListObservable<any[]>;

  // ===================

  constructor(private afService: AF) 
  {
    this.selectedTeams = [];
    this.teams = this.afService.af.database.list('teams');
  }

  // ===================

  saveTeamToAssociate(team)
  {
    let index = this.selectedTeams.indexOf(team);

    // Team doesnt exist in array
    if (index == -1) 
      this.selectedTeams.push(team);   
    else
      this.selectedTeams.splice(index, 1);
  }

  // =====================

  isChecked(team)
  {
    let index = this.selectedTeams.indexOf(team);

    // team doesnt exist in array
    if (index == -1) 
      return false;
    
    return true;
  }
    
  // =====================

  associateTeamsToUser()
  {
    let length = this.selectedTeams.length;
      
    if (length == 0)
    {
      alert("אנא בחר לפחות קבוצה אחת");
      return;
    }

    // ---------------------------------------------------------
    // TO CHECK: how to pass variable field inside 'update' func

    // field to update inside the choosen team
    // var field;

    // if (this.user.permission == 3)
    //   field = "coachID";
    // else if (this.user.permission == 2)
    //   field = "managerID";

    // for (var i = 0; i < length; i++)
    //   this.teams.update(this.selectedTeams[i].name, { field : this.user.$key });

    // ---------------------------------------------------------
    // userDetails[2] is user permission
    if (this.userDetails[2] == 3)
    {
      for (let i = 0; i < length; i++)
        this.teams.update(this.selectedTeams[i].name, { 'coachID' : this.userDetails[0].$key });
    }
    else if (this.userDetails[2] == 2)
    {
      for (let i = 0; i < length; i++)
        this.teams.update(this.selectedTeams[i].name, { 'managerID' : this.userDetails[0].$key });
    }

    // Changing user permission if needed to
    this.updateUserPermission();

    // Alert to father component
    this.onUserAssociateTeamsToUser.emit(this.userDetails[2]);

    this.selectedTeams = [];
    alert(length +  " קבוצות שויכו בהצלחה!");

  }

  // =====================

  updateUserPermission()
  {
    // This component called from 'users-confirm' component
    if (this.userDetails[1] == 'users-confirm')
    {
      let user = this.afService.af.database.object('registeredUsers/' + this.userDetails[0].$key);
      user.update({ 'permission' : this.userDetails[2] });
    }
  }

  // =====================

  ngOnInit() { }

  // =====================


}
