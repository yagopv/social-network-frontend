import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NotificationService } from './core/services/notification.service';
import { UserService } from './core/services/user.service';

export function loadUser(
  userStore: UserService,
  notificationService: NotificationService // Required in order to show notifications on boostrap
) {
  return () => {
    if (localStorage.getItem('auth')) {
      return new Promise((resolve, reject) => {
        userStore
          .getUserProfile()
          .toPromise()
          .then(data => resolve(data))
          .catch(error => {
            resolve(error);
          });
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
      deps: [UserService, NotificationService],
      multi: true
    }
  ]
})
export class AppInitializeModule {}
