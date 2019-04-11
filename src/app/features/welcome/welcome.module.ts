import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { AuthModule } from '../auth/auth.module';
import { WelcomeHeroComponent } from './components/welcome-hero/welcome-hero.component';
import { WelcomeFormsComponent } from './components/welcome-forms/welcome-forms.component';

const routes: Routes = [{ path: 'welcome', component: WelcomePageComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    WelcomePageComponent,
    WelcomeHeroComponent,
    WelcomeFormsComponent
  ]
})
export class WelcomeModule {}
