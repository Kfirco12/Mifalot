
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
  private error: any;

  // ===================================

  constructor(public afService: AF, private router: Router) {}
  
  // ===================================

  loginWithEmail(event, email, password)
  {
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['loading']);
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



