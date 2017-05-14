
import { Component, OnInit} from '@angular/core';
import { AF } from "../../providers/af";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent 
{
  public error: any;

  constructor(private afService: AF, private router: Router) { }

	// registers the user and logs them in
  register(event, name, email, password, passwordValidation) 
  {
    event.preventDefault();

    console.log(passwordValidation);
    if (password != passwordValidation)
    {
      this.error = "אנא הזן את אותה הסיסמה בשני השדות"
      return;
    }

    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email).then(() => {
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
}