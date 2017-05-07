import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";

import { appRoutes } from './routes'

import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';


import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { SignoutComponent } from './pages/signout/signout.component';

import { AngularFireModule } from 'angularfire2';


// ======================================================

  // Initialize Firebase 
  export const firebaseConfig = 
  {
    apiKey: "AIzaSyALUkgtATRDcoX5c3AeLvLX_JLkrTXJS4c",
    authDomain: "application-d2061.firebaseapp.com",
    databaseURL: "https://application-d2061.firebaseio.com",
    projectId: "application-d2061",
    storageBucket: "application-d2061.appspot.com",
    messagingSenderId: "1005060683377"
  };

// ======================================================

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    HomeComponent,
    MessagesComponent,
    AttendanceComponent,
    ReportsComponent,
    PersonalInfoComponent,
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
