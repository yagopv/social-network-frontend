import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from 'app/shared/components/not-found/not-found.component';
import { FormWrapperComponent } from 'app/shared/components/form-wrapper/form-wrapper.component';
import { ContainerComponent } from './components/container/container.component';
import { PictureComponent } from './components/picture/picture.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NotFoundComponent,
    FormWrapperComponent,
    ContainerComponent,
    PictureComponent
  ],
  exports: [
    NotFoundComponent,
    FormWrapperComponent,
    ContainerComponent,
    PictureComponent
  ]
})
export class SharedModule {}
