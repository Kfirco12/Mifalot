import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from "../.././providers/af";
import { ShareService } from "../../providers/share-service";


@Component({
  templateUrl: './users-confirm.component.html',
  styleUrls: ['./users-confirm.component.css']
})

export class UsersConfirmComponent implements OnInit 
{
  private header = 
  { 
     title: "אישור משתמשים", 
     subTitle: "עבור על המשתמשים הממתינים לאישורך",
     icon: "fa-users" 
  }

  // Flags
  private userSelected: boolean;
  private userConfirmed: boolean;
  private chooseTeams: boolean;

  // String
  private userType: string;

  // Int
  private userNewPermission: number;

  // Trasnfer user details to 'associate-teams' component
  private userDetails: any;
  private user: any;

  // Observers to DB
  private users: FirebaseListObservable<any[]>;
  private teams: FirebaseListObservable<any[]>;

  // For nav component
  private backButton;

  // =====================

  constructor(private afService: AF, private shareService: ShareService) 
  {
    this.userDetails = [];
    this.userNewPermission = null;

    this.userSelected =  this.userConfirmed = this.chooseTeams = false;
    this.users = this.afService.af.database.list('registeredUsers');
    this.teams = this.afService.af.database.list('teams');
  }

  // =====================

  showUserDetails(user)
  {
    this.user = user;
    this.userSelected = true;
    this.shareService.updateBackButton('back');
  }

  // =====================
  // Changing user permission to 5
  // Next when user is loggin next time, he will be deleted

  deleteUser()
  {
    if (confirm("האם ברצונך להסיר משתמש זה?"))
    {
      this.users.update(this.user.$key, { permission: 5 }).then(()  => 
      {
        alert("המשתמש הוסר")
        this.userSelected = false;
        this.user = null;
      });
    }
  }

  // =====================

  confirmUser()
  {
    this.userConfirmed = true;
    this.shareService.updateBackButton('back');
  }

  // =====================

  showTeams(type)
  {
    this.userType = type;

    this.userDetails[0] = this.user;
    this.userDetails[1] = "users-confirm";
    
    if (type == 'manager')
      this.userDetails[2] = 2;
    else if (type == 'coach')
      this.userDetails[2] = 3;

    this.chooseTeams = true;
    this.shareService.updateBackButton('back');
  }

  // =====================

  backToUserInfo()
  {
    this.userConfirmed = this.chooseTeams = false;
  }

  // =====================

  resetAll()
  {
    this.userSelected =  this.userConfirmed = this.chooseTeams = false;
    this.user = this.userType = null;
    this.shareService.updateBackButton('home');
  }

  // =====================

  userAssociatedTeams(userNewPermission)
  {
    this.userNewPermission = userNewPermission;
  }

  // =====================

   navigate()
  {
    // Home page
    if (!this.userSelected)
      this.shareService.navigate('');

    if (this.userConfirmed)
      this.backToUserInfo();
    else if (this.userSelected)
      this.resetAll();
  }

  // =====================

  ngOnInit() 
  {
    // Initialize button values
    this.backButton = this.shareService.getButton();
    this.shareService.updateBackButton('home');
  }

  // =====================

}