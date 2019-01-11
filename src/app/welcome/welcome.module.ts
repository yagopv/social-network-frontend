import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthModule } from '../auth/auth.module';
import { WelcomeHeroComponent } from './components/welcome-hero/welcome-hero.component';
import { WelcomeFormsComponent } from './components/welcome-forms/welcome-forms.component';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    AuthModule,
    SharedModule,
    WelcomeRoutingModule
  ],
  declarations: [WelcomeComponent, WelcomeHeroComponent, WelcomeFormsComponent]
})
export class WelcomeModule {}
