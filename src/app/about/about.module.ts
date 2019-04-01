import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

const routes: Routes = [{ path: 'about', component: AboutComponent }];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [AboutComponent]
})
export class AboutModule {}
