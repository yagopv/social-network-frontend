import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from 'app/shared/components/not-found/not-found.component';
import { FormWrapperComponent } from 'app/shared/components/form-wrapper/form-wrapper.component';
import { ContainerComponent } from './components/container/container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NotFoundComponent, FormWrapperComponent, ContainerComponent],
  exports: [NotFoundComponent, FormWrapperComponent, ContainerComponent]
})
export class SharedModule {}
