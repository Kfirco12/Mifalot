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

  private noTeamSelected: boolean;
  private uid;
  private teams = [];
  private started = false;
  private chosenTeam = '';
  private teamKey;
  private chosenDate;
  private dates = [{date: "אנא בחר קבוצה"}];  //contain the trainings' dates of the chosen team.
  private pupils = new Array;  //contain the pupils name of the chosen team.

  constructor(private afService: AF) 
  { 
    this.noTeamSelected = true;
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
    this.noTeamSelected = false;
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
          date: snap.date
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
  getPupils(dateID) 
  {
    //reset teams represent.
    this.noTeamSelected = false;
    this.started = true;
    this.chosenDate = dateID;

    //get teame's pupil from DB.
    //var info = this.db.database.list('teams/' + teamId + '/pupils', { preserveSnapshot: true });
    var info = this.afService.af.database.list('teams',  { preserveSnapshot: true });
    info.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
       if(snapshot.val().date == dateID){
         var pupils = this.afService.af.database.list('teams/'+snapshot.key+'/attendance'+snapshot.key+'/presence'+snapshot.key+'/1');
         this.teamKey = snapshot.key;
         pupils.subscribe(snap2 => {
           snap2.forEach(snap => {
           var pupil = {
          name: "dd",
          presence: true,
          number: 1
        }
        this.pupils.push(pupil);
           })
         })
       }

     
      })
    })
  }

}
