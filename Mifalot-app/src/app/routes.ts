import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { SignoutComponent } from './pages/signout/signout.component';

export const appRoutes: Routes = [ 
    { path: '', component: LoginComponent },  
    { path: 'Home', component: HomeComponent },
    { path: 'Attendance', component: AttendanceComponent },
    { path: 'Reports', component: ReportsComponent },
    { path: 'Messages', component: MessagesComponent },
    { path: 'Personal-Info', component: PersonalInfoComponent },
    { path: 'Signout', component: SignoutComponent }
]
