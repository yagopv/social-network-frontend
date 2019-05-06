import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeHeroComponent } from './welcome-hero/welcome-hero.component';
import { WelcomeFormsComponent } from './welcome-forms/welcome-forms.component';

const routes: Routes = [{ path: '', component: WelcomeComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomeComponent, WelcomeHeroComponent, WelcomeFormsComponent]
})
export class WelcomeModule {}
