import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from "../../providers/af";
import { ChangeDetectorRef } from "@angular/core";


@Component({
  //selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})


export class MessagesComponent implements OnInit, AfterViewChecked
{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  savedDate: string = '';

  header = 
  { 
     title: "הודעות", 
     subTitle: "באפשרותך לשלוח הודעה לשאר המשתמשים",
     icon: "fa-comments" 
  }
  
  public newMessage: string;
  public messages: FirebaseListObservable<any>;

  // ==================================================

  constructor(public afService: AF, private ref: ChangeDetectorRef) 
  {
      this.messages = this.afService.messages;
  }

  // ==================================================
  isMe(email) 
  {
    if (email == this.afService.email)
      return true;
    
    return false;
  }

  // ==================================================
  // If need to print the date ahead

  needToPrint(date)
  {
    if (this.savedDate != date)
    {
      this.savedDate = date;
      //this.ref.detectChanges();

      return true;
    }
    //this.ref.detectChanges();
     return false;
  }


// ==================================================
/*
  chatSend(theirMessage: string)
  {
    if (theirMessage == null || theirMessage == '')
      return;

    this.items.push({message: theirMessage, name: this.name, date: new Date().toLocaleString()});
    this.msgVal = '';
  }
*/
  // ==================================================

  sendMessage()
  {
    this.afService.sendMessage(this.newMessage);
    this.newMessage = '';
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















