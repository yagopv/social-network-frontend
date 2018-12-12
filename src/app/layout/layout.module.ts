import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { SiteLayoutHeaderComponent } from './components/site-layout-header/site-layout-header.component';
import { SiteLayoutFooterComponent } from './components/site-layout-footer/site-layout-footer.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { AppLayoutAsideComponent } from './components/app-layout-aside/app-layout-aside.component';
import { AppLayoutNavComponent } from './components/app-layout-nav/app-layout-nav.component';
import { AppLayoutHeaderComponent } from './components/app-layout-header/app-layout-header.component';
import { AppLayoutFooterComponent } from './components/app-layout-footer/app-layout-footer.component';
import { FriendsRequestModule } from 'app/friends-request/friends-request.module';
import { SiteLayoutComponent } from './components/site-layout/site-layout.component';

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
