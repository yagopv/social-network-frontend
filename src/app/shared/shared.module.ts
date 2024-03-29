import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { MeComponent } from './components/me/me.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ClockComponent } from './components/clock/clock.component';
import { PagerComponent } from './components/pager/pager.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NullDefaultDirective } from './directives/null-default.directive';
import { TextAreaDirective } from './directives/textarea-directive';
import { IfDirective } from './directives/if.directive';
import { ColorizerDirective } from './directives/colorizer.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { UserFriendlyDatePipe } from './pipes/user-friendly-date.pipe';
import { MarkAsTouchedDirective } from './directives/mark-as-touched.directive';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  declarations: [
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    PublisherComponent,
    UserFriendlyDatePipe,
    MeComponent,
    CapitalizePipe,
    TextAreaDirective,
    AvatarComponent,
    ClockComponent,
    PagerComponent,
    NullDefaultDirective,
    IfDirective,
    ColorizerDirective,
    ValidationMessagesComponent,
    FileUploadComponent,
    MarkAsTouchedDirective
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    PublisherComponent,
    UserFriendlyDatePipe,
    MeComponent,
    CapitalizePipe,
    TextAreaDirective,
    AvatarComponent,
    ClockComponent,
    PagerComponent,
    NullDefaultDirective,
    IfDirective,
    ColorizerDirective,
    ValidationMessagesComponent,
    FileUploadComponent,
    MarkAsTouchedDirective
  ]
})
export class SharedModule {}
