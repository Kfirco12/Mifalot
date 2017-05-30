import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from "@angular/router";
import { AF } from "./providers/af";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
{
  private isLoggedIn: boolean;

  private displayName: string;
  private email: string;
  private uid: string;
  private permission: number;

  // ====================================

  constructor(private afService: AF, private router: Router) 
  {
    this.logout();   // When user refresh the app, he will need to log in again
    this.subscribeToUserAuthStatus();
  }

  // ====================================
  // This asynchronously checks if our user is logged it and will automatically
  // redirect them to the Login page when the status changes.

  subscribeToUserAuthStatus()
  {
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
          this.isLoggedIn = true; 
        }
      })
  }

    // ====================================

  logout() 
  {
    this.afService.logout();
  }

  // ====================================

}








