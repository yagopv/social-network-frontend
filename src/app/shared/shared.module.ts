import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from 'app/shared/components/not-found/not-found.component';
import { FormWrapperComponent } from 'app/shared/components/form-wrapper/form-wrapper.component';
import { RegisterFormComponent } from 'app/shared/components/register-form/register-form.component';
import { ContainerComponent } from './components/container/container.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    NotFoundComponent,
    FormWrapperComponent,
    RegisterFormComponent,
    ContainerComponent
  ],
  exports: [
    NotFoundComponent,
    FormWrapperComponent,
    RegisterFormComponent,
    ContainerComponent
  ]
})
export class SharedModule {}
