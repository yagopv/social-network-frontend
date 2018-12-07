import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { SiteLayoutComponent } from 'app/layout/site-layout/site-layout.component';
import { SiteLayoutHeaderComponent } from './site-layout-header/site-layout-header.component';
import { SiteLayoutFooterComponent } from './site-layout-footer/site-layout-footer.component';
import { AppLayoutComponent } from 'app/layout/app-layout/app-layout.component';
import { AppLayoutAsideComponent } from './app-layout-aside/app-layout-aside.component';
import { AppLayoutNavComponent } from './app-layout-nav/app-layout-nav.component';
import { AppLayoutHeaderComponent } from './app-layout-header/app-layout-header.component';
import { AppLayoutFooterComponent } from './app-layout-footer/app-layout-footer.component';
import { FriendsRequestModule } from 'app/friends-request/friends-request.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FriendsRequestModule,
    SharedModule
  ],
  declarations: [
    SiteLayoutComponent,
    SiteLayoutHeaderComponent,
    SiteLayoutFooterComponent,
    AppLayoutComponent,
    AppLayoutHeaderComponent,
    AppLayoutAsideComponent,
    AppLayoutNavComponent,
    AppLayoutFooterComponent
  ]
})
export class LayoutModule {}
