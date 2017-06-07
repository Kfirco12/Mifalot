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

  private header = 
  { 
     title: "הודעות", 
     subTitle: "באפשרותך לשלוח הודעה לשאר המשתמשים",
     icon: "fa-comments" 
  }
  
  // Strings
  private newMessage: string;
  private userEmail: string;
  private chatRoomTitle: string;
  private savedDate: string = '';

  // DB Observables
  private chatRooms: FirebaseListObservable<any>;
  private currentChat: FirebaseListObservable<any>;

  // Flags
  private noChatRoomSelected: boolean;
  private createNewChatRoom: boolean;

  private error: any;

  private user;
  // ==================================================

  constructor(private afService: AF, private ref: ChangeDetectorRef) 
  {
    this.chatRooms = this.afService.af.database.list('chatRooms');

    this.user = 
    { 
      uid: null,
      email: null,
      name: null,
      lastName: null,
      ID: null,
      permission: null, 
      phoneNumber: null
    };

    this.afService.getUserDetails(this.user);

    // Flags
    this.noChatRoomSelected = true;
    this.createNewChatRoom = false;
  }

  // ==================================================

  createsNewChatRoom(chatName)
  {
    var newChat = { name: chatName };

    // Create a new chat room
    var newChatInDB = this.chatRooms.push(newChat);
    this.currentChat = this.afService.af.database.list('chatRooms/' + newChatInDB.key + '/messages');

    // Updating chat's title
    this.chatRoomTitle = chatName;

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
    this.chatRoomTitle = chatRoom.name;
    this.currentChat = this.afService.af.database.list('chatRooms/' + chatRoom.$key + '/messages');
    this.noChatRoomSelected = false;
  }

  //===================================================
  
  isMe(email) 
  {
    if (this.user.email == email)
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

  sendMessage()
  {
    this.afService.sendMessage(this.newMessage, this.user.name, this.user.lastName, this.currentChat).then(x => 
    {
      this.newMessage = '';
      this.scrollToBottom();
    });
  }

  // ==================================================

 ngAfterViewChecked() 
 {
    // this.scrollToBottom();
  }

  // ==================================================

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

  // ==================================================

}















