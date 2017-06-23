import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AF } from "../../providers/af";
import { ShareService } from "../../providers/share-service";

@Component({
  selector: 'app-teams-management',
  templateUrl: './teams-management.component.html',
  styleUrls: ['./teams-management.component.css']
})

export class TeamsManagementComponent implements OnInit 
{
  header = 
  { 
    title: "הוספת / הסרת קבוצות", 
    subTitle: "ניהול רשימת הקבוצות",
    icon: "fa-server" 
  }

  // Flags
  private addTeams: boolean;
  private removeTeams: boolean;
  private isLoading: boolean;

  // User details
  private user: Object;

  // For nav component
  private backButton;

  // DB observables
  private teams: FirebaseListObservable<any>;

  // Pointer to subscribes
  private teamsSubsPtr;

  // Array
  private teamsToRemove;
  private teamsToAdd;

  // ngModule
  private teamName: string;

  // ==============================

  constructor(private afService: AF, private shareService: ShareService) 
  {
    this.user = this.afService.getUserDetails();

    // Initialize button values
    this.backButton = this.shareService.getButton();
    this.shareService.updateBackButton('home');

    this.initializeAddVariables();
    this.initializeRemoveVariables();
  }

  // ==============================

  chooseTeam()
  {
    this.getTeams();
    this.shareService.updateBackButton('back');
  }

  // ==============================

  showAddTeams()
  {
    this.addTeams = true;
    this.teams = this.afService.af.database.list('teams');
    this.shareService.updateBackButton('back');
  }
  
  // ==============================

  backToAddOrRemove()
  {
    this.initializeAddVariables();
    this.initializeRemoveVariables();

    this.isLoading = false;
    this.unsubscribeAll();
    this.shareService.updateBackButton('home');
  }

  // ==============================

  saveNewTeam()
  {
    // Check if team already exist in temp array
    let index = this.teamsToAdd.indexOf(this.teamName);

    if (index != -1)
    {
      alert('ההוספה אינה אפשרית! קיימת קבוצה עם שם זהה הממתינה להוספה');
      return;
    }

    // Save new team to an array
    this.teamsToAdd.push(this.teamName);

    // Clear input fields
    this.teamName = '';
  }

  // ==============================

  addNewTeamsToDB()
  {
    if (this.teamsToAdd.length == 0)
    {
      alert("אנא הזן לפחות קבוצה אחת");
      return;
    } 

    this.isLoading = true;

    // Check if some teams already exist in DB 
    let teams = this.afService.af.database.list('teams').take(1);
    teams.subscribe(snapshots => 
    {
      for (let i = 0; i < this.teamsToAdd.length; i++)
        snapshots.forEach(snapshot => 
        {
          if (i < this.teamsToAdd.length && snapshot.$key == this.teamsToAdd[i])
          {
            this.teamsToAdd.splice(i, 1);

            if (--i < 0)
              i = 0;
          }
        });

      let length = this.teamsToAdd.length;

      for (let i = 0; i < length; i++)
        this.teams.update(this.teamsToAdd[i] ,{ name: this.teamsToAdd[i], coachID: "", managerID: "" });

      this.isLoading = false;
 
      alert(length + " קבוצות נוספו!");
      
      // Clear all variables
      this.initializeAddVariables();
    })
  }

  // ==============================

  initializeAddVariables()
  {  
    this.addTeams = false;
    this.teamsToAdd = [];

    // Clear input fields
    this.teamName = "";
  }

  // ==============================
  //        Remove Teams
  // ==============================

  initializeRemoveVariables()
  {
    this.teamsToRemove = [];
    this.removeTeams = false;
  }
  
  // ==============================

  showRemoveTeams()
  {
    this.removeTeams = true;
    this.getTeams();
    this.shareService.updateBackButton('back');
  }

  // ==============================
  // Get teams list from DB.

  getTeams()
  {
    this.isLoading = true;
    
    this.teams = this.afService.af.database.list('teams');
    this.teamsSubsPtr = this.teams.subscribe(snap => {
      this.isLoading = false;
    })
  }

  // ==============================

  isChecked(team)
  {
    let index = this.teamsToRemove.indexOf(team);

    // team doesnt exist in array
    if (index == -1) 
      return false;
    
    return true;
  }

  // ==============================

  saveTeamToRemove(team)
  {
    let index = this.teamsToRemove.indexOf(team);

    // team doesnt exist in array
    if (index == -1) 
      this.teamsToRemove.push(team);
    else
      this.teamsToRemove.splice(index, 1);
  }


  // ==============================

  removeTeam(team)
  {
    if (confirm("האם אתה בטוח שברצונך למחוק את " + team.$key + " ?"))
    {
      this.isLoading = true;
      this.teams.remove(team.$key).then(() => this.isLoading = false);

      if (this.teamsToRemove.indexOf(team.$key) != -1)
        this.saveTeamToRemove(team.$key);

      alert(team.$key + " הוסרה בהצלחה!");
    }
  }

  // ==============================

  removeTeamsFromDB()
  {
    let length = this.teamsToRemove.length;
    
    if (length == 0)
    {
      alert("שים לב: לא נבחרו קבוצות להסרה");
      return;
    }

    if (confirm("האם אתה בטוח שברצונך להסיר קבוצות אלו?"))
    {
      this.isLoading = true;

      for (let i = 0; i < length; i++)
       this.teams.remove(this.teamsToRemove[i]);

      this.isLoading = false;
      alert(length +  " קבוצות הוסרו בהצלחה!"); 

      // Reset values
      this.teamsToRemove = [];
    }
  }

  // ==============================

  unsubscribeAll()
  {
    if (this.teamsSubsPtr)
      this.teamsSubsPtr.unsubscribe();
  }

  // ==============================

  navigate()
  {
     // Back to add or remove
    if (this.addTeams || this.removeTeams)
      this.backToAddOrRemove();

    // Navigate to home page
    else
    {
      this.unsubscribeAll();
      this.shareService.navigate('');
    }
  }

  // ==============================

  ngOnInit() { }

  // ==============================


}
