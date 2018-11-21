import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeFooterComponent } from './welcome-footer/welcome-footer.component';
import { WelcomeHeaderComponent } from './welcome-header/welcome-header.component';
import { WelcomePictureComponent } from './welcome-picture/welcome-picture.component';

@NgModule({
  imports: [CommonModule, WelcomeRoutingModule, SharedModule],
  declarations: [
    WelcomeComponent,
    WelcomeFooterComponent,
    WelcomeHeaderComponent,
    WelcomePictureComponent
  ]
})
export class WelcomeModule {}
