import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { FormGroupComponent } from '../shared/components/form-group/form-group.component';
import { ClickPreventDefaultDirective } from './directives/click-prevent-default.directive';
import { FormControlComponent } from './components/form-control/form-control.component';
import { MailValidatorDirective } from './validators/mail.validator';
import { PublisherComponent } from './components/publisher/publisher.component';
import { UserFriendlyDatePipe } from './pipes/user-friendly-date.pipe';
import { MeComponent } from './components/me/me.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CenteredLayoutComponent } from './components/centered-layout/centered-layout.component';
import { SiteLayoutHeaderComponent } from './components/site-layout-header/site-layout-header.component';
import { SiteLayoutFooterComponent } from './components/site-layout-footer/site-layout-footer.component';
import { SiteLayoutComponent } from './components/site-layout/site-layout.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TextAreaDirective } from './directives/textarea-directive';
import { AvatarComponent } from './components/avatar/avatar.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, FontAwesomeModule],
  declarations: [
    NotFoundComponent,
    FormGroupComponent,
    ClickPreventDefaultDirective,
    FormControlComponent,
    MailValidatorDirective,
    PublisherComponent,
    UserFriendlyDatePipe,
    MeComponent,
    NotificationComponent,
    CenteredLayoutComponent,
    SiteLayoutHeaderComponent,
    SiteLayoutFooterComponent,
    SiteLayoutComponent,
    CapitalizePipe,
    TextAreaDirective,
    AvatarComponent
  ],
  exports: [
    NotFoundComponent,
    FormGroupComponent,
    ClickPreventDefaultDirective,
    FormControlComponent,
    MailValidatorDirective,
    PublisherComponent,
    UserFriendlyDatePipe,
    MeComponent,
    NotificationComponent,
    CenteredLayoutComponent,
    SiteLayoutHeaderComponent,
    SiteLayoutFooterComponent,
    SiteLayoutComponent,
    CapitalizePipe,
    TextAreaDirective,
    AvatarComponent
  ]
})
export class SharedModule {}
