export const enum NotificationType {
  SUCCESS = 1,
  ERROR = 2,
  INFO = 3,
  WARNING = 4
}

export class Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  hideAfterSeconds: number;

  constructor(
    title: string,
    description: string,
    type: NotificationType,
    hideAfterSeconds?: number,
    code?: string
  ) {
    this.id = this.newGuid();
    this.title = title;
    this.description = description;
    this.type = type;
    this.hideAfterSeconds = hideAfterSeconds || 0;
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:no-bitwise
      const r = (Math.random() * 16) | 0,
        // tslint:disable-next-line:no-bitwise
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
