import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

        
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent implements OnInit 
{
  private userID: string;
  private password: string;
  items: FirebaseListObservable<any[]>;

  constructor(private router: Router, private af: AngularFire) 
  { 
    this.items = af.database.list('/Users');
  }


  login(userID: string, password: string)
  {
    console.log("userID: " + userID + "\n" + "Password: " + password);
    // GOTO: home page
    
    this.router.navigateByUrl('/Home');
  }
  ngOnInit() {
  }

}
