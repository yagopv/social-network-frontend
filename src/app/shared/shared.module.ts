import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { FormGroupComponent } from '../shared/components/form-group/form-group.component';
import { ContainerComponent } from './components/container/container.component';
import { ClickPreventDefaultDirective } from './directives/click-prevent-default.directive';
import { FormControlComponent } from './components/form-control/form-control.component';
import { MailValidatorDirective } from './validators/mail.validator';
import { MyStatusComponent } from './components/my-status/my-status.component';
import { UserFriendlyDatePipe } from './pipes/user-friendly-date.pipe';
import { MeComponent } from './components/me/me.component';
import { PopupWrapperComponent } from './components/popup-wrapper/popup-wrapper.component';
import { CenteredLayoutComponent } from './components/centered-layout/centered-layout.component';
import { SiteLayoutHeaderComponent } from './components/site-layout-header/site-layout-header.component';
import { SiteLayoutFooterComponent } from './components/site-layout-footer/site-layout-footer.component';
import { SiteLayoutComponent } from './components/site-layout/site-layout.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TextAreaDirective } from './directives/textarea-directive';

@NgModule({
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  declarations: [
    NotFoundComponent,
    FormGroupComponent,
    ContainerComponent,
    ClickPreventDefaultDirective,
    FormControlComponent,
    MailValidatorDirective,
    MyStatusComponent,
    UserFriendlyDatePipe,
    MeComponent,
    PopupWrapperComponent,
    CenteredLayoutComponent,
    SiteLayoutHeaderComponent,
    SiteLayoutFooterComponent,
    SiteLayoutComponent,
    CapitalizePipe,
    TextAreaDirective
  ],
  exports: [
    NotFoundComponent,
    FormGroupComponent,
    ClickPreventDefaultDirective,
    ContainerComponent,
    FormControlComponent,
    MailValidatorDirective,
    MyStatusComponent,
    UserFriendlyDatePipe,
    MeComponent,
    PopupWrapperComponent,
    CenteredLayoutComponent,
    SiteLayoutHeaderComponent,
    SiteLayoutFooterComponent,
    SiteLayoutComponent,
    CapitalizePipe,
    TextAreaDirective
  ]
})
export class SharedModule {}
