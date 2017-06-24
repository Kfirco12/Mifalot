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
  private isLoading: boolean;

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

  // Pointer to subscribes
  private teamsSubsPtr;
  private usersSubsPtr;

  private currentUser;
  // =====================

  constructor(private afService: AF, private shareService: ShareService) 
  {
    this.userDetails = [];
    this.userNewPermission = null;

    this.userSelected =  this.userConfirmed = this.chooseTeams = false;

    this.currentUser = this.afService.getUserDetails();
    
    // Get users from DB
    this.getUsers();
  }

  // =====================
  // Get teams list from DB.

  getTeams()
  {
    this.isLoading = true;
    
    this.teams = this.afService.af.database.list('teams');
    this.teamsSubsPtr = this.teams.subscribe(snapshots => {
      this.isLoading = false;
    })
  }

  // =====================
  // Get users from DB

  getUsers()
  {
    this.isLoading = true;

     this.users = this.afService.af.database.list('registeredUsers');
     this.usersSubsPtr = this.users.subscribe(() => {
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
    this.getTeams();

    this.userType = type;

    this.userDetails[0] = this.user;
    this.userDetails[1] = "users-confirm";
    
    if (type == 'manager')
      this.userDetails[2] = this.userNewPermission = 2;
    else if (type == 'coach')
      this.userDetails[2] = this.userNewPermission = 3;

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
    this.getUsers();
    this.shareService.updateBackButton('home');
  }

  // =====================

  userAssociatedTeams(userNewPermission)
  {
    this.userNewPermission = userNewPermission;
  }

  // =====================

  unsubscribeAll()
  {
    if (this.teamsSubsPtr)
      this.teamsSubsPtr.unsubscribe();

    if (this.usersSubsPtr)
      this.usersSubsPtr.unsubscribe();
  }

  // =====================

   navigate()
  {
    // Home page
    if (!this.userSelected)
    {
      this.unsubscribeAll();
      this.shareService.navigate('');
    }
    
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