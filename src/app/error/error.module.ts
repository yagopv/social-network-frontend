import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './components/error.component';
import { ErrorState } from './store/error.state';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, NgxsModule.forFeature([ErrorState])],
  declarations: [ErrorComponent],
  exports: [ErrorComponent]
})
export class ErrorModule {}
