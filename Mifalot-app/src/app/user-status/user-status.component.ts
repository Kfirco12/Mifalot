import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShareService } from "../providers/share-service";

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})

export class UserStatusComponent implements OnInit 
{
  @Input() permission;
  @Output() onNavigate: EventEmitter<any> = new EventEmitter();

  constructor(private shareService: ShareService) { }

  ngOnInit() 
  {
    // User try to access to a page without permission
    if (this.permission == 0)
    {
      this.onNavigate.emit();
      this.shareService.navigate("");
    }
   }

}
