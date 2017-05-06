import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {


  //teams from DB.*********************************************************S
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


  htmlVariable: string; //injection hml variable.
  date = new Date().toLocaleString()  //date variable.
  checked: string[] = []; //help array. check the checked pupils.
  presence = [];  //true/false array. mark attendance by the index of the pupils list.
  pupils = [];  //contain the pupils name of the chosen team.
  teams_names = []; //get the coach's teams names.


  //============================
  //============================
  constructor() {

    this.htmlVariable = "<h3 style=" + "margin-bottom: 25px; text-align: center;" + ">בחר\\י את הקבוצה אותה את\\ה מאמן\\ת כעת</h3>";
    //get the teams names from the DB array.
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
  getPupils(id) {
    this.htmlVariable = "<h3 style=" + "margin-bottom: 25px; text-align: center;" + ">לחץ\\י על שמות החניכים הנוכחים באימון</h3>";
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
  //save the checked attendance.
  saveAttendance() {

  }
    
}







