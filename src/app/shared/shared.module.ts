import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { ClickPreventDefaultDirective } from './directives/click-prevent-default.directive';
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
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, FontAwesomeModule],
  declarations: [
    NotFoundComponent,
    ClickPreventDefaultDirective,
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
    HeaderComponent,
    FooterComponent,
    ValidationMessagesComponent
  ],
  exports: [
    NotFoundComponent,
    ClickPreventDefaultDirective,
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
    HeaderComponent,
    FooterComponent,
    ValidationMessagesComponent
  ]
})
export class SharedModule {}
