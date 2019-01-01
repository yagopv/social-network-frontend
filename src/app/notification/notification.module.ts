import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationPanelComponent } from './containers/notification-panel/notification-panel.component';
import * as fromNotifications from './store/reducer';

@NgModule({
  declarations: [NotificationComponent, NotificationPanelComponent],
  imports: [CommonModule],
  exports: [NotificationComponent]
})
export class NotificationModule {}
