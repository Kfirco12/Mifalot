
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
 /* private usrArr = {
    id: '',
    teams: [],
    pupils:[]
  };*/
  private usrArr = [];

  constructor(public afService: AF, private router: Router) {}
  
    // ===================================

//send data to different components.
    sendMessage(msg : string) {
       this.afService.send(msg);
    }

  loginWithEmail(event, email, password)
  {
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {

      this.router.navigate(['loading']);


      this.sendMessage(this.afService.getUid());

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



