import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WelcomeRoutingModule,
    SharedModule
  ],
  declarations: [WelcomeComponent, RegisterFormComponent]
})
export class WelcomeModule {}
