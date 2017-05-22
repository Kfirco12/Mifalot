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
  private teamSelected: boolean;
  private dateSelected: boolean;
  private uid;
  private teams = [];
  private started = false;
  private chosenTeam = '';
  private teamKey;
  private chosenDate;
  private dates = [];  //contain the trainings' dates of the chosen team.
  private pupils = new Array;  //contain the pupils name of the chosen team.

  constructor(private afService: AF) 
  { 
    this.teamSelected = false;
    this.dateSelected = false;
    this.uid = afService.getUid();
    this.getTeamsByUid();
  }

  ngOnInit() {
  }

   //Connect to the DB and get the team names of the connected user.
  getTeamsByUid() 
  {
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
  //get the dates from the wanted team.
  getDates(teamId) 
  {
    //reset teams represent.
    this.dates = [];
    this.teamSelected = true;
    this.dateSelected = false;
    this.started = true;
    this.chosenTeam = teamId;
    //get teame's pupil from DB.
    //var info = this.db.database.list('teams/' + teamId + '/pupils', { preserveSnapshot: true });
    var info = this.afService.af.database.list('teams',  { preserveSnapshot: true });
    info.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
       if(snapshot.val().name == teamId){
         var dates = this.afService.af.database.list('teams/'+snapshot.key+'/attendance');
         this.teamKey = snapshot.key;
         dates.subscribe(snap2 => {
           snap2.forEach(snap => {
           var dateDB = {
          date: snap.date,
          team: teamId
        }
        this.dates.push(dateDB);
           })
         })
       }
      })
    })
  }
  //---------------------------
  //get the pupils name from the wanted team.
  getPupils(dateId, teamId) 
  {
    //reset teams represent.

    this.started = true;
    this.chosenDate = dateId;
    this.dateSelected = true;
    //get teame's pupil from DB.
     var info = this.afService.af.database.list('teams/'+teamId+'/attendance',  { preserveSnapshot: true });
    info.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
       if(snapshot.val().date == dateId){
         this.pupilsPath = this.afService.af.database.list('teams/'+teamId+'/attendance/'+snapshot.key+"/presence");
         this.teamKey = snapshot.key;
         this.pupilsPath.subscribe(snap2 => {
           snap2.forEach(snap => {
           var pupil = {
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

}
