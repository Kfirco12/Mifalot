import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AF } from "../../providers/af";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
  buttons = [
              { id: "messages", txt: 'הודעות', icon: 'fa fa-comments fa-2x'  }, 
              { id: "attendance", txt: 'רשימת נוכחות', icon: 'fa fa-pencil-square-o fa-2x'}, 
              { id: "personal-info", txt: 'מידע אישי', icon: 'fa fa-info-circle fa-2x'  },
              { id: "reports", txt: 'דוחו"ת נוכחות', icon: 'fa fa-bar-chart fa-2x'  }, 
              { id: "users-confirm", txt: 'משתמשים הממתינים לאישור', icon: 'fa fa-users fa-2x'  }
            ]

   permission = 3;

  constructor(private afService: AF, private router: Router) 
  {
      this.afService.getUserPermission();
  }

  // ======================
  // Uses routes.ts
  
  navigate(page: string)
  {
    this.router.navigate([page]);
  }

  // ======================

  getPermission()
  {
    return this.permission;
  }

  // ======================

  ngOnInit() {
  }

}
