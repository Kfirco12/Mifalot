import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from "@angular/router";
import { AF } from "./providers/af";
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
{
  public isLoggedIn: boolean;
  items: FirebaseListObservable<any[]>;

  // ====================================

  constructor(public afService: AF, private router: Router ,private location: Location) 
  {
    // This asynchronously checks if our user is logged it and will automatically
    // redirect them to the Login page when the status changes.
    this.afService.af.auth.subscribe(
      (auth) => {
        if (auth == null) 
        {
          console.log("Not Logged in.");
          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
        else 
        {
          console.log("Successfully Logged in.");
          // Set the Display Name and Email so we can attribute messages to them
          // if (auth.google) 
          // {
          //   this.afService.displayName = auth.google.displayName;
          //   this.afService.email = auth.google.email;
          // }
          // else 
          // {
            this.afService.displayName = auth.auth.email;
            this.afService.email = auth.auth.email;
          // }
          this.isLoggedIn = true;
          this.router.navigate(['']);
        }
      }
    );
  }

  // ====================================

  backClicked() 
  {
        this.location.back();
  }

  // ====================================
  
  logout() 
  {
    this.afService.logout();
  }

}



/*
  items: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) 
  {
    this.items = af.database.list('/Users');
  }

}
*/







