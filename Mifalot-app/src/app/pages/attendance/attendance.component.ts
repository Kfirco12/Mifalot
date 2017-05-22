import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from "@angular/router";
import { AF } from "../../providers/af";

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  private noTeamSelected: boolean;

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
  private instructions: string; //injection hml variable.
  private started = false;
  private date = Date.now(); //date variable.
  private teams = new Array;
  private chosenTeam = '';
  private pupils = new Array;  //contain the pupils name of the chosen team.
  private teamKey;
  private pupilsPath;
  private attnend = [];

  //============================
  //============================
  //-------------METHODS-------------
  constructor(private afService: AF,private router: Router) {

    this.uid = afService.getUid();

    //initialize page view.
    this.noTeamSelected = true;
    this.instructions = ":בחר את הקבוצה אותה אתה מאמן";

    //get teams from DB.
    this.getTeamsByUid();

  }

  //---------------------------
  ngOnInit() {
  }

  //----------------------------

  //Connect to the DB and get the team names of the connected user.
  getTeamsByUid() {
    var info = this.afService.af.database.list('teams/', { preserveSnapshot: true });

    info.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if (snapshot.val().coachId == this.uid) {
          this.teams.push(snapshot.val().name);
        }
      })
    })
  }

  //---------------------------
  //get the pupils name from the wanted team.
  getPupils(teamId) {
    //reset teams represent.
    this.noTeamSelected = false;
    this.started = true;
    this.instructions = "לבחירת קבוצה חדשה אפסו את הטופס";
    this.chosenTeam = teamId;

    //get teame's pupil from DB.
    //var info = this.db.database.list('teams/' + teamId + '/pupils', { preserveSnapshot: true });
    var info = this.afService.af.database.list('teams', { preserveSnapshot: true });
    var path_subscribe = info.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if (snapshot.val().name == teamId) {
          this.pupilsPath = this.afService.af.database.list('teams/' + snapshot.key + '/pupils');
          this.teamKey = snapshot.key;
          this.pupilsPath.subscribe(snap2 => {
            snap2.forEach(snap => {
              var pupil = {
                name: snap.name,
                presence: false
              }
              this.pupils.push(pupil);
            })
          })
        }
      })
    })
    path_subscribe.unsubscribe();
  }

  //---------------------------
  //update the checked buttons at run time.
  updateChecked(option, event) {
    //add check.
    if (event.target.checked) {
      for (var _i = 0; _i < this.pupils.length; _i++) {
        if (event.target.value === this.pupils[_i].name) {
          this.pupils[_i].presence = true;
        }
      }
    }
    //remove check.
    else {
      for (var _i = 0; _i < this.pupils.length; _i++) {
        if (event.target.value === this.pupils[_i].name)
          this.pupils[_i].presence = false;
      }
    }
  }



  //---------------------------
  //reset the checked attendance and pick new team.
  startOver() {
    if (this.started) {
      alert("שים לב, הנתונים שהזנת לא נשמרו!");
    }

    // reset variables.
    this.noTeamSelected = true;
    this.started = false;
    this.instructions = ":בחר את הקבוצה אותה אתה מאמן";
    this.attnend = [];
    this.pupils = [];
    this.teams = [];
    this.getTeamsByUid();
    this.chosenTeam = '';

  }

  //----------------------------
  //help method.
  printPupils(list, names) {

    var str = "";

    if (names)
      for (var _i = 0; _i < list.length; _i++) {
        str += list[_i].name + ",  ";
      }
    else
      for (var _i = 0; _i < list.length; _i++) {
        str += list[_i].presence + ",  ";
      }

    return str;
  }

  //----------------------------
  //Missing from 2 or more trainings.
  missingUpdate(path) {
    var datePipe = new DatePipe('en-us');
    var setDob = datePipe.transform(this.date, 'dd/MM/yyyy');
    var changed = false;
    var dates = 0;
    var missed_twiced = [];

    //check if an attendance was checked at the same date of 'date'.
    var path_subscribe = path.subscribe(snapshots => {
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
      var i = 0;
      snapshots.forEach(snapshot => {
        var missing = snapshot.missed;
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
  for(var i = 0; i<arr.length; i++)
    alert(arr[i] + " לא הגיע לאימון יותר מפעמיים!! שים לב וטפל בנושא בהקדם ");
}

  //helping method to reset the missings.
  resetMiss() {
    var path_subscribe = this.pupilsPath.subscribe(snapshots => {
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

    var info = this.afService.af.database.list('teams/' + this.teamKey + '/attendance');
    var toPush = {
      date: this.date,
      presence: this.pupils
    };
    info.push(toPush);
    this.missingUpdate(info);
    this.started = false;
    this.startOver();

  }

}







