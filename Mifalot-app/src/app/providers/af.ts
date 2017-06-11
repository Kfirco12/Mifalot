
import { Injectable } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { PushNotificationsService } from "angular2-notifications-lite";

// For take() 
import 'rxjs/Rx';

@Injectable()

export class AF 
{
  // User info
  private displayName: string;
  private email: string;
  private uid: string;
  
  // Array
  private subscribeArray: Array<any>;

  // DB Observable
  private user: FirebaseObjectObservable<any>;

  // Int
  private numOfChatRooms: number;

  // ================================

  constructor(public af: AngularFire, private pushService: PushNotificationsService) 
  {
    this.subscribeArray = [];
    this.numOfChatRooms = 0;
    this.logout();  // When user refresh the app, he will need to log in again
  }

  // ================================
  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */

  // ================================
  /**
   * Logs out the current user
   */
  logout() 
  {
    this.unsubscribeAll();
    return this.af.auth.logout();
  }

  // ================================
  /**
   * Saves a message to the Firebase Realtime Database
   * @param text
   */

  sendMessage(text, name, lastName, chatRoom: FirebaseListObservable<any>) 
  {
    let message =
      {
        message: text,
        displayName: name,
        lastName: lastName,
        email: this.email,
        timestamp: Date.now()
      };

    return chatRoom.push(message);
  }

  // ================================
  /**
   * Calls the AngularFire2 service to register a new user
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) 
  {
    console.log(email)
    return this.af.auth.createUser({
      email: email,
      password: password
    });
  }

  // ================================
  /**
   * Saves information to display to screen when user is logged in
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */

  // ================================

  saveUserInfoFromForm(uid, name, lastName, phoneNumber, email, ID) 
  {      
    return this.af.database.object('registeredUsers/' + uid).set(
    {
      name: name,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      ID: ID, 
      permission: 4
    }).then(() => 
      {
        this.uid = uid;
        this.displayName = name;
        this.email = email;
      })
  }

  // ================================
  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */

  // ================================

  loginWithEmail(email, password) 
  {
    return this.af.auth.login(
    {
      email: email,
      password: password
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    }).then((user) => 
      {
        this.saveUserDetails(user);
      })    
  }

   // ================================

  saveUserDetails(user)
  {
    this.uid = user.uid;
    this.displayName = user.auth.email;
    this.email = user.auth.email;
  }

  // ================================

  unsubscribeAll()
  {
    for (let i = 0; i < this.subscribeArray.length; i++)
      if (this.subscribeArray[i])
        this.subscribeArray[i].unsubscribe();
  }

  // ================================

  //  name = user.displayName;
  //  email = user.email;
  //  photoUrl = user.photoURL;
  //  emailVerified = user.emailVerified;
  //  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
  //                    // this value to authenticate with your backend server, if
  //                    // you have one. Use User.getToken() instead.

  // ================================
  //        Gets' Methods
  // ================================

  getUserDetails(user)
  {
    if (this.uid)
    {
      this.user = this.af.database.object('registeredUsers/' + this.uid, { preserveSnapshot: true });
      this.subscribeArray.push(this.user.subscribe(snapshot => 
      {
        user.uid = this.uid;
        user.email = this.email;
        user.name = snapshot.val().name;
        user.lastName = snapshot.val().lastName;
        user.ID = snapshot.val().ID;
        user.permission = snapshot.val().permission;
        user.phoneNumber = snapshot.val().phoneNumber;
      }));
    }
  }

  // ================================

  getUid()
  {
    return this.uid;
  }

  // ================================
  //        Push Notifications
  // ================================

  subscribeToChatRooms()
  {
    this.getNumOfChatRooms();
    let chatRooms = this.af.database.list('chatRooms', { preserveSnapshot: true });
    let currentLength = 0;

    this.subscribeArray.push(chatRooms.subscribe(snapshots => 
    {
      currentLength = 0;
      snapshots.forEach(snapshot => 
      { 
        if (snapshot.val().authorID != this.uid)
          currentLength++;
      });
      if (currentLength > this.numOfChatRooms)
        this.pushNotification();
      this.numOfChatRooms = currentLength;
    }));

  }
  
  // ================================

  getNumOfChatRooms()
  {
    this.numOfChatRooms = 0;
    let chatRooms = this.af.database.list('chatRooms', { preserveSnapshot: true }).take(1);

    chatRooms.subscribe(snapshots => {
      snapshots.forEach(snapshot => 
      {
        this.numOfChatRooms++;
      })
      console.log(this.numOfChatRooms);
    });
  }

  // ================================

  pushNotification()
  {
    this.pushService.create('פורסמה חוויה חדשה', { body: 'כנס אל ״הודעות״ וצפה בהודעה', dir: 'rtl' }).subscribe(
            res => console.log(res),
            err => console.log(err)
        )
  }

  // ================================

}

