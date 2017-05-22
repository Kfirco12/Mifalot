import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AF } from "../.././providers/af";

@Component({
  selector: 'app-reports',
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
  }
  
  private pupilsPath;
  private uid;
  private chosenTeam = '';
  private teamKey;
  private chosenDate;

  private pupilPresence: string;

  // Arrays
  private teams;    // Contain the teams' of the user.
  private dates;    // Contain the trainings' dates of the chosen team.
  private pupils;   // Contain the pupils name of the chosen team.
  
  // Flags
  private started: boolean;
  private teamSelected: boolean;
  private dateSelected: boolean;

  // ============================================================

  constructor(private afService: AF) 
  { 
    this.pupils = this.dates = this.teams = [];

    this.started = false;
    this.teamSelected = this.dateSelected = false;

    this.uid = afService.getUid();
    this.getTeamsByUid();
  }

  // ============================================================

  ngOnInit() {
  }

  // ============================================================
  // Connect to the DB and get the teams' names of the connected user.
  
  getTeamsByUid() 
  {
    var info = this.afService.af.database.list('teams/', { preserveSnapshot: true });

   info.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if (snapshot.val().coachId == this.uid) 
          this.teams.push(snapshot.val().name);
      })
    })
  }

  // ============================================================
  //get the dates from the wanted team.

  getDates(teamId) 
  {
    // Reset teams represent.
    this.pupils = this.dates = [];

    this.dateSelected = false;
    this.teamSelected = this.started = true;

    this.chosenTeam = teamId;

    // get teame's pupil from DB.
    var info = this.afService.af.database.list('teams/' + teamId + '/attendance', { preserveSnapshot: true });
    
    info.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        var dateDB = 
        {
          date: snapshot.val().date,
          team: teamId
        }

        this.dates.push(dateDB);
      })
    })
  }
  
  // ============================================================
  // Get the pupils name from the wanted team.
  
  getPupils(dateId, teamId) 
  {
    // Reset teams represent
    this.started = this.dateSelected = true;
    this.chosenDate = dateId;

    // Reset pupils' array
    this.pupils = [];

    // Get teame's pupil from DB.
    var info = this.afService.af.database.list('teams/' + teamId + '/attendance',  { preserveSnapshot: true });

    info.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if(snapshot.val().date == dateId)
        {
          this.pupilsPath = this.afService.af.database.list('teams/' + teamId + '/attendance/' + snapshot.key + "/presence");
          this.teamKey = snapshot.key;

          this.pupilsPath.subscribe(snap2 => {
            snap2.forEach(snap => {
              var pupil = 
              {
                name: snap.name,
                presence: snap.presence
              }
              this.pupils.push(pupil);
            })
          })
        }

      })
    })
  }

  // ============================================================
  // Change 'pupilPresence' to 'כן' or 'לא' according to database value

  isPupilPresence(presence)
  {
    if (presence == true)
      this.pupilPresence = "כן";
    else
      this.pupilPresence = "לא";

      return true;
  }

  // ============================================================


}
