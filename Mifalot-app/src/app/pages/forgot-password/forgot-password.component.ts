import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit 
{
  private error: any;

  constructor() { }

sendEmail(event, emailAddress) 
  {
    event.preventDefault();

    console.log(emailAddress);

    var auth = firebase.auth();

    auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
    }, function(error) {
     // An error happened.
     this.error = error;
    });
  }

  ngOnInit() { }
}