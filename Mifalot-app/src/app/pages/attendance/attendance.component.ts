import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

<<<<<<< HEAD
  date: string;
  
  constructor() 
  {
     this.date =  new Date().toLocaleString();
  }

=======
 pupils = [
  {
    name: 'כפיר כהן'
  },
  {
    name: 'דודי חקקיאן'
  },
  {
    name:'מתן אנקונה'
  },
  {
    name:'בנימין חורי'
  }
];

  constructor() { }
 date =  new Date().toLocaleString()
>>>>>>> 9b09801d4d1058328eb2730149088ce36190fc54
  ngOnInit() {
  }

}
