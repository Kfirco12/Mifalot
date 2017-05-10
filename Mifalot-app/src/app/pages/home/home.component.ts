import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
 buttons = [
              { id: "Attendance", txt: 'רשימת נוכחות', background: '#009933' , lineColor: '#006622', sign: 'fa fa-pencil-square-o fa-2x'}, 
              { id: "Reports", txt: 'דוחו"ת נוכחות', background: '#006699' , lineColor: '#003366', sign: 'fa fa-bar-chart fa-2x'  },    
              { id: "Messages", txt: 'הודעות', background: '#FF9900' , lineColor: '#CC7A00', sign: 'fa fa-comments fa-2x'  }, 
              { id: "Personal-Info", txt: 'מידע אישי', background: '#990073' , lineColor: '#66004D', sign: 'fa fa-info-circle fa-2x'  },
              { id: "Signout", txt: 'התנתקות', background: '#800000' , lineColor: '#4D0000', sign: 'fa fa-sign-out fa-2x'  }
            ]

  constructor(private router: Router) { }

  // ======================
  // Uses routes.ts
  
  navigate(page: string)
  {
    this.router.navigateByUrl('/' + page);
  }

  // ======================

  ngOnInit() {
  }

}
