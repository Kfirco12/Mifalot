import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

        
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent implements OnInit 
{
  private userID: string;
  private password: string;

  constructor(private router: Router) { }

  login(userID: string, password: string)
  {
    console.log("userID: " + userID + "\n" + "Password: " + password);
    // GOTO: home page
    this.router.navigateByUrl('/Home');
  }
  ngOnInit() {
  }

}
