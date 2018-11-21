import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from 'app/shared/components/not-found/not-found.component';
import { FormWrapperComponent } from './components/form-wrapper/form-wrapper.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NotFoundComponent, FormWrapperComponent],
  exports: [NotFoundComponent, FormWrapperComponent]
})
export class SharedModule {}
