import { Action } from '@ngrx/store';
import { Notification } from '../models/notification.model';

export const ActionTypes = {
  AddNotification: '[Notification] Add',
  RemoveNotification: '[Notification] Remove'
};

export class AddNotificationAction implements Action {
  readonly type = ActionTypes.AddNotification;
  constructor(public payload: Notification) {}
}

export class RemoveNotificationAction implements Action {
  readonly type = ActionTypes.RemoveNotification;
  constructor(public payload: string) {}
}

export type ActionsUnion = AddNotificationAction | RemoveNotificationAction;
