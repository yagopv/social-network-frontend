import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { AuthModule } from './features/auth/auth.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/ core.module';
import { HttpClientModule } from '@angular/common/http';
import { AppInitializeModule } from './app-initialize.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppInitializeModule,
    CoreModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    LayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
