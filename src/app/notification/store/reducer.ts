import * as NotificationActions from './actions';
import { Notification } from '../models/notification.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: []
};

export function reducer(
  state = initialState,
  action: NotificationActions.ActionsUnion
): NotificationState {
  switch (action.type) {
    case NotificationActions.ActionTypes.AddNotification:
      return {
        ...state,
        notifications: [...state.notifications, <Notification>action.payload]
      };

    case NotificationActions.ActionTypes.RemoveNotification:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };

    default:
      return state;
  }
}

export const getNotificationsState = createFeatureSelector<NotificationState>(
  'notifications'
);

export const getNotifications = createSelector(
  getNotificationsState,
  state => state.notifications
);
