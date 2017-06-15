import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AF } from "../../providers/af";
import { ShareService } from "../../providers/share-service";
import { FirebaseListObservable } from 'angularfire2';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit 
{
  // Arrays
  private coachButtons: Array<any>;
  private managerButtons: Array<any>;
  private adminButtons: Array<any>;

  // User details object
  private user: Object;

  private backButton;

  // ======================

  constructor(private afService: AF, private router: Router, private shareService: ShareService) 
  { 
    this.user = 
    { 
      uid: null,
      name: null,
      lastName: null,
      ID: null,
      permission: null, 
      phoneNumber: null
    };

    this.afService.getUserDetails(this.user);

    this.initializeButtons();

    // Initialize button values
    this.backButton = this.shareService.getButton();
    this.shareService.updateBackButton('');
  }

  // ======================
  // Uses routes.ts
  
  navigate(page: string)
  {
    this.router.navigate([page]);
  }

  // ======================

  initializeButtons()
  {
    this.coachButtons = [
                          { id: "messages", txt: 'הודעות', icon: 'fa fa-comments fa-2x', color: 'btn-warning'  }, 
                          { id: "attendance", txt: 'רשימת נוכחות', icon: 'fa fa-pencil-square-o fa-2x', color: 'btn-success' }, 
                          { id: "pupils-management", txt: 'ניהול חניכים', icon: 'fa fa-user fa-2x', color: 'btn-info' },
                          { id: "reports", txt: 'דו"חות נוכחות', icon: 'fa fa-bar-chart fa-2x', color: 'btn-primary' }     
                        ]

    this.managerButtons = [
                            { id: "messages", txt: 'הודעות', icon: 'fa fa-comments fa-2x', color: 'btn-warning'  }, 
                            { id: "reports", txt: 'דו"חות נוכחות', icon: 'fa fa-bar-chart fa-2x', color: 'btn-primary' }     
                          ]

    this.adminButtons = [  
                          { id: "users-management", txt: 'ניהול משתמשים פעילים', icon: 'fa fa-users fa-2x', color: 'btn-info' }, 
                          { id: "blocked-users", txt: 'משתמשים חסומים', icon: 'fa fa-user-times fa-2x', color: 'btn-danger' },
                          { id: "users-confirm", txt: 'משתמשים הממתינים לאישור', icon: 'fa fa-user-plus fa-2x', color: 'btn-success' }    
                        ]
  }

  // ======================

  ngOnInit() { }

  // ======================
  
}
