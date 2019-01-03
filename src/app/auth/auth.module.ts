import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { AuthState } from './auth.state';
import { ErrorModule } from 'app/error/error.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ErrorModule,
    NgxsModule.forFeature([AuthState])
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
