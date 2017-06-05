import { Component, OnInit } from '@angular/core';
import { PushNotificationComponent } from 'ng2-notifications/ng2-notifications';

@Component({
  selector: 'app-push',
   template: `
  <push-notification 
    title="ng2-notifications"
    body="Component for Native Push Notifications"
    icon="https://goo.gl/3eqeiE">
  </push-notification>
  `,
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css']
})
export class PushComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
