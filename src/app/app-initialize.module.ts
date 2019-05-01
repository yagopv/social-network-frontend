import { NgModule, APP_INITIALIZER } from '@angular/core';
import { UserStore } from './core/store/user.store';
import { NotificationService } from './core/services/notification.service';

export function loadUser(
  userStore: UserStore,
  notificationService: NotificationService // Required in order to show notifications on boostrap
) {
  return () => {
    if (localStorage.getItem('auth')) {
      return new Promise((resolve, reject) => {
        userStore
          .getProfile()
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
      deps: [UserStore, NotificationService],
      multi: true
    }
  ]
})
export class AppInitializeModule {}
