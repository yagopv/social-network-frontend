import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';

@NgModule({
  declarations: [FriendRequestsComponent],
  imports: [CommonModule, SharedModule],
  exports: [FriendRequestsComponent]
})
export class FriendRequestsModule {}
