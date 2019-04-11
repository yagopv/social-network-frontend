import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { UserFriendlyDatePipe } from './pipes/user-friendly-date.pipe';
import { MeComponent } from './components/me/me.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TextAreaDirective } from './directives/textarea-directive';
import { AvatarComponent } from './components/avatar/avatar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ClockComponent } from './components/clock/clock.component';
import { PagerComponent } from './components/pager/pager.component';
import { NullDefaultDirective } from './directives/null-default.directive';
import { IfDirective } from './directives/if.directive';
import { ColorizerDirective } from './directives/colorizer.directive';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    NotFoundPageComponent,
    PublisherComponent,
    UserFriendlyDatePipe,
    MeComponent,
    NotificationComponent,
    CapitalizePipe,
    TextAreaDirective,
    AvatarComponent,
    LoaderComponent,
    ClockComponent,
    PagerComponent,
    NullDefaultDirective,
    IfDirective,
    ColorizerDirective,
    ValidationMessagesComponent,
    FileUploadComponent
  ],
  exports: [
    NotFoundPageComponent,
    PublisherComponent,
    UserFriendlyDatePipe,
    MeComponent,
    NotificationComponent,
    CapitalizePipe,
    TextAreaDirective,
    AvatarComponent,
    LoaderComponent,
    ClockComponent,
    PagerComponent,
    NullDefaultDirective,
    IfDirective,
    ColorizerDirective,
    ValidationMessagesComponent,
    FileUploadComponent
  ]
})
export class SharedModule {}
