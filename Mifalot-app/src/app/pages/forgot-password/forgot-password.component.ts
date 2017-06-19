import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { ShareService } from "../../providers/share-service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit 
{
  public error: any;
  private showMessage: boolean;

  // ============================================================

  constructor(private shareService: ShareService) 
  { 
    this.showMessage = false;
  }

  // ============================================================

  sendEmail(event, emailAddress) 
  {
    event.preventDefault();

    console.log(emailAddress);

    var auth = firebase.auth();

    auth.sendPasswordResetEmail(emailAddress).then(() =>  
    {   
      // Email sent.
      this.showMessage = true;
      setTimeout(() =>  { this.showMessageAndNavigateToLogin(); } ,10000);

    },(error) => 
    {
     // An error happened.
     this.error = error;
    });
  }

  // ============================================================

  showMessageAndNavigateToLogin()
  {
    this.showMessage = false;
    this.shareService.navigate('login');
  }

  // ============================================================

  ngOnInit() { }
}