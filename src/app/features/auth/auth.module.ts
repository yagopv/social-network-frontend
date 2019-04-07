import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { JwtInterceptor } from '../../core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from '../../core/interceptors/error.interceptor';
import { AuthState } from './store/auth.state';
import { ErrorModule } from '../error/error.module';
import { ProfileComponent } from './containers/profile/profile.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { TemplateDrivenFormComponent } from './components/template-driven-form/template-driven-form.component';
import { MailValidatorDirective } from './validators/mail.validator';

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ErrorModule,
    NgxsModule.forFeature([AuthState])
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FileUploadComponent,
    AuthLayoutComponent,
    ReactiveFormComponent,
    TemplateDrivenFormComponent,
    MailValidatorDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FileUploadComponent
  ]
})
export class AuthModule {}
