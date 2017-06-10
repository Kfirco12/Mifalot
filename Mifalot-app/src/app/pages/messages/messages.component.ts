import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from "../../providers/af";
import { ChangeDetectorRef } from "@angular/core";

@Component({
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
  private chatRoomAuthor: string;
  private savedDate: string;

  // DB Observables
  private chatRooms: FirebaseListObservable<any>;
  private currentChat: FirebaseListObservable<any>;

  // Flags
  private noChatRoomSelected: boolean;
  private createNewChatRoom: boolean;
  private editChatRoom: boolean;

  // Object
  private currentChatDetails;
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
    this.createNewChatRoom = this.editChatRoom =false;

    this.savedDate = '';
  }

  // ==================================================

  createsNewChatRoom(chatName)
  {
    let authorName = this.user.name + " " + this.user.lastName;
    let newChat = { name: chatName, authorName: authorName, authorID: this.user.uid };

    // Create a new chat room
    let newChatInDB = this.chatRooms.push(newChat);
    this.currentChat = this.afService.af.database.list('chatRooms/' + newChatInDB.key + '/messages');

    // Updating chat's title
    this.chatRoomTitle = chatName;
    this.chatRoomAuthor = authorName;

    // Updating flags
    this.noChatRoomSelected = false;
    this.createNewChatRoom = false;
  }


  // ==================================================
  
  chooseChatRoom()
  {
    this.noChatRoomSelected = true;
    this.createNewChatRoom = this.editChatRoom = false;
  }

  // ==================================================

  newChatRoom()
  {
    this.createNewChatRoom = true;
  }

  //===================================================

  enterChatRoom(chatRoom)
  { 
    this.currentChatDetails = chatRoom;

    this.chatRoomTitle = chatRoom.name;
    this.chatRoomAuthor = chatRoom.authorName;

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

  removeChatRoom(chatRoom)
  {
    this.chatRooms.remove(chatRoom.$key);
  }

  // ==================================================

  editChatRoomName(chatRoom)
  {
    this.currentChatDetails = chatRoom;
    this.editChatRoom = true;
  }

  // ==================================================

  updateChatRoomName(name)
  {
    let currentChat = this.afService.af.database.object('chatRooms/' + this.currentChatDetails.$key);
    currentChat.update({name: name});
    
    // Updating chat's title
    this.chatRoomTitle = name;

    this.editChatRoom = false;
    this.noChatRoomSelected = true;
  }

  // ==================================================

  ngOnInit() { }

  // ==================================================

}















