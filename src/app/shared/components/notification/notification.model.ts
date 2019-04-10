export enum NotificationName {
  ACCOUNT_ACTIVATED = 'account-activated',
  ACCOUNT_NOT_ACTIVATED = 'account-not-activated',
  REGISTRATION_SUCCESS = 'registration-success',
  REQUEST_NEW_FRIEND = 'request-new-friend'
}

export enum NotificationType {
  SUCCESS,
  ERROR
}

export class NotificationModel {
  title: string;
  message: string;
  type: NotificationType;

  constructor(private notificationName: NotificationName) {
    switch (this.notificationName) {
      case NotificationName.ACCOUNT_ACTIVATED:
        this.title = 'Activation success';
        this.message = 'Your account was successfully activated';
        this.type = NotificationType.SUCCESS;
        break;
      case NotificationName.ACCOUNT_NOT_ACTIVATED:
        this.title = 'Activation failed';
        this.message = 'Please try again or contact with us';
        this.type = NotificationType.ERROR;

        break;
      case NotificationName.REGISTRATION_SUCCESS:
        this.title = 'Registration finished';
        this.message =
          'Now, go to your email app and click on the provided link for activate your account';
        this.type = NotificationType.SUCCESS;
        break;
      case NotificationName.REQUEST_NEW_FRIEND:
        this.title = 'Your request has been emitted';
        this.message =
          'Now you have to wait until the request will be accepted';
        this.type = NotificationType.SUCCESS;
        break;
      default:
        break;
    }
  }
}
