import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from 'app/shared/components/not-found/not-found.component';
import { FormGroupComponent } from 'app/shared/components/form-group/form-group.component';
import { ContainerComponent } from './components/container/container.component';
import { ClickPreventDefaultDirective } from './directives/click-prevent-default.directive';
import { FormControlComponent } from './components/form-control/form-control.component';
import { MailValidatorDirective } from './validators/mail/mail.validator';
import { MyStatusComponent } from './components/my-status/my-status.component';
import { UserFriendlyDatePipe } from './pipes/user-friendly-date.pipe';
import { MeComponent } from './components/me/me.component';
import { PopupWrapperComponent } from './components/popup-wrapper/popup-wrapper.component';

@NgModule({
  imports: [CommonModule],
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
    PopupWrapperComponent
  ],
  exports: [
    NotFoundComponent,
    FormGroupComponent,
    ContainerComponent,
    FormControlComponent,
    MailValidatorDirective,
    MyStatusComponent,
    UserFriendlyDatePipe,
    MeComponent,
    PopupWrapperComponent
  ]
})
export class SharedModule {}
