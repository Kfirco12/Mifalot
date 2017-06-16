import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AF } from "../../providers/af";
import { ShareService } from "../../providers/share-service";
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
  private backButton;

  // Search
  private chatName: string;

  // ==================================================

  constructor(private afService: AF, private ref: ChangeDetectorRef, private shareService: ShareService) 
  {
    // Initialize button values
    this.backButton = this.shareService.getButton();
    this.shareService.updateBackButton('home');

    this.user = this.afService.getUserDetails();
    this.chatRooms = this.afService.af.database.list('chatRooms');

    // Flags
    this.noChatRoomSelected = true;
    this.createNewChatRoom = this.editChatRoom = false;

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
    this.header.title = chatName;
    this.header.subTitle = "פותח הצ'אט: " + authorName;
    this.header.icon = '';

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
    this.noChatRoomSelected = false;
    this.createNewChatRoom = true;
    this.shareService.updateBackButton('back');
  }

  //===================================================

  enterChatRoom(chatRoom)
  { 
    if (!this.editChatRoom)
    {
      this.currentChatDetails = chatRoom;

      // Updating chat's title
      this.updateHeader(chatRoom.name, "פותח הצ'אט: " + chatRoom.authorName);

      this.currentChat = this.afService.af.database.list('chatRooms/' + chatRoom.$key + '/messages');

      // Updating nav button
      this.shareService.updateBackButton('back');

      this.noChatRoomSelected = false;
    }
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
    if(confirm("האם למחוק הודעה זו?"))
      this.chatRooms.remove(chatRoom.$key);
  }

  // ==================================================

  editChatRoomName(chatRoom)
  {
    this.currentChatDetails = chatRoom;

    // Updating flags
    this.noChatRoomSelected = false;
    this.editChatRoom = true;

    // Updating nav button
    this.shareService.updateBackButton('back');
  }

  // ==================================================

  updateChatRoomName(name)
  {
    let currentChat = this.afService.af.database.object('chatRooms/' + this.currentChatDetails.$key);
    currentChat.update({name: name});
    
    // Updating flags
    this.editChatRoom = false;
    this.noChatRoomSelected = true;
  }

  // ==================================================

  initializeHeader()
  {
     this.header.title = "הודעות";
     this.header.subTitle = "באפשרותך לשלוח הודעה לשאר המשתמשים";
     this.header.icon = "fa-comments";
  }
  
  // ==================================================

  updateHeader(title, subTitle, icon = '')
  {
     this.header.title = title;

     if (subTitle)
      this.header.subTitle = subTitle;

     this.header.icon = icon;
  }
  
  // ==================================================

  navigate()
  {
    // Navigate to home page
    if (this.noChatRoomSelected)
      this.shareService.navigate('');

    // Back To messages
    if (!this.noChatRoomSelected)
    {
      this.noChatRoomSelected = !this.noChatRoomSelected;
      this.shareService.updateBackButton('home');
    } 

    if (this.createNewChatRoom || this.editChatRoom)
    {
      this.chooseChatRoom();
      this.shareService.updateBackButton('home');
    }

    // Header reset
    this.updateHeader("הודעות", "באפשרותך לשלוח הודעה לשאר המשתמשים", "fa-comments"); 
  }

  // ==================================================

  ngOnInit() { }

  // ==================================================

}















