import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from "@angular/router";
import { AF } from "./providers/af";
import { PushNotificationsService, NotificationsService, SimpleNotificationsComponent } from "angular2-notifications-lite";


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

  // ====================================

  constructor(private afService: AF, private router: Router, private pushService: PushNotificationsService) 
  {
    this.pushService.requestPermission();
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
          this.afService.subscribeToChatRooms();
          console.log("Successfully Logged in.");
          this.isLoggedIn = true; 
        }
      })
  }

    // ====================================

  logout() 
  {
    if(confirm("האם ברצונך להתנתק?"))
    this.afService.logout();
  }

  // ====================================

}








