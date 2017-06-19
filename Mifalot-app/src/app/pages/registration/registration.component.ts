
import { Component, OnInit} from '@angular/core';
import { AF } from "../../providers/af";
import { Router } from "@angular/router";

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent 
{
  public error: any;
  private showSpinner: boolean;
  
  // =====================

  constructor(private afService: AF, private router: Router) 
  {
    this.showSpinner = false;
  }

	// registers the user and logs them in
  register(event, name, lastName, phoneNumber, email, ID, password, passwordValidation) 
  {
    event.preventDefault();

    console.log(password);
    if (password != passwordValidation)
    {
      this.error = "אנא הזן את אותה הסיסמה בשני השדות"
      return;
    }

    this.showSpinner = true;
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, lastName, phoneNumber, email, ID).then(() => {
        this.showSpinner = false;
        this.router.navigate(['']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
  }

  // =====================

  goToLogin()
  {
    this.router.navigate(['login']);
  }

  // =====================
}