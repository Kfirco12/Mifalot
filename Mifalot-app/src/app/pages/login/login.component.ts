
import { Component } from '@angular/core';
import { AF } from "../../providers/af";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent 
{
  public error: any;
  private usrArr = {
    id: String,
    name: String,
    email: String,
    permissions: Number
  };

  constructor(public afService: AF, private router: Router) {}
  
  // ===================================

  // loginWithGoogle() 
  // {
  //   this.afService.loginWithGoogle().then((data) => {
  //     // Send them to the homepage if they are logged in
  //     this.router.navigate(['']);
  //   })
  // }

    // ===================================

//send data to different components.
sendMessage(msg : string) {
       this.afService.send(msg);
    }

  loginWithEmail(event, email, password)
  {
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['']);
      this.usrArr[0] = this.afService.getUid();
      //this.usrArr[1] = this.afService.displayName;

      this.sendMessage(this.usrArr[0]);
    })
      .catch((error: any) => {
        if (error) 
        {
          this.error = error;
          console.log(this.error);
        }
      });
  }

  // ===================================

}



