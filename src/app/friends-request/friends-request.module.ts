import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsRequestComponent } from './components/friend-request/friends-request.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FriendsRequestComponent],
  exports: [FriendsRequestComponent]
})
export class FriendsRequestModule {}
