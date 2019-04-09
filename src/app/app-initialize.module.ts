import { NgModule, APP_INITIALIZER } from '@angular/core';
import { UserStore } from './core/store/user.store';

export function loadUser(userStore: UserStore) {
  return () => {
    if (userStore && userStore.state.accessToken) {
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
      deps: [UserStore],
      multi: true
    }
  ]
})
export class AppInitializeModule {}
