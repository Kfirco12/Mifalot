import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '.././home/home.component';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AF } from "../.././providers/af";


@Component({
  selector: 'app-users-confirm',
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

  private userSelected: boolean;

  private userName: string;
  private userEmail: string;

  private users: FirebaseListObservable<any[]>;

// =====================

  constructor(private afService: AF) 
  {
    this.userSelected = false;
    this.users = this.afService.af.database.list('registeredUsers');
  }

// =====================

showUserDetails(user)
{
  this.userSelected = true;

  this.userEmail = user.email;
  this.userName = user.name;
}

// =====================

  ngOnInit() { }

// =====================

}



// var chatRooms = this.afService.af.database.list('chatRooms/', { preserveSnapshot: true });
// /*   
//   chatRooms.subscribe(snapshots => {
//     snapshots.forEach(snapshot => {
//       if (chatName == snapshot.val().name)
//         this.error = "שם זה כבר קיים, בחר שם אחר";
//     })
//   })

//   if (this.error == "שם זה כבר קיים, בחר שם אחר")
//     return;
// */

//     // Create a new chat room
//     chatRooms.push(newChat);

//     chatRooms.subscribe(snapshots => {
//     snapshots.forEach(snapshot => {
//       if (snapshot.val().name == chatName)
//         this.currentChat = this.afService.af.database.list('chatRooms/' + snapshot.key + '/messages');
//     });
//   })