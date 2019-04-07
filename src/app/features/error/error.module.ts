import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './containers/error.component';
import { ErrorState } from './store/error.state';
import { SharedModule } from '../../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    NgxsModule.forFeature([ErrorState])
  ],
  declarations: [ErrorComponent],
  exports: [ErrorComponent]
})
export class ErrorModule {}
