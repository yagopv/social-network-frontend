import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from 'app/shared/components/not-found/not-found.component';
import { FormGroupComponent } from 'app/shared/components/form-group/form-group.component';
import { ContainerComponent } from './components/container/container.component';
import { PictureComponent } from './components/picture/picture.component';
import { ClickPreventDefaultDirective } from './directives/click-prevent-default.directive';
import { FormControlComponent } from './components/form-control/form-control.component';
import { MailValidatorDirective } from './validators/mail/mail.validator';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NotFoundComponent,
    FormGroupComponent,
    ContainerComponent,
    PictureComponent,
    ClickPreventDefaultDirective,
    FormControlComponent,
    MailValidatorDirective
  ],
  exports: [
    NotFoundComponent,
    FormGroupComponent,
    ContainerComponent,
    PictureComponent,
    FormControlComponent,
    MailValidatorDirective
  ]
})
export class SharedModule {}
