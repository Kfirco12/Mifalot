
import { Injectable } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

<<<<<<< HEAD
export class AF 
{
  public chatRooms: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;

  private uid: string;
  private permission: number = 1;
  
  // ================================

  constructor(public af: AngularFire) 
  {
    //this.saveUserDetails();
    this.chatRooms = this.af.database.list('chatRooms');
=======
export class AF {
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  private uid: string;
  public name: String;
  private _stream$ = new BehaviorSubject("")
  public stream$ = this._stream$.asObservable();
  // ================================

  constructor(public af: AngularFire) {
    this.messages = this.af.database.list('messages');
>>>>>>> 3e5ffa03ea05dffa5ff4a6984918779c85d8ad70
  }

//sharing data between two components.
  send(msg : string) {
      this._stream$.next(msg);
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
    return this.af.auth.logout();
  }

  // ================================
  /**
   * Saves a message to the Firebase Realtime Database
   * @param text
   */

<<<<<<< HEAD
  sendMessage(text, chatRoom) 
  {
=======
  sendMessage(text) {
>>>>>>> 3e5ffa03ea05dffa5ff4a6984918779c85d8ad70
    var message =
      {
        message: text,
        displayName: this.displayName,
        email: this.email,
        timestamp: Date.now()
      };

    chatRoom.push(message);
  }

  // ================================
  /**
   * Calls the AngularFire2 service to register a new user
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
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

<<<<<<< HEAD
  saveUserInfoFromForm(uid, name, email) 
  {  
    this.uid = uid;
    this.permission = 4;
    
    return this.af.database.object('registeredUsers/' + uid).set(
    {
      name: name,
      email: email,
      permission: 4
    });
=======
  saveUserInfoFromForm(uid, name, email) {
    return this.af.database.object('registeredUsers/' + uid).set(
      {
        name: name,
        email: email,
        permission: 3
      });
>>>>>>> 3e5ffa03ea05dffa5ff4a6984918779c85d8ad70
  }

  // ================================
  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */

  // ================================

<<<<<<< HEAD
  loginWithEmail(email, password) 
  {
   
=======
  loginWithEmail(email, password) {
>>>>>>> 3e5ffa03ea05dffa5ff4a6984918779c85d8ad70
    // Resolving scope problems in TypeScript
   // let that = this;

    return this.af.auth.login(
      {
<<<<<<< HEAD
        this.uid = user.uid;

        var userInfo = this.af.database.object('registeredUsers/' + user.uid, { preserveSnapshot: true });

        userInfo.subscribe(snapshot => 
        {
          this.permission = snapshot.val().permission;
        })
=======
        email: email,
        password: password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then((user) => {
        that.uid = user.uid;
        // console.log(that.uid);
>>>>>>> 3e5ffa03ea05dffa5ff4a6984918779c85d8ad70
      })



/*   
  chatRooms.subscribe(snapshots => {
    snapshots.forEach(snapshot => {
      if (chatName == snapshot.val().name)
        this.error = "שם זה כבר קיים, בחר שם אחר";
    })
  })

  if (this.error == "שם זה כבר קיים, בחר שם אחר")
    return;
*/

    // Create a new chat room


    
  }

 
  saveUserDetails()
  {
     var userInfo = this.af.database.list('registeredUsers/', { preserveSnapshot: true });

        userInfo.subscribe(snapshots => 
        {
          snapshots.forEach(snapshot => 
          {
            if (snapshot.val().email == this.email)
            {
              this.uid = snapshot.key;
              this.permission = snapshot.val().permission;
              //console.log(snapshot.val());
            }
          })
        })
  }

  // ================================

  //  name = user.displayName;
  //  email = user.email;
  //  photoUrl = user.photoURL;
  //  emailVerified = user.emailVerified;
  //  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
  //                    // this value to authenticate with your backend server, if
  //                    // you have one. Use User.getToken() instead.

<<<<<<< HEAD
  getUserPermission() 
  {
    return this.permission;
=======
  getUserPermission() {
>>>>>>> 3e5ffa03ea05dffa5ff4a6984918779c85d8ad70
  }


  // ================================

<<<<<<< HEAD
  getUid()
  {
    //console.log(this.uid);
=======
  getUid() {
    console.log(this.uid);
>>>>>>> 3e5ffa03ea05dffa5ff4a6984918779c85d8ad70
    return this.uid;
  }

  // ================================

}

