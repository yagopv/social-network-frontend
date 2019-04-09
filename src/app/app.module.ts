import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

import { GlobalState } from './shared/store/global.state';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { AuthModule } from './features/auth/auth.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/ core.module';
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
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: false }),
    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot([GlobalState], {
      developmentMode: !environment.production
    }),
    SharedModule,
    AuthModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadUser,
      deps: [UserStore],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
