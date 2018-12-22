import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthModule } from 'app/auth/auth.module';
import { WelcomeHeroComponent } from './components/welcome-hero/welcome-hero.component';
import { WelcomeFormsComponent } from './components/welcome-forms/welcome-forms.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    AuthModule,
    SharedModule
  ],
  declarations: [WelcomeComponent, WelcomeHeroComponent, WelcomeFormsComponent]
})
export class WelcomeModule {}
