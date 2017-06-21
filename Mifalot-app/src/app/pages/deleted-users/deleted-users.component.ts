import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from "../.././providers/af";
import { ShareService } from "../../providers/share-service";

@Component({
  templateUrl: './deleted-users.component.html',
  styleUrls: ['./deleted-users.component.css']
})
export class DeletedUsersComponent implements OnInit 
{
  private header = 
  { 
     title: "משתמשים העומדים להסרה", 
     subTitle: "מוצגים משתמשים העומדים להמחק מן המערכת",
     icon: "fa-user-times" 
  }

  // Flags
  private userSelected: boolean;
  private isLoading: boolean;

  private user: any;
  private users: FirebaseListObservable<any[]>;

  // For nav component
  private backButton;

  // =====================

  constructor(private afService: AF, private shareService: ShareService) 
  {
    this.userSelected = false;
    this.getUsers();
  }

  // =====================
  // Get users from DB

  getUsers()
  {
    this.isLoading = true;

     this.users = this.afService.af.database.list('registeredUsers');
     this.users.subscribe(() => {
       this.isLoading = false;
     })
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
    if (confirm("האם ברצונך לבטל את הסרתו של משתמש זה?"))
    {
      this.users.update(this.user.$key, { permission: 4 }).then( () => 
      {
        alert('שים לב: המשתמש' + ' ' + this.user.name + ' ' + this.user.lastName + ' ' + 'הועבר לרשימת הממתינים לאישור');
        this.resetAll();
      })
    }
  }

  // =====================

  resetAll()
  {
    this.getUsers();
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
