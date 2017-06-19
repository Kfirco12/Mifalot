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
  private interval;
  private countDown: number;

  // ============================================================

  constructor(private shareService: ShareService) 
  { 
    this.showMessage = false;
    this.countDown = 10; // 10s
  }

  // ============================================================

  sendEmail(event, emailAddress) 
  {
    event.preventDefault();

    let auth = firebase.auth();

    auth.sendPasswordResetEmail(emailAddress).then(() =>  
    {   
      // Email sent.
      this.showMessage = true;
      this.interval = setInterval( () => 
      {
        if (this.countDown-- == 1) 
        {
          clearInterval(this.interval);
          this.showMessage = false;
          this.shareService.navigate('login');
          }
      }
        , 1000);
    },(error) => 
    {
     // An error happened.
     this.error = error;
    });
  }

  // ============================================================

  ngOnInit() { }

  // ============================================================

}