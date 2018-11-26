import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [WelcomeComponent]
})
export class WelcomeModule {}
