import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';


@Component({
  //selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit, AfterViewChecked
{

  header = 
  { 
     title: "הודעות", 
     subTitle: "באפשרותך לשלוח הודעה לשאר המשתמשים",
     icon: "fa-comments" 
  }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  messages: FirebaseListObservable<any>;
  name: any;
  msgVal: string = '';
  savedDate: string = '';

  // ==================================================

  constructor(private af: AngularFire) 
  {
    this.messages = af.database.list('messages', {
      // only 5 last messages will popup
      query: {
        limitToLast: 30
      }
    });

    // If user success to connect, save his name for the chat
    this.af.auth.subscribe(auth => {
      if (!auth)
      {
        this.name = "auth";
      }
    });
  }

  // ==================================================
  // If need to print the date ahead
  needToPrint(itemDate)
  {
    var date = itemDate;

    if (date != this.savedDate)
    {
      this.savedDate = date;
      return true;
    }

    return false;
  }
  // ==================================================

/*
  // Login using email and password
  login ()
  {
    this.af.auth.login({
      provider: AuthProviders.Password,
      method: AuthMethods.Popup
    })
  }
*/

// ==================================================

  chatSend(theirMessage: string)
  {
    if (theirMessage == null || theirMessage == '')
      return;

    this.messages.push({message: theirMessage, name: this.name, date: new Date().toLocaleString()});
    this.msgVal = '';
  }

  // ==================================================

 ngAfterViewChecked() 
 {
   // this.scrollToBottom();
  }

  scrollToBottom(): void 
  {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }


// ==================================================

  ngOnInit() 
  {

  }

}















