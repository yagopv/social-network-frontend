import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateWallComponent } from './private-wall/private-wall.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: ':userId', component: PrivateWallComponent }];

@NgModule({
  declarations: [PrivateWallComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class PrivateWallModule {}
