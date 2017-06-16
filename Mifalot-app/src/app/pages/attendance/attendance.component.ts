import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from "@angular/router";
import { AF } from "../../providers/af";
import { ShareService } from "../../providers/share-service";


@Component({
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent implements OnInit 
{
  header =
  {
    title: "רשימת נוכחות",
    subTitle: "בחר את קבוצת האימון ומלא את רשימת הנוכחות",
    icon: "fa-pencil-square-o"
  }

  // Boolean
  private noTeamSelected: boolean;

  // Date
  private date: number;

  // Array
  private pupils: Array<any>;

  // String
  private teamKey: string;

  // DB observables
  private teams: FirebaseListObservable<any>;
  private pupilsPath: any;

  // User details
  private user;

  // For navbar component
  private backButton;

  // ============================================================

  constructor(private afService: AF, private router: Router, private shareService: ShareService) 
  {
    this.pupils = [];
    this.date = Date.now();

    // Initialize button values
    this.backButton = this.shareService.getButton();
    this.shareService.updateBackButton('home');

    // Initialize page view
    this.noTeamSelected = true;

    //get teams from DB.
    this.teams = this.afService.af.database.list('teams/');

    // Get user details from AngularFire service
    this.user = this.afService.getUserDetails();  
  }

  // ============================================================
  // Get the pupils name from the wanted team

  getPupils(team) 
  {  
    // Save presence list
    //this.pupils = this.afService.af.database.list('teams/' + team.$key + '/pupils');

     // Reset teams represent.
    this.noTeamSelected = false;
    this.shareService.updateBackButton('back');

    // Save presence list
    this.pupilsPath = this.afService.af.database.list('teams/' + team.$key + '/pupils').take(1);
    this.teamKey = team.$key;	

    this.pupilsPath.subscribe(snapshots => 
    {		
      snapshots.forEach(snapshot => 
      {		
        let pupil = 
        {		
          name: snapshot.name,		
          lastName: snapshot.lastName,		
          ID: snapshot.ID,		
          presence: false		
        }

        // Adding pupil to pupils array
        this.pupils.push(pupil);
      })		
    })
  }

  // ============================================================
  // Update the checked buttons at run time

  updateChecked(pupil, event) 
  {
    let index = this.pupils.indexOf(pupil);

    // Add check
    if (event.target.checked) 
      this.pupils[index].presence = true;
    // Remove check.
    else
      this.pupils[index].presence = false;
  }

  // ============================================================
  // Reset the checked attendance

  startOver() 
  {
    if (confirm("לאפס דף זה? הנתונים שהזנת לא ישמרו!"))
      this.resetAllChecked();
  }

  // ============================================================
  // Missing from 2 or more trainings

  missingUpdate(attendance) 
  {
    let datePipe = new DatePipe('en-us');
    let setDob = datePipe.transform(this.date, 'dd/MM/yyyy');
    let changed = false;
    let dates = 0;
    let missed_twiced = [];

    let path = attendance.take(1);

    // Check if an attendance was checked at the same date of 'date'.
    path.subscribe(snapshots => 
    {
      snapshots.forEach(snapshot => 
      {
        if (setDob == datePipe.transform(snapshot.date, 'dd/MM/yyyy'))
          dates++;
      })
    })

    // Check if there is more than one today's date.
    if (dates > 1)
      changed = true;

    // Update if needed.
    this.pupilsPath.subscribe(snapshots => 
    {
      let i = 0;
      snapshots.forEach(snapshot => 
      {
        let missing = snapshot.missed;

        if (this.pupils[i].presence == false && !changed) 
        {
          missing++;
          this.pupilsPath.update(snapshot.$key, { missed: missing });

          if (missing >= 2)
           missed_twiced.push(this.pupils[i].name);
        }
        else if (this.pupils[i].presence == true)
          this.pupilsPath.update(snapshot.$key, { missed: 0 });
        
        i++;
      })
    })

    this.missChecking(missed_twiced);
  }

  // ============================================================
  // Check if a pupil missed more than two trainings and alert if needed

  missChecking(arr)
  {
    for (let i = 0; i < arr.length; i++)
      alert(arr[i] + " לא הגיע לאימון יותר מפעמיים!! שים לב וטפל בנושא בהקדם ");
  }

  // ============================================================
  // Save the checked attendance and the written note

  saveAttendance() 
  {
    // DB observable
    let attendance = this.afService.af.database.list('teams/' + this.teamKey + '/attendance');

    let attendanceInfo = 
    {
      date: this.date,
      presence: this.pupils
    };

    // Push attendace info to DB
    attendance.push(attendanceInfo).then(() => 
    {
      alert('רשימת הנוכחות נשמרה בהצלחה!');
      this.missingUpdate(attendance);

      // Reset variables.
      this.noTeamSelected = true;
      this.resetAllChecked();
    });
  }

  // ============================================================

  resetAllChecked()
  {
   this.pupils.forEach((item) => {
        item.presence = false;
      })
  }

  // ============================================================

  navigate()
  {
    if (this.noTeamSelected)
      this.shareService.navigate('');

    // reset variables.
    this.noTeamSelected = true;
    this.shareService.updateBackButton('home');
  }

  // ============================================================

  ngOnInit() { }

  // ============================================================

}







