import { NgModule, APP_INITIALIZER } from '@angular/core';
import { UserStore } from './core/store/user.store';
import { NotificationService } from './core/services/notification.service';

export function loadUser(
  userStore: UserStore,
  notificationService: NotificationService
) {
  return () => {
    if (localStorage.getItem('auth')) {
      return userStore.getProfile().toPromise();
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
