import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeHeroComponent } from './welcome-hero/welcome-hero.component';
import { WelcomeFormsComponent } from './welcome-forms/welcome-forms.component';
import { LoginModule } from '../login/login.module';
import { RegisterModule } from '../register/register.module';

const routes: Routes = [{ path: 'welcome', component: WelcomeComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LoginModule,
    RegisterModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomeComponent, WelcomeHeroComponent, WelcomeFormsComponent]
})
export class WelcomeModule {}
