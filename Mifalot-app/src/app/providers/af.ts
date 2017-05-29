
import { Injectable } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

// For take() 
import 'rxjs/Rx';

@Injectable()

export class AF 
{
  public chatRooms: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;

  // User info
  private displayName: string;
  private email: string;
  private uid: string;
  private permission: number;
  
  private userTeams = [];

  // ================================

  constructor(public af: AngularFire) 
  {
    //this.saveUserDetails();
    this.chatRooms = this.af.database.list('chatRooms');

    //this.getUserTeamsFromDB();
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

  sendMessage(text, chatRoom) 
  {
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

  saveUserInfoFromForm(uid, name, email) 
  {      
    return this.af.database.object('registeredUsers/' + uid).set(
    {
      name: name,
      email: email,
      permission: 4
    });
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
        this.uid = user.uid;

        var userInfo = this.af.database.object('registeredUsers/' + user.uid, { preserveSnapshot: true }).take(1);
        
       var usersSubscription = userInfo.subscribe(snapshot => 
        {
          this.permission = snapshot.val().permission;
        })

      // // Unsubscribe
      // usersSubscription.unsubscribe();
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

 
  saveUserDetails(uid, permission, name, email)
  {
    this.uid = uid;
    this.permission = permission;
    this.displayName = name;
    this.email = email;
  }

  // ================================

  //  name = user.displayName;
  //  email = user.email;
  //  photoUrl = user.photoURL;
  //  emailVerified = user.emailVerified;
  //  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
  //                    // this value to authenticate with your backend server, if
  //                    // you have one. Use User.getToken() instead.

setUserID(userID)
{
  this.uid = userID;
}

  getUserPermission() 
  {
    return this.permission;
  }

 getUserName() 
  {
    return this.displayName;
  }

 getUserEmail() 
  {
    return this.email;
  }

  getUserType() 
  {
    return this.permission;
  }

  // ================================

  getUid()
  {
    //console.log(this.uid);
    return this.uid;
  }

  getUserTeams()
  {
    return this.userTeams;
  }

  // ================================
  //        Global Methods
  // ================================

 getUserTeamsFromDB() 
  {
    var allTeams = this.af.database.list('teams/', { preserveSnapshot: true }).take(1);
  
     allTeams.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          if (snapshot.val().coachID == this.uid) 
            this.userTeams.push(snapshot.val());
        })
      })

    }

  // ================================




}

