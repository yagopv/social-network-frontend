import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromNotifications from '../../store/reducer';
import { Notification } from 'app/notification/models/notification.model';
import { RemoveNotificationAction } from '../../store/actions';

@Component({
  selector: 'hab-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.scss']
})
export class NotificationPanelComponent {
  notifications$: Observable<Notification[]>;

  constructor(private store: Store<fromNotifications.NotificationState>) {
    this.notifications$ = store.pipe(
      select(fromNotifications.getNotifications)
    );
  }

  removeNotification(id: string) {
    this.store.dispatch(new RemoveNotificationAction(id));
  }
}
