import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './components/help/help.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HelpComponent]
})
export class HelpModule {}
