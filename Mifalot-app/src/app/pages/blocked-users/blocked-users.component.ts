import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from "../.././providers/af";
import { ShareService } from "../../providers/share-service";

@Component({
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent implements OnInit 
{
  private header = 
  { 
     title: "משתמשים חסומים", 
     subTitle: "צפייה ועריכת המשתמשים החסומים",
     icon: "fa-user-times" 
  }

  // Flags
  private userSelected: boolean;

  private user: any;
  private users: FirebaseListObservable<any[]>;

  // For nav component
  private backButton;

  // =====================

  constructor(private afService: AF, private shareService: ShareService) 
  {
    this.userSelected = false;
    this.users = this.afService.af.database.list('registeredUsers');
  }

  // =====================

  showUserDetails(user)
  {
    this.user = user;
    this.userSelected = true;
    this.shareService.updateBackButton('back');
  }

  // =====================

  sendUserToConfirmation()
  {
    if (confirm("האם ברצונך לבטל חסימה של משתמש זה?"))
    {
      this.users.update(this.user.$key, {permission: 4}).then( () => 
      {
        alert('שים לב: המשתמש' + ' ' + this.user.name + ' ' + this.user.lastName + ' ' + 'הועבר לרשימת הממתינים לאישור');
        this.userSelected = false;
      })
    }
  }

  // =====================

  resetAll()
  {
    this.user = null;
    this.userSelected = false;
    this.shareService.updateBackButton('home');
  }

  // =====================

   navigate()
  {
    // Home page
    if (!this.userSelected)
      this.shareService.navigate('');

    if (this.userSelected)
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
