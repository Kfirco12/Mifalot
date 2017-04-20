import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
 buttons = [
              { id: "Attendance", txt: 'נוכחות', background: '#009933' , lineColor: '#006622' }, 
              { id: "Reports", txt: 'דוחו"ת חניכים', background: '#006699' , lineColor: '#003366'  },    
              { id: "Messages", txt: 'הודעות', background: '#FF9900' , lineColor: '#CC7A00'  }, 
              { id: "Personal-Info", txt: 'מידע אישי', background: '#990073' , lineColor: '#66004D'  },
              { id: "Signout", txt: 'התנתקות', background: '#800000' , lineColor: '#4D0000'  }
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
