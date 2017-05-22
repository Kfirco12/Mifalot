import { Component, OnInit } from '@angular/core';
import { AF } from "../../providers/af";


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})

export class PersonalInfoComponent implements OnInit 
{
  header = 
  { 
    title: "מידע אישי", 
    subTitle: "פרטים אודות כל משתמש",
    icon: "fa-info-circle" 
  }

  private userName: string;
  private userType: string;
  private userEmail: string;
  private userTeams: string;

  constructor(private afService: AF ) 
  {
    this.userName = afService.getUserName();
    this.userEmail = afService.getUserEmail();
    // this.userType = afService.getUserType();
    // this.userTeams = afService.getUserTeams();
  }

  ngOnInit() {
  }

}
