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

  items: FirebaseListObservable<any[]>;

  // ====================================

  constructor(private afService: AF, private router: Router) 
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

          // this.afService.saveUserDetails(auth.uid, permission, name, auth.auth.email);

            // this.displayName = auth.auth.email;
            // this.email = auth.auth.email;


          var userInfo = this.afService.af.database.list('registeredUsers/' + auth.uid, { preserveSnapshot: true });
           
            userInfo.subscribe(snapshots => 
            {
              snapshots.forEach(snapshot => 
              {
                if (snapshot.key == "permission")
                 {
                   console.log("here");
                    this.permission = snapshot.val();
                    this.afService.saveUserDetails(auth.uid, this.permission, auth.auth.displayName, auth.auth.email);

                    // // Updating values
                    // this.isLoggedIn = true;
                    // this.router.navigate(['']);
                 }
              })
            })

          this.isLoggedIn = true; 
          this.router.navigate(['']);
        }
      }
    );
  }

  // ====================================
  
  logout() 
  {
    this.afService.logout();
  }

}








