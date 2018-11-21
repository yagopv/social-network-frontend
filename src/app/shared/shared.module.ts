import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from 'app/shared/components/not-found/not-found.component';
import { FormWrapperComponent } from 'app/shared/components/form-wrapper/form-wrapper.component';
import { RegisterFormComponent } from 'app/shared/components/register-form/register-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    NotFoundComponent,
    FormWrapperComponent,
    RegisterFormComponent
  ],
  exports: [NotFoundComponent, FormWrapperComponent, RegisterFormComponent]
})
export class SharedModule {}
