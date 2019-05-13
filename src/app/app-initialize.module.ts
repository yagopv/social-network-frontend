import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NotificationService } from './core/services/notification.service';
import { UserService } from './core/services/user.service';
import { FriendService } from './core/services/friends.service';

export function loadUser(
  userService: UserService,
  friendsService: FriendService,
  notificationService: NotificationService // Required in order to show notifications on boostrap
) {
  return () => {
    if (localStorage.getItem('auth')) {
      return new Promise(async resolve => {
        try {
          const user = await userService.getUserProfile().toPromise();
          const friends = await friendsService.getFriends().toPromise();

          return resolve({ user, friends });
        } catch (error) {
          return resolve(error);
        }
      });
    }
    return Promise.resolve();
  };
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadUser,
      deps: [UserService, FriendService, NotificationService],
      multi: true
    }
  ]
})
export class AppInitializeModule {}
