
import { Injectable } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

// For 'firebase.auth()'
import * as firebase from "firebase";

@Injectable()

export class AF 
{
  public messages: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public displayName: string;
  public email: string;
  
  // ================================

  constructor (public af: AngularFire) 
  {
    this.messages = this.af.database.list('messages');
  }

  // ================================
  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */

  // ================================

  // loginWithGoogle() 
  // {
  //   return this.af.auth.login({
  //     provider: AuthProviders.Google,
  //     method: AuthMethods.Popup,
  //   });
  // }

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

  sendMessage(text) 
  {
    var message = 
    {
      message: text,
      displayName: this.displayName,
      email: this.email,
      timestamp: Date.now()
    };
    
    this.messages.push(message);
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
    return this.af.database.object('registeredUsers/' + uid).set({
      name: name,
      email: email,
      permission: 3
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
    return this.af.auth.login({
        email: email,
        password: password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  // ================================

//  name = user.displayName;
//  email = user.email;
//  photoUrl = user.photoURL;
//  emailVerified = user.emailVerified;
//  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//                    // this value to authenticate with your backend server, if
//                    // you have one. Use User.getToken() instead.

  getUserPermission()
  {
    var uid;
    var registeredUsers = [];

    firebase.auth().onAuthStateChanged(function(user) 
    {
      // User is signed in.
      if (user) 
      { 
        // The user's ID, unique to the Firebase project.
        uid = user.uid;

          //this.users = this.af.database.list('registeredUsers');

      } 
       // No user is signed in.
      else 
      {
        // No user is signed in.
      }
  });
   this.users = this.af.database.list('registeredUsers');
  
  }

}

