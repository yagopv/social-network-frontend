import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export enum NotificationType {
  ACCOUNT_ACTIVATED = 'account-activated',
  REGISTRATION_SUCCESS = 'registration-success'
}
export class NotificationModel {
  title: string;
  icon: IconProp;
  message: string;

  constructor(private notificationType: NotificationType) {
    switch (this.notificationType) {
      case NotificationType.ACCOUNT_ACTIVATED:
        this.title = 'Activation success';
        this.icon = faCheck;
        this.message = 'Your account was successfully activated';
        break;
      case NotificationType.REGISTRATION_SUCCESS:
        this.title = 'Registration finished';
        this.icon = faCheck;
        this.message =
          'Now, go to your email app and click on the provided link for activate your account';
        break;
      default:
        break;
    }
  }
}
