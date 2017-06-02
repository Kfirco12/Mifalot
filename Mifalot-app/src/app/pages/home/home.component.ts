import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AF } from "../../providers/af";
import { FirebaseListObservable } from 'angularfire2';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit 
{
  private buttons = [
                      { id: "messages", txt: 'הודעות', icon: 'fa fa-comments fa-2x', color: 'btn-warning'  }, 
                      { id: "attendance", txt: 'רשימת נוכחות', icon: 'fa fa-pencil-square-o fa-2x', color: 'btn-success' }, 
                      { id: "pupils-management", txt: 'ניהול חניכים', icon: 'fa fa-user fa-2x', color: 'btn-info' },
                      { id: "reports", txt: 'דו"חות נוכחות', icon: 'fa fa-bar-chart fa-2x', color: 'btn-primary' }     
                    ]

  private adminButtons = [  
                            { id: "blocked-users", txt: 'משתמשים חסומים', icon: 'fa fa-user-times fa-2x', color: 'btn-danger' },
                            { id: "users-confirm", txt: 'משתמשים הממתינים לאישור', icon: 'fa fa-user-plus fa-2x', color: 'btn-success' },
                            { id: "users-management", txt: 'ניהול משתמשים', icon: 'fa fa-users fa-2x', color: 'btn-info' }        
                          ]

  private user: FirebaseListObservable<any[]>;

  // ======================


  constructor(private afService: AF, private router: Router) 
  { 
      // Save an observable to user variables in DB
      this.user = this.afService.af.database.list('registeredUsers/' + this.afService.getUid());
  }

  // ======================
  // Uses routes.ts
  
  navigate(page: string)
  {
    this.router.navigate([page]);
  }

  // ======================

  ngOnInit() 
  {
  }

  // ======================
  
}
