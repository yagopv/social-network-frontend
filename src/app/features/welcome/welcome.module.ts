import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../../shared/shared.module';
import { WelcomeComponent } from './pages/welcome.component';
import { AuthModule } from '../auth/auth.module';
import { WelcomeHeroComponent } from './components/welcome-hero/welcome-hero.component';
import { WelcomeFormsComponent } from './components/welcome-forms/welcome-forms.component';

const routes: Routes = [{ path: 'welcome', component: WelcomeComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    AuthModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomeComponent, WelcomeHeroComponent, WelcomeFormsComponent]
})
export class WelcomeModule {}
