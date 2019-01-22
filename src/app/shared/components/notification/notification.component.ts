import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationModel } from './notification.model';

@Component({
  selector: 'hab-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  notification: NotificationModel;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.notification = new NotificationModel(
      this.route.snapshot.params.notificationName
    );
  }

  close() {
    this.router.navigate([{ outlets: { popup: null } }]);
  }
}
