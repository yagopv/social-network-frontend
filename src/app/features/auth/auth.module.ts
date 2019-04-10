import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
