import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  style,
  animate,
  transition,
  trigger,
  keyframes,
  state
} from '@angular/animations';
import {
  Notification,
  NotificationType
} from '../../models/notification.model';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'hab-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.html'],
  animations: [
    trigger('animLoad', [
      state('inactive', style({ opacity: 0 })),
      state('active', style({ opacity: 1 })),
      transition(
        'void => active',
        animate(
          '0.5s linear',
          keyframes([
            style({ opacity: 1, transform: 'scale3d(0,0.05,1)', offset: 0 }),
            style({ opacity: 1, transform: 'scale3d(1,0.05,1)', offset: 0.85 }),
            style({ opacity: 1, transform: 'scale3d(1,1,1)', offset: 1.0 })
          ])
        )
      ),
      transition('active => inactive', animate('300ms ease-out'))
    ]),
    trigger('animFadeMove', [
      state('inactive', style({ opacity: 0 })),
      state('active', style({ opacity: 1 })),
      transition(
        'void => active',
        animate(
          '0.3s 0.5s ease-out',
          keyframes([
            style({
              opacity: 0,
              transform: 'translate3d(0,10px,0)',
              offset: 0
            }),
            style({ opacity: 1, transform: 'translate3d(0,0,0)', offset: 1.0 })
          ])
        )
      ),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class NotificationComponent implements OnInit {
  @Input() notification: Notification;
  @Output() dismiss;

  animationState: string;
  smiley: string;
  notificationClass: string;

  constructor() {
    this.dismiss = new EventEmitter();
  }

  ngOnInit() {
    this.animationState = 'active';
    this.smiley = this.getSmiley();
    this.notificationClass = this.getNotificationClass();
    if (this.notification.hideAfterSeconds) {
      timer(this.notification.hideAfterSeconds).subscribe(() => this.remove());
    }
  }

  remove() {
    this.animationState = 'inactive';
    timer(300).subscribe(() => this.dismiss.emit(this.notification));
  }

  getNotificationClass() {
    let alertType = '';
    switch (this.notification.type) {
      case NotificationType.WARNING:
        alertType = 'alert-warning';
        break;

      case NotificationType.ERROR:
        alertType = 'alert-danger';
        break;

      case NotificationType.SUCCESS:
        alertType = 'alert-success';
        break;

      default:
        alertType = 'alert-info';
    }
    return `alert ${alertType} alert-dismissible`;
  }

  getSmiley() {
    switch (this.notification.type) {
      case NotificationType.INFO:
        return ':|';
      case NotificationType.ERROR:
        return ':(';
      case NotificationType.SUCCESS:
        return ':)';
      case NotificationType.WARNING:
        return ':/';
    }
  }
}
