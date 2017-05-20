import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
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
  private date = new Date().toLocaleString()  //date variable.
  private teams = new Array;
  private chosenTeam = '';
  private pupils = new Array;  //contain the pupils name of the chosen team.

  //============================
  //============================
  //-------------METHODS-------------
  constructor(private afService: AF, public db: AngularFire) {

    //bind data sharing.
    this.afService.stream$.subscribe(this.receiveMessage.bind(this));

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
  //recive uid from login page.
  receiveMessage(msg: String) {
    this.uid = msg;
  }


  //Connect to the DB and get the team names of the connected user.
  getTeamsByUid() {
    var info = this.db.database.list('teams/', { preserveSnapshot: true });

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
    var info = this.db.database.list('teams/' + teamId + '/pupils', { preserveSnapshot: true });
    info.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        var pupil = {
          name: snapshot.val().name,
          presence: false
        }
        this.pupils.push(pupil);
      })
    })
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
     this.pupils = [];  
     this.chosenTeam = '';
 
  }

//----------------------------
  //help method.
  printPupils(list,names) {

    var str="";

    if(names)
       for(var _i=0; _i<list.length; _i++){
       str+=list[_i].name+",  ";
     }
    else
      for(var _i=0; _i<list.length; _i++){
       str+=list[_i].presence+",  ";
      } 
    
     return str;
  }
  //---------------------------
  //save the checked attendance and the written note.
  saveAttendance() {

    alert("The chosen team is: " + this.chosenTeam
          + "\n\nThe pupils of the team are: " + this.printPupils(this.pupils,true) 
          + "\n\nthe presence list is: " + this.printPupils(this.pupils,false));
    this.started = false;
    this.startOver();

  }

}







