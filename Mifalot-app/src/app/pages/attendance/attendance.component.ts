import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AF } from "../../providers/af";

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent implements OnInit 
{
  private noTeamSelected: boolean;

  header = 
  {  
    title: "רשימת נוכחות", 
    subTitle: "בחר את קבוצת האימון ומלא את רשימת הנוכחות", 
    icon: "fa-pencil-square-o" 
  }
   

  //teams from DB.*********************************************************
  teams = [
    {
      name: 'בית"ר',
      members: [
        {
          name: 'כפיר כהן',
        },
        {
          name: 'דודי חקקיאן',
        },
        {
          name: 'מתן אנקונה',
        },
        {
          name: 'בנימין חורי',
        },
                {
          name: 'כפיר כן',
        },
        {
          name: 'דודי חקקין',
        },
        {
          name: 'מתן אנונה',
        },
        {
          name: 'בנימין ורי',
        },
                {
          name: 'כפ כהן',
        },
        {
          name: 'דודי קיאן',
        },
        {
          name: 'מתן אקונה',
        },
        {
          name: 'בני חורי',
        }
      ]
    },
    {
      name: 'מכבי',
      members: [
        {
          name: 'תומר',
        },
        {
          name: 'ראובן',
        },
        {
          name: 'הדס',
        }
      ]
    }
  ];


  note : String; //coach's note/
  instructions: string; //injection hml variable.
  date = new Date().toLocaleString()  //date variable.
  presence = [];  //true/false array. mark attendance by the index of the pupils list.
  pupils = [];  //contain the pupils name of the chosen team.
  teams_names = []; //get the coach's teams names.
  toStore = {team:'', members:[], attend:[]};
  private started = false;
  private usr: String;

  //============================
  //============================
  constructor(private af: AF, db: AngularFireDatabase) 
  {
<<<<<<< HEAD
    this.noTeamSelected = true;
    this.uid = af.getUid();
    this.relative = db.list('/registeredUsers/'+this.uid);
    // alert(this.uid);
    // alert(this.relative);

    this.instructions = ":בחר את הקבוצה אותה אתה מאמן";
=======
    this.af.stream$.subscribe(this.receiveMessage.bind(this));
    this.instructions = ":בחר\\י את הקבוצה אותה את\\ה מאמן\\ת כעת";
>>>>>>> 9dcb9dbc523882640dabb15cfbbac2a13211a050
    //get the teams names from the DB array.
    //this.teams = af.database.list('/Users/Teams');
    for (var _i = 0; _i < this.teams.length; _i++) {
      var name = this.teams[_i];
      this.teams_names.push(name)
    }

  }

  //---------------------------
  ngOnInit() {
  }


    receiveMessage(msg : string) {
       this.usr = msg;
    }
  //---------------------------
  //update the checked buttons at run time.
  updateChecked(option, event) {
    //add check.
    if (event.target.checked) {
      for (var _i = 0; _i < this.presence.length; _i++) {
        if (event.target.value === this.pupils[_i].name) {
          this.presence[_i] = true;
        }
      }
    }
    //remove check.
    else {
      for (var _i = 0; _i < this.presence.length; _i++) {
        if (event.target.value === this.pupils[_i].name)
          this.presence[_i] = false;
      }
    }
  }

  //---------------------------
  //get the pupils name from the wanted team.
  getPupils(id) 
  {
    this.noTeamSelected = false;

    this.started = true;
    this.instructions = "לבחירת קבוצה חדשה אפסו את הטופס";
    this.toStore.team = id; //save the chosen team.

    for (var _i = 0; _i < this.teams.length; _i++) {
      if (id === this.teams[_i].name) {
        this.pupils = this.teams[_i].members;
        //this.teams_names = [];
        for (var _j = 0; _j < this.pupils.length; _j++) {
          this.presence.push(false);
        }
        break;
      }
    }
  }

  //---------------------------
  //reset the checked attendance and pick new team.
  startOver() 
  {
    if(this.started)
    {
      alert("שים לב, הנתונים שהזנת לא נשמרו!");
    }
    
    // reset variables.
    this.noTeamSelected = true;
    this.started = false;
    this.toStore.team = '';
    this.toStore.members = [];
    this.toStore.attend = [];
    this.presence = [];  
    this.pupils = [];  
    this.teams_names = []; 
    this.note="";

    //get the teams names from the DB array.
    for (var _i = 0; _i < this.teams.length; _i++) 
    {
      var name = this.teams[_i];
      this.teams_names.push(name)
    }

  }

//temporary help method.
  printPupils(list){
    var str="";
    for(var _i=0; _i<list.length; _i++){
      str+=list[_i].name+" "
    }
    return str;
  }
  //---------------------------
  //save the checked attendance and the written note.
  saveAttendance(data) {
    this.note = data;
    this.toStore.members = this.pupils;
    this.toStore.attend = this.presence;
    alert("The chosen team is: "+this.toStore.team+"\n"+"The team's pupils are: "+this.printPupils(this.toStore.members)+"\n"+"the presence list is: "+this.toStore.attend+"\nThe note is: "+ this.note)
    this.started = false;
    this.startOver();
    alert(this.usr);
  }

}







