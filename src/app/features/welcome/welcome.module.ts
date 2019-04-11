import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthModule } from '../auth/auth.module';
import { WelcomeHeroComponent } from './welcome-hero/welcome-hero.component';
import { WelcomeFormsComponent } from './welcome-forms/welcome-forms.component';

const routes: Routes = [{ path: 'welcome', component: WelcomeComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomeComponent, WelcomeHeroComponent, WelcomeFormsComponent]
})
export class WelcomeModule {}
