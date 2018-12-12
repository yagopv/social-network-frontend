import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { PostModule } from 'app/post/post.module';

@NgModule({
  imports: [CommonModule, SharedModule, PostModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {}
