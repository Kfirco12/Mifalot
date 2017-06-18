import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AF } from "../.././providers/af";
import { ShareService } from "../.././providers/share-service";

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit 
{
  header = 
  { 
     title: 'דו"חות נוכחות', 
     subTitle: "צפייה בהיסטוריית נוכחות החניכים",
     icon: "fa-bar-chart" 
  };

  // Strings
  private chosenDateString: string;
  private pupilPresence: string;
  private datePipe: DatePipe;

  // Flags
  private started: boolean;
  private teamSelected: boolean;
  private dateSelected: boolean;

  // Objects
  private user: Object;   // User details
  private pupils: Object; // Contain the pupils name of the chosen team.
  
  private chosenTeam: Object;
  private chosenDate: Object;

  // DB observable
  private teams: FirebaseListObservable<any>;         // Contain user's teams
  private attendances: FirebaseListObservable<any>;   // Contain user's attendances
  
  // For navbar component
  private backButton;

  // ============================================================

  constructor(private afService: AF, private shareService: ShareService) 
  { 
    // Flags
    this.started = false;
    this.teamSelected = this.dateSelected = false;

    // Strings
    this.chosenTeam = 'בחר קבוצה';
    this.chosenDateString = 'תאריך';

    // Date pipe
    this.datePipe = new DatePipe('en-us');

    // DB observable
    this.teams = this.afService.af.database.list('teams');

    // Initialize button values
    this.backButton = this.shareService.getButton();
    this.shareService.updateBackButton('home');

    // Get user details from AngularFire service
    this.user = this.afService.getUserDetails();
  }

  // ============================================================
  //get the dates from the wanted team.

  getDates(teamId) 
  {
    this.chosenDateString = 'תאריך';

    // Updating flags
    this.dateSelected = false;
    this.teamSelected = this.started = true;

    // Save the chosen team
    this.chosenTeam = teamId;

    // get teame's pupil from DB.
    this.attendances = this.afService.af.database.list('teams/' + teamId + '/attendance');
  }
  
  // ============================================================
  // Get the pupils name from the wanted team.
  
  getPupils(dateId, presence) 
  { 
    // Reset teams represent
    this.started = this.dateSelected = true;
    this.chosenDate = dateId;
    this.chosenDateString = this.datePipe.transform(dateId, 'dd/MM/yyyy');
   
    // Save presence list
    this.pupils = presence;
  }

  // ============================================================
  // Change 'pupilPresence' to 'כן' or 'לא' according to database value

  isPupilPresence(presence)
  {
    if (presence == true)
    {
        this.pupilPresence = "כן";
        return true;
    }
    else
    {
        this.pupilPresence = "לא";
        return false;
    }
  }

  // ============================================================

  pressedOnChooseDate()
  {
    if (!this.teamSelected)
      alert("בחר קודם קבוצה להצגת תאריכי הנוכחות");
  }

  // ============================================================

  navigate()
  {
    this.shareService.navigate('');
  }

  // ===========================================================

  ngOnInit() {}

  // ============================================================

}
