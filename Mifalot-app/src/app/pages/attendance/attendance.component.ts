import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from "@angular/router";
import { AF } from "../../providers/af";

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

  //============================
  //============================
  //-------------VARIABLES-------------

  private uid; //connected uid.
  private started = false;
  private date = Date.now(); //date variable.
  private teams: FirebaseListObservable<any>;
  private pupils: FirebaseListObservable<any>;
  private chosenTeam = '';
  private teamKey;
  private pupilsPath;

  private noTeamSelected: boolean;

  // User details
  private user;

  // For navbar component
  private button;

  //============================
  //============================
  //-------------METHODS-------------
  constructor(private afService: AF,private router: Router) 
  {

    this.uid = afService.getUid();

    // Initialize button values
    this.button = { name: "דף הבית" , icon: "fa-home" };

    //initialize page view.
    this.noTeamSelected = true;

    //get teams from DB.
    this.teams = this.afService.af.database.list('teams/');

    this.user = 
    { 
      uid: null,
      email: null,
      name: null,
      lastName: null,
      ID: null,
      permission: null, 
      phoneNumber: null
    };

    this.afService.getUserDetails(this.user);
  }

  //---------------------------
  ngOnInit() {
  }


  //---------------------------
  //get the pupils name from the wanted team.
  getPupils(team) 
  {  
    // Save presence list
    this.pupils = this.afService.af.database.list('teams/' + team.$key + '/pupils');

     //reset teams represent.
    this.noTeamSelected = false;
    this.started = true;

    this.updateButton('חזור', 'fa-chevron-left');
  }

  //---------------------------
  //update the checked buttons at run time.
  updateChecked(option, event) {
    //add check.
    // if (event.target.checked) {
    //   for (let _i = 0; _i < this.pupils.length; _i++) {
    //     if (event.target.value === this.pupils[_i].ID) {
    //       this.pupils[_i].presence = true;
    //     }
    //   }
    // }
    // //remove check.
    // else {
    //   for (let _i = 0; _i < this.pupils.length; _i++) {
    //     if (event.target.value === this.pupils[_i].ID)
    //       this.pupils[_i].presence = false;
    //   }
    // }
  }



  //---------------------------
  //reset the checked attendance and pick new team.
  startOver() 
  {
    if (this.started) {
      alert("שים לב, הנתונים שהזנת לא נשמרו!");
    }

    // reset variables.
    this.noTeamSelected = true;
    this.started = false;
    this.chosenTeam = '';

  }

  //----------------------------
  //help method.
  printPupils(list, names) {

    let str = "";

    if (names)
      for (let _i = 0; _i < list.length; _i++) {
        str += list[_i].name + ",  ";
      }
    else
      for (let _i = 0; _i < list.length; _i++) {
        str += list[_i].presence + ",  ";
      }

    return str;
  }

  //----------------------------
  //Missing from 2 or more trainings.
  missingUpdate(path) {
    let datePipe = new DatePipe('en-us');
    let setDob = datePipe.transform(this.date, 'dd/MM/yyyy');
    let changed = false;
    let dates = 0;
    let missed_twiced = [];

    //check if an attendance was checked at the same date of 'date'.
    let path_subscribe = path.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if (setDob == datePipe.transform(snapshot.date, 'dd/MM/yyyy')) {
          dates++;
        }
      })
    })
    path_subscribe.unsubscribe();

    //check if there is more than one today's date.
    if (dates > 1) {
      changed = true;
    }

    //update if needed.
    path_subscribe = this.pupilsPath.subscribe(snapshots => {
      let i = 0;
      snapshots.forEach(snapshot => {
        let missing = snapshot.missed;
        if (this.pupils[i].presence == false && !changed) {
          missing++;
          this.pupilsPath.update(snapshot.$key, { missed: missing });
          if(missing >=2)
           missed_twiced.push(this.pupils[i].name);
        }
        else if(this.pupils[i].presence == true)
          this.pupilsPath.update(snapshot.$key, { missed: 0 });
        
        i++;
      })
    })
    path_subscribe.unsubscribe();
    this.missChecking(missed_twiced);
    this.router.navigate(['']);
  }


//check if a pupil missed more than two trainings and alert if needed.
missChecking(arr){
  if(arr.length == 0)
    return;
  for(let i = 0; i<arr.length; i++)
    alert(arr[i] + " לא הגיע לאימון יותר מפעמיים!! שים לב וטפל בנושא בהקדם ");
}

  //helping method to reset the missings.
  resetMiss() {
    let path_subscribe = this.pupilsPath.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.pupilsPath.update(snapshot.$key, { missed: 0 });
      })
    })
    path_subscribe.unsubscribe();
  }

  //---------------------------
  //save the checked attendance and the written note.
  saveAttendance() {

    alert("The chosen team is: " + this.chosenTeam
      + "\n\nThe pupils of the team are: " + this.printPupils(this.pupils, true)
      + "\n\nthe presence list is: " + this.printPupils(this.pupils, false));

    let info = this.afService.af.database.list('teams/' + this.teamKey + '/attendance');
    let toPush = {
      date: this.date,
      presence: this.pupils
    };
    info.push(toPush);
    this.missingUpdate(info);
    this.started = false;
    this.startOver();

  }

  // ============================================================

  navigate()
  {
    if (this.noTeamSelected)
      this.afService.navigate('');

    // reset variables.
    this.noTeamSelected = true;
    this.updateButton('דף הבית', 'fa-home');
  }

  // ============================================================

  updateButton(name, icon)
  {
    this.button.name = name;
    this.button.icon = icon;
  }
  
  // ============================================================

}







