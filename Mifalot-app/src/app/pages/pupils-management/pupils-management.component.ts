import { Component, OnInit } from '@angular/core';
import { AF } from "../../providers/af";

// For take() 
import 'rxjs/Rx';

@Component({
  selector: 'app-pupils-management',
  templateUrl: './pupils-management.component.html',
  styleUrls: ['./pupils-management.component.css']
})


export class PupilsManagementComponent implements OnInit 
{
  header = 
  { 
    title: "הוספת / הסרת חניכים", 
    subTitle: "ניהול רשימת החניכים שבקבוצה",
    icon: "fa-user" 
  }

  // Flags
  private noTeamSelected: boolean;
  private addPupils: boolean;
  private removePupils: boolean;
  private thereIsNewPupil: boolean;

  // Arrays
  private teams;
  private pupilsList;
  private newPupils;
  private pupilsToRemove;

  // Strings
  private choosenTeamText: string;

  // Input strings
  private ValuePupilName: string;
  private ValuePupilLastName: string
  private ValuePupilID: string;

  // Int
  private newPupilsCounter: number;

  // ==============================

  constructor(private afService: AF ) 
  {
    this.noTeamSelected = true;
    this.initializeRemoveVariables();
    this.initializeAddVariables();

    this.ValuePupilName = this.ValuePupilLastName = this.ValuePupilID = '';  
    this.teams = this.afService.getUserTeams().sort();
  }

  // ==============================

  getPupilsByTeam(team)
  {
    this.pupilsList = team.pupils;
    this.choosenTeamText = team.name;

    this.noTeamSelected = false;
  }
 

  // ==============================

  chooseTeam()
  {
      this.noTeamSelected = true;
  }
  
  // ==============================

  showAddPupils()
  {
    this.addPupils = true;
  }

  // ==============================

  saveNewPupil(name, lastName, ID)
  {
    var newPupil = 
    {
      name : name,
      lastName : lastName,
      ID : ID,
      missed : 0
    }

    // Check if user already exist in temp array
    var isExist = false;

    for (var i = 0; i < this.newPupils.length; i++)
      if (this.newPupils[i].name == newPupil.name && this.newPupils[i].lastName == newPupil.lastName && this.newPupils[i].ID == newPupil.ID)
        isExist = true;

    if (isExist)
    {
        this.ValuePupilName = this.ValuePupilLastName = this.ValuePupilID = null;
        return;
    }

    // Save new pupil to an array
    this.newPupils.push(newPupil);

    this.ValuePupilName = this.ValuePupilLastName = this.ValuePupilID = null;    

    this.newPupilsCounter++;
    this.thereIsNewPupil = true;
  }

  // ==============================

  addNewPupilsToDB()
  {
    if (!this.thereIsNewPupil)
    {
      alert("אנא הזן לפחות חניך אחד");
      return;
    } 

    var team = this.afService.af.database.list('teams/' + this.choosenTeamText + '/pupils', { preserveSnapshot: true });

    for (var i = 0; i < this.newPupils.length; i++)
      team.update(this.newPupils[i].ID ,{ name: this.newPupils[i].name, lastName: this.newPupils[i].lastName, ID: this.newPupils[i].ID, missed: 0 });

      alert(this.newPupils.length + " חניכים נוספו לקבוצה! ");
      
       // Clear all variables
      this.initializeAddVariables();
  }

  // ==============================

  initializeAddVariables()
  {
    
    this.addPupils = this.thereIsNewPupil = false;

    this.newPupils = [];
    this.newPupilsCounter = 0;

    this.ValuePupilName = this.ValuePupilLastName = this.ValuePupilID = null;    

    this.choosenTeamText = "רשימת קבוצות";
  }

  // ===================================================================
  // ************************** REMOVE PUPILS **************************
  // ===================================================================

  initializeRemoveVariables()
  {
    this.pupilsList = this.pupilsToRemove = [];
    this.removePupils = false;
  }

  // ==============================

  showRemovePupils()
  {
    this.pupilsList = this.afService.af.database.list('teams/' + this.choosenTeamText + '/pupils');
    this.removePupils = true;
  }

  // ==============================

  removePupil(pupil)
  {
    this.pupilsList.remove(pupil.$key);
    alert(pupil.name + " " + pupil.lastName + " הוסר בהצלחה!");
  }

  // ==============================

  savePupilToRemove(pupil)
  {
    var index = this.pupilsToRemove.indexOf(pupil.$key);

    // pupil doesnt exist in array
    if (index == -1) 
    {
      this.pupilsToRemove.push(pupil.$key);
      this.newPupilsCounter++;
    }    
    else
    {
      this.pupilsToRemove.splice(index, 1);
      this.newPupilsCounter--;
    }

    // Updating counter & flag
    if (this.pupilsToRemove.length == 0)
    {
      this.newPupilsCounter = 0;
      this.thereIsNewPupil = false;
    }
    else
      this.thereIsNewPupil = true;
  }

  // ==============================

  removePupilsFromDB()
  {
    var length = this.pupilsToRemove.length;
    
    if (length == 0)
    {
      alert("שים לב: לא נבחרו חניכים להסרה");
      return;
    }

    for (var i = 0; i < length; i++)
      this.pupilsList.remove(this.pupilsToRemove[i]);

    alert(length +  " חניכים הוסרו בהצלחה!");

    // Reset values
    this.noTeamSelected = true;
    this.initializeRemoveVariables();
    // this.initializeAddVariables();

  }

  // ==============================

  isChecked(pupil)
  {
    var index = this.pupilsToRemove.indexOf(pupil.$key);

    // pupil doesnt exist in array
    if (index == -1) 
      return false;
    
    return true;
  }

  // ==============================

  ngOnInit() { }

  // ==============================


}
