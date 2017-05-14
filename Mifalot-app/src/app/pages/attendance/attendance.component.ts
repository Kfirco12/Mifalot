import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-attendance',
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
        }
      ]
    },
    {
      name: 'מכבי',
      members: [
        {
          name: 'יעקובי',
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


  //teams: FirebaseListObservable<any[]> //get the teams and their members of the User.
  note : String; //coach's note/
  instructions: string; //injection hml variable.
  date = new Date().toLocaleString()  //date variable.
  presence = [];  //true/false array. mark attendance by the index of the pupils list.
  pupils = [];  //contain the pupils name of the chosen team.
  teams_names = []; //get the coach's teams names.
  toStore = {team:'', members:[], attend:[]};

  //============================
  //============================
  constructor( private af: AngularFire) 
  {

    this.instructions = ":בחר את הקבוצה אותה אתה מאמן כעת";
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
    this.instructions = ":לחץ על שמות החניכים הנוכחים באימון";
    this.toStore.team = id; //save the chosen team.

    for (var _i = 0; _i < this.teams.length; _i++) {
      if (id === this.teams[_i].name) {
        this.pupils = this.teams[_i].members;
        this.teams_names = [];
        for (var _j = 0; _j < this.pupils.length; _j++) {
          this.presence.push(false);
        }
        break;
      }
    }
  }

  //---------------------------
  //reset the checked attendance and pick new team.
  startOver() {
    this.instructions = ":בחרי את הקבוצה אותה את\\ה מאמן\\ת כעת";

    //reset variables.
    this.toStore.team = '';
    this.toStore.members = [];
    this.toStore.attend = [];
    this.presence = [];  
    this.pupils = [];  
    this.teams_names = []; 
    this.note=""
    //get the teams names from the DB array.
    for (var _i = 0; _i < this.teams.length; _i++) {
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
        
    
  }

}







