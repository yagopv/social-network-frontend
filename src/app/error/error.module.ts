import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './components/error.component';
import { ErrorState } from './error.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ErrorState])],
  declarations: [ErrorComponent],
  exports: [ErrorComponent]
})
export class ErrorModule {}
