import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthModule } from 'app/auth/auth.module';

@NgModule({
  imports: [CommonModule, RouterModule, AuthModule, SharedModule],
  declarations: [WelcomeComponent]
})
export class WelcomeModule {}
