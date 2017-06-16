
import { Component } from '@angular/core';
import { AF } from "../../providers/af";
import { Router } from "@angular/router";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent 
{
  private error: any;
  private showSpinner: boolean;

  // ===================================

  constructor(public afService: AF, private router: Router) 
  {
    this.showSpinner = false;
  }
  
  // ===================================

  loginWithEmail(event, email, password)
  {
    this.showSpinner = true;
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['']);
    })
      .catch((error: any) => {
        if (error) 
        {
          this.error = error;
          this.showSpinner = false;
          console.log(this.error);
        }
      });

  }

  // ===================================

}



