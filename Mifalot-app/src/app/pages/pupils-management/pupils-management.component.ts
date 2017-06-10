import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AF } from "../../providers/af";

// For take() 
// import 'rxjs/Rx';

@Component({
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

  // DB observables
  private teams: FirebaseListObservable<any>;

  // Arrays
  private pupilsList;
  private newPupils;
  private pupilsToRemove;

  // User details
  private userObject;

  // Strings
  private choosenTeamText: string;

  // Inputs ngModel
  private pupilName: string;
  private pupilLastName: string
  private pupilID: number;

  // Int
  private newPupilsCounter: number;

  // ==============================

  constructor(private afService: AF ) 
  {
    this.noTeamSelected = true;
    this.choosenTeamText = "רשימת קבוצות";

    this.userObject = 
    { 
      uid: null,
      email: null,
      name: null,
      lastName: null,
      ID: null,
      permission: null, 
      phoneNumber: null
    };

    this.initializeRemoveVariables();
    this.initializeAddVariables();

    this.pupilName = this.pupilLastName =  '';
    this.pupilID = null;

    this.teams = this.afService.af.database.list('teams');
    this.afService.getUserDetails(this.userObject);
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

  backToAddOrRemove()
  {
    this.initializeAddVariables();
    this.initializeRemoveVariables();
  }

  // ==============================

  saveNewPupil()
  {
    let newPupil = 
    {
      name : this.pupilName,
      lastName : this.pupilLastName,
      ID : this.pupilID,
      missed : 0
    }

    // Check if user already exist in temp array
    let isExist = false;

    for (let i = 0; i < this.newPupils.length; i++)
      if (this.newPupils[i].ID == newPupil.ID)
        isExist = true;

    if (isExist)
    {
      alert('ההוספה אינה אפשרית! קיים כבר חניך עם תעודת זהות זו הממתין להוספה');
      
      return;
    }

    // Save new pupil to an array
    this.newPupils.push(newPupil);

    // Clear input fields
    this.pupilName = this.pupilLastName =  '';
    this.pupilID = null;  

    // Updating variables
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

    let team = this.afService.af.database.list('teams/' + this.choosenTeamText + '/pupils', { preserveSnapshot: true });

    for (let i = 0; i < this.newPupils.length; i++)
      team.update('' + this.newPupils[i].ID ,{ name: this.newPupils[i].name, lastName: this.newPupils[i].lastName, ID: this.newPupils[i].ID, missed: 0 });

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

    // Clear input fields
    this.pupilName = this.pupilLastName =  '';
    this.pupilID = null;    
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
    this.savePupilToRemove(pupil);
    alert(pupil.name + " " + pupil.lastName + " הוסר בהצלחה!");
  }

  // ==============================

  savePupilToRemove(pupil)
  {
    let index = this.pupilsToRemove.indexOf(pupil.$key);

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
    let length = this.pupilsToRemove.length;
    
    if (length == 0)
    {
      alert("שים לב: לא נבחרו חניכים להסרה");
      return;
    }

    for (let i = 0; i < length; i++)
      this.pupilsList.remove(this.pupilsToRemove[i]);

    alert(length +  " חניכים הוסרו בהצלחה!");

    // Reset values
    this.pupilsToRemove = [];
  }

  // ==============================

  isChecked(pupil)
  {
    let index = this.pupilsToRemove.indexOf(pupil.$key);

    // pupil doesnt exist in array
    if (index == -1) 
      return false;
    
    return true;
  }

  // ==============================

  ngOnInit() { }

  // ==============================


}
