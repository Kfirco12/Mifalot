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

  private header = 
  { 
     title: "הודעות", 
     subTitle: "באפשרותך לשלוח הודעה לשאר המשתמשים",
     icon: "fa-comments" 
  }
  
  private newMessage: string;
  private userEmail: string;

  private chatRooms: FirebaseListObservable<any>;
  private currentChat: FirebaseListObservable<any>;

  private noChatRoomSelected: boolean;
  private createNewChatRoom: boolean;

  private error: any;

  // ==================================================

  constructor(private afService: AF, private ref: ChangeDetectorRef) 
  {
      this.chatRooms = this.afService.chatRooms;
      this.userEmail = this.afService.getUserEmail();
      this.noChatRoomSelected = true;
      this.createNewChatRoom = false;
  }

  // ==================================================

  createsNewChatRoom(chatName)
  {
    var newChat =
      {
        name: chatName
      };

    var chatRooms = this.afService.af.database.list('chatRooms/', { preserveSnapshot: true });
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
    chatRooms.push(newChat);

    chatRooms.subscribe(snapshots => {
    snapshots.forEach(snapshot => {
      if (snapshot.val().name == chatName)
        this.currentChat = this.afService.af.database.list('chatRooms/' + snapshot.key + '/messages');
    });
  })

    // Updating flags
    this.noChatRoomSelected = false;
    this.createNewChatRoom = false;
  }


  // ==================================================
  
  chooseChatRoom()
  {
    this.noChatRoomSelected = true;
    this.createNewChatRoom = false;
  }

  // ==================================================

  newChatRoom()
  {
    this.createNewChatRoom = true;
  }

  //===================================================
  enterChatRoom(chatRoom)
  {
    this.currentChat = this.afService.af.database.list('chatRooms/' + chatRoom.$key + '/messages');
    this.noChatRoomSelected = false;
  }

  //===================================================
  
  isMe(email) 
  {
    if (email == this.userEmail)
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
    this.afService.sendMessage(this.newMessage, this.currentChat);
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















